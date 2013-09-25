

/**
 * @package 晓之护卫1剧本提取脚本 (node.js)
 * 处理晓之护卫1游戏中提取出的mjoi (majiro引擎)脚本文件，转成纯文本（删除控制字符）
 *
 * require buffertools package:
 * 	npm -g install buffertools
 */

require("buffertools");
var fs=require("fs");
var path=require("path");

function _get_block_type(c) {
	var block_type;
	if( c < 0x80 ) { // ascii char, not content
		block_type = 0; //control		
	} else {
		block_type = 1; //content. first chacacter should be Chinese character.
	}
	
	return block_type;
}

function _get_block_type_inner(c) {
	var block_type;
	if( c > 0x1F && c < 0x7F ) { // displayable ascii char
		block_type = 1;
	} else if ( c == 0x09 || c == 0x0A || c == 0x0D) { // \t, \n, \r, treated as content
		block_type = 1; //content
	} else if( c < 0x80 ) { // non-displayable ascii char, not content
		block_type = 0; //control		
	} else {
		block_type = 1; //content
	}
	
	return block_type;
}

// return false on error or parsed string of a raw file
function parse_file(filename){

	console.log("parsing file", filename);
	try {
		var buff = fs.readFileSync(filename);
	} catch (err) {
		console.log("file read error", filename, err);
		return false;
	}

	var parsed = new Buffer(""); // buffer

	var offset = 0;
	var offset_current_block;
	var block_type;
	var old_block_controll_flag = false;
	while ( offset < buff.length  ) {
		offset_current_block = offset;
		var c = buff.readUInt8(offset);
		block_type = _get_block_type(c);

		while( offset < buff.length -1 ) {
			var nextc = buff.readUInt8(offset + 1 );
			if( block_type == _get_block_type_inner(nextc) ) {
				offset++;	
			} else {
				break;
			}
		}
		
		if( block_type == 0 || (offset - offset_current_block < 5) ) { // at least 6 characters (3 chinese words). lower filter will have problems
			if( !old_block_controll_flag ) {
				parsed = parsed.concat("\n");
			}
			old_block_controll_flag = true;
		} else {
			parsed = parsed.concat( buff.slice(offset_current_block, offset + 1) );
			old_block_controll_flag = false;
		}
		offset++;
	}
	
	return parsed;	
}


exports.parse_file = parse_file;

function main() {
	if( process.argv.length < 3 || !process.argv[2] ) {
		console.log("Usage: node parser.js <FILE.mjo> [OUTPUT_DIR]");
		process.exit(1);
	}
	var filename = process.argv[2];

	var content = parse_file(filename);
	if( content === false ) {
		console.log("Error: file parse error");
		process.exit(2);
	}
	
	var outputdir = ".";
	if( process.argv.length >=4 )
		outputdir = process.argv[3];

	// output file in current dir
	fs.writeFileSync(path.join(outputdir, path.basename(filename) + ".txt"), content); 
}

if(require.main === module) {
	main();
}
