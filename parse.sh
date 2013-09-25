#!/bin/bash

INPUT_DIR="./scenario2"
OUTPUT_DIR="./scenario_parsed"

for F in `ls $INPUT_DIR`
do
	node parser.js "$INPUT_DIR/$F" "$OUTPUT_DIR"
	mv "$OUTPUT_DIR/$F.txt" "$OUTPUT_DIR/$F.gbk.txt"
	iconv -c -f GBK -t "UTF-8" -o "$OUTPUT_DIR/$F.txt" "$OUTPUT_DIR/$F.gbk.txt"
	rm "$OUTPUT_DIR/$F.gbk.txt"
done


