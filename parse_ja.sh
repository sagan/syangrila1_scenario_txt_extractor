#!/bin/bash

INPUT_DIR="./scenario1"
OUTPUT_DIR="./scenario_ja_parsed"

for F in `ls $INPUT_DIR`
do
	node parser.js "$INPUT_DIR/$F" "$OUTPUT_DIR"
	mv "$OUTPUT_DIR/$F.txt" "$OUTPUT_DIR/$F.jis.txt"
	iconv -c -f SHIFT_JIS -t "UTF-8" -o "$OUTPUT_DIR/$F.txt" "$OUTPUT_DIR/$F.jis.txt"
	rm "$OUTPUT_DIR/$F.jis.txt"
done


