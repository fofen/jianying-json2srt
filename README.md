# json2srt：剪映字幕 json 转 srt

这是一个命令行 js 程序，需要安装 node

Windows、macOS 均测试通过。

## 用法

#### 1. 第一步，在「剪映 Pro」软件中，自动生成字幕

#### 2. 第二步，进入命令行。

此工具需要带一个参数，即 json 文件所处的目录名称。
在命令行上，执行：

    node json2srt.js <json 文件的上级目录名>

如果不知道「json 文件的上级目录名」，可以不带参数执行：

    node json2srt.js

命令会提示你到哪个目录下去找。

## 声明
此命令行工具，是用这个网页版修改而来：

https://pansong291.gitee.io/web/html/tool/JianyingPro.html

感谢作者。
