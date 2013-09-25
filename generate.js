
/**
 * @package 晓之护卫1剧本提取脚本 (node.js)
 * 合并parser.js生成的文本文件生成各条线的剧本 
 *
 * require buffertools package:
 * 	npm -g install buffertools
 */

require("buffertools");
var fs=require("fs");
var path=require("path");


/*
appended:

"000bind0[誕生日会]共通部分ルート分岐の要.mjo.txt",
"000bind1[私は柿派　あなたは？]共通.mjo.txt",
"000bind2[パーソナルスペース]共通.mjo.txt",
"000bind3[麗華のおとり捜査前編]共通.mjo.txt",
"000bind4[麗華のおとり捜査後編]共通部分.mjo.txt",
"000bind5[映画といわれても（一部共）]共通.mjo.txt",
"000bind6[紙相撲]共通.mjo.txt",
"000bind7[苦痛のレクチャー？]共通.mjo.txt",
"000bind8a[テスト勝負]共通部分Ａ.mjo.txt",
"000bind8b[テスト勝負]共通部分Ｂ.mjo.txt",
"000bind9[スズメの涙ほとど言うが]共通.mjo.txt",

*/

var common_files = [
"001[始まりの日].mjo.txt",
"002[休日ライフ].mjo.txt",
"003[ボディーガード].mjo.txt",
"004[憐桜学園].mjo.txt",
"005[おおロメオ].mjo.txt",
"006[っちゃ、ってどこだよ].mjo.txt",
"007[日常から日常へ].mjo.txt",
];

