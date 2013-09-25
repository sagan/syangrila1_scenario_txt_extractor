晓之护卫1游戏剧本提取脚本
=================================

##说明

[晓之护卫](http://zh.wikipedia.org/wiki/%E6%9B%89%E4%B9%8B%E8%AD%B7%E8%A1%9B)是日本AKABEiSOFT2公司的Galgame系列.
这个脚本能提取晓之护卫1代PC版的游戏剧本文件并合并成可读的txt文档.

脚本使用node.js和bash. node.js需要安装buffertools包.(```npm -g install buffertools```)

##用法

1. 用Crass解包晓之护卫1代游戏安装目录下的scenario.arc文件,得到```scenario```文件夹,里面是一堆*.mjo格式游戏剧本文件.
如果是汉化版, 会有scenario1.arc和scenario2.arc两个文件,分别对应日文原版和汉化后的中文版的剧本.以下以提取中文版剧本为例.

2. 修改parse.sh,将```INPUT_DIR```值设为```scenario```文件夹路径. 将```OUTPUT_DIR```设为输出剧本保存目录

3. 执行```./parse.sh```

4. 执行```node ./generate.js OUTPUT_DIR```, ```OUTPUT_DIR```为之前设置的输出目录,
脚本会在这个目录下生成几个角色的剧本txt文件(二阶堂丽华, 二阶堂彩, 仓屋敷妙, 月, 神崎萌)

如果要提取日文原版剧本, 将上面步骤里执行的命令```generate.sh```改为```generate_ja.sh```

提取好的晓之护卫1剧本下载(中文版): http://pan.baidu.com/s/1yy2be