var characters = {
	r: {
		title: "二阶堂丽华.txt",
		files:[
"000bind0[誕生日会]共通部分ルート分岐の要.mjo.txt",
"r000[誕生日会・麗華].mjo.txt",
"r001[死人].mjo.txt",
"r002[絶食ゲーム].mjo.txt",
"r003[獣医].mjo.txt",
"r004[麗華との壁１].mjo.txt",
"000bind1[私は柿派　あなたは？]共通.mjo.txt",
//"r005[私は柿派　あなたは？(共)].mjo.txt",
"r006[不穏なメイド].mjo.txt",
"000bind2[パーソナルスペース]共通.mjo.txt",
//"r007[パーソナルスペース（一部共）].mjo.txt",
"000bind3[麗華のおとり捜査前編]共通.mjo.txt",
//"r008[麗華のおとり捜査前編（一部共）].mjo.txt",
"000bind4[麗華のおとり捜査後編]共通部分.mjo.txt",
"r009[麗華のおとり捜査後編（一部共）].mjo.txt",
"r010[雷太に出会う・不穏].mjo.txt",
"r011[麗華との壁２].mjo.txt",
"r012[下駄箱の手紙１].mjo.txt",
"r013[下駄箱の手紙２].mjo.txt",
"r014[飛行機].mjo.txt",
"000bind5[映画といわれても（一部共）]共通.mjo.txt",
//"r015[映画といわれても（一部共）].mjo.txt",
"000bind6[紙相撲]共通.mjo.txt",
//"r016[紙相撲（共）].mjo.txt",
"r017[父親の教育(過去共通)].mjo.txt",
"r018[夢精を海斗へ].mjo.txt",
"r019[履歴書の空欄].mjo.txt",
"000bind8a[テスト勝負]共通部分Ａ.mjo.txt",
"000bind8b[テスト勝負]共通部分Ｂ.mjo.txt",
//"r020[テスト勝負（共）].mjo.txt",
"000bind9[スズメの涙ほとど言うが]共通.mjo.txt",
//"r021[スズメの涙ほとど言うが（一部共）].mjo.txt",
"r022[下駄箱の手紙３].mjo.txt",
"r023[空白の心１].mjo.txt",
"r024[空白の心２].mjo.txt",
"r025[空白の心３].mjo.txt",
"r026[空白の心４].mjo.txt",
"r027[朝霧海斗].mjo.txt",
"r028[未来の選択].mjo.txt",
"rend[暁の護衛].mjo.txt",
		]
	},
	aya: {
		title: "二阶堂彩.txt",
		files:[
"000bind0[誕生日会]共通部分ルート分岐の要.mjo.txt",
"aya000[誕生日会・彩].mjo.txt",
"aya001[彩と外出].mjo.txt",
"aya002[流れること].mjo.txt",
"aya003[尊と手錠と仲直り1].mjo.txt",
"aya004[彩狼怪奇ファイル].mjo.txt",
"000bind1[私は柿派　あなたは？]共通.mjo.txt",
//"aya005[私は柿派　あなたは？(共)].mjo.txt",
"aya006[尊と手錠と仲直り2].mjo.txt",
"000bind2[パーソナルスペース]共通.mjo.txt",
//"aya007[パーソナルスペース（一部共）].mjo.txt",
"aya008[尊と手錠と仲直り3].mjo.txt",
"aya009[尊と手錠と仲直り4].mjo.txt",
"000bind5[映画といわれても（一部共）]共通.mjo.txt",
//"aya010[映画といわれても（一部共）].mjo.txt",
"aya011[彩とのゲーム1].mjo.txt",
"aya012[ボディーガードの資質].mjo.txt",
"aya013[彩とのゲーム2].mjo.txt",
"aya014[作法１].mjo.txt",
"aya015[作法２].mjo.txt",
"000bind6[紙相撲]共通.mjo.txt",
//"aya016[紙相撲（共）].mjo.txt",
"000bind7[苦痛のレクチャー？]共通.mjo.txt",
//"aya017[苦痛のレクチャー？(一部共)].mjo.txt",
"aya018[彩とのゲーム3].mjo.txt",
"aya019[着替えマンセー].mjo.txt",
"000bind8a[テスト勝負]共通部分Ａ.mjo.txt",
"000bind8b[テスト勝負]共通部分Ｂ.mjo.txt",
//"aya020[テスト勝負（共）].mjo.txt",
"000bind9[スズメの涙ほとど言うが]共通.mjo.txt",
//"aya021[スズメの涙ほとど言うが（一部共）].mjo.txt",
"aya022[昆虫採集].mjo.txt",
"aya023[彩のボディガード１].mjo.txt",
"aya024[彩のボディガード２].mjo.txt",
"ayaend[秘密の時間].mjo.txt",
		]
	},
	moe: {
		title: "神崎萌.txt",
		files:[
"000bind0[誕生日会]共通部分ルート分岐の要.mjo.txt",
"moe000[誕生日会・萌].mjo.txt",
"moe001[向こう側].mjo.txt",
"moe002[荷物とオレンジ(過去共通)].mjo.txt",
"moe003[空から少女降ってきた].mjo.txt",
"moe004[またあの場所に].mjo.txt",
"moe005[ともだち].mjo.txt",
"moe006[佃吾郎].mjo.txt",
"moe007[入門手続き].mjo.txt",
"moe008[不審な行動].mjo.txt",
"moe009[ケツの穴].mjo.txt",
"moe010[ラブレター].mjo.txt",
"moe011[屋台×清掃×お金].mjo.txt",
"moe012[カレーぇん].mjo.txt",
"moe013[肉とじゃがのない肉じゃが].mjo.txt",
"moe014[電柱では死ねないんだな、うん].mjo.txt",
"moe015[うごめくもの].mjo.txt",
"000bind6[紙相撲]共通.mjo.txt",
//"moe016[紙相撲（共）].mjo.txt",
"moe017[捨て犬].mjo.txt",
"moe018[掃除王子の称号を得た].mjo.txt",
"moe019[ガス噴射].mjo.txt",
"moe020[気づくとき].mjo.txt",
"moe021[おぬぐり食いてぇ].mjo.txt",
"moe022[テスト勝負（共）].mjo.txt",
"000bind8b[テスト勝負]共通部分Ｂ.mjo.txt",
"moe023[おぬぐり食べてただ].mjo.txt",
"moe024[温もり].mjo.txt",
"moe025[さらば二階堂].mjo.txt",
"moe026[雌雄決する時・薫].mjo.txt",
"moe027[いってらっしゃいませ].mjo.txt",
"moeend[それぞれの未来].mjo.txt",
		]
	},
	tae: {
		title: "仓屋敷妙.txt",
		files:[
"000bind0[誕生日会]共通部分ルート分岐の要.mjo.txt",
"tae000[誕生日会・妙].mjo.txt",
"tae001[侑祈と妙の仲].mjo.txt",
"tae002[朝霧海斗を探れ１].mjo.txt",
"tae003[朝霧海斗を探れ２].mjo.txt",
"tae004[２０億で譲りなさい].mjo.txt",
"000bind1[私は柿派　あなたは？]共通.mjo.txt",
//"tae005[私は柿派　あなたは？(共)].mjo.txt",
"tae006[妙来襲].mjo.txt",
"tae007[レッツゴー本屋].mjo.txt",
"tae008[チーターたちと会話].mjo.txt",
"tae009[ソナタ脱走劇].mjo.txt",
"tae010[部屋に侵入者？].mjo.txt",
"tae011[室内での……].mjo.txt",
"tae012[悶える].mjo.txt",
"tae013[相談].mjo.txt",
"tae014[パジャマでポン].mjo.txt",
"tae015[キス・悩み].mjo.txt",
"000bind6[紙相撲]共通.mjo.txt",
//"tae016[紙相撲（共）].mjo.txt",
"tae017[亜希子来襲].mjo.txt",
"tae018[既成事実].mjo.txt",
"tae019[ゴキロー].mjo.txt",
"tae020[中出し危険].mjo.txt",
"tae021[先生痔なの].mjo.txt",
"tae022[大田原牛].mjo.txt",
"tae023[覗いた侑祈に祝福を].mjo.txt",
"tae024[２度目の].mjo.txt",
"tae025[生涯ニート].mjo.txt",
"tae026[侑祈となら].mjo.txt",
"tae027[すれ違う巨乳].mjo.txt",
"tae028[鉄バットもって泣き顔で].mjo.txt",
"tae029[侑祈倒れる].mjo.txt",
"tae030[鼻毛二本].mjo.txt",
"tae031[その日を願って].mjo.txt",
"taeend[新しい一歩].mjo.txt",
		]
	},
	tuki: {
		title: "月.txt",
		files:[
"000bind0[誕生日会]共通部分ルート分岐の要.mjo.txt",
//"tuki000[誕生日会2ツキ].mjo.txt", //invalid file, unknown content
"tuki000[誕生日会・ツキ].mjo.txt",
"tuki001[ツボにはまった].mjo.txt",
"tuki002[人物観察].mjo.txt",
"tuki003[げぇへげぇ変質者だよぉ].mjo.txt",
"tuki004[乳揉みと掃除].mjo.txt",
"000bind1[私は柿派　あなたは？]共通.mjo.txt",
//"tuki005[私は柿派　あなたは？(共)].mjo.txt",
"000bind2[パーソナルスペース]共通.mjo.txt",
//"tuki006[パーソナルスペース（一部共）].mjo.txt",
"tuki007[雷太泣きつく].mjo.txt",
"tuki008[ラフレシア].mjo.txt",
"tuki009[杏子との対決].mjo.txt",
"000bind3[麗華のおとり捜査前編]共通.mjo.txt",
//"tuki010[麗華のおとり捜査前編（一部共）].mjo.txt",
"000bind4[麗華のおとり捜査後編]共通部分.mjo.txt",
"tuki011[麗華のおとり捜査後編（一部共）].mjo.txt",
"000bind6[紙相撲]共通.mjo.txt",
//"tuki012[紙相撲（共）].mjo.txt",
"tuki013[生まれいずる感情].mjo.txt",
"tuki014[孫の手を借りたいくらいだ].mjo.txt",
"000bind7[苦痛のレクチャー？]共通.mjo.txt",
//"tuki015[苦痛のレクチャー？(一部共)].mjo.txt",
"tuki016[キスから始まる……].mjo.txt",
"tuki017[虫無視して蒸しあげる].mjo.txt",
"000bind8a[テスト勝負]共通部分Ａ.mjo.txt",
"000bind8b[テスト勝負]共通部分Ｂ.mjo.txt",
//"tuki018[テスト勝負（共）].mjo.txt",
"000bind9[スズメの涙ほとど言うが]共通.mjo.txt",
//"tuki019[スズメの涙ほとど言うが（一部共）].mjo.txt",
"tuki020[ふぇいく].mjo.txt",
"tukiend[そんなあなただから].mjo.txt",
		]
	},

}

function main() {
	
	var inputdir = ".";
	if( process.argv.length >= 3 || process.argv[2] ) {
		inputdir = process.argv[2];
	}
	
	var outputdir = inputdir;
	if( process.argv.length >=4 )
		outputdir = process.argv[3];
	
	var buff_common = new Buffer("");
	for(var i = 0; i < common_files.length; i++) {
		buff_common = buff_common.concat(common_files[i], "\n");
		buff_common = buff_common.concat( fs.readFileSync( path.join(inputdir, common_files[i]) ));	
		buff_common = buff_common.concat("\n");
	}

	for(var c in characters) {
		var buff = new Buffer("");	
		buff = buff.concat( buff_common );

		for(var i = 0; i < characters[c].files.length; i++) {
			buff = buff.concat(characters[c].files[i], "\n");
			buff = buff.concat( fs.readFileSync( path.join(inputdir, characters[c].files[i]) ));	
			buff = buff.concat("\n");
		}
		fs.writeFileSync(path.join(outputdir, characters[c].title), buff);
	}
}

if(require.main === module) {
	main();
}
