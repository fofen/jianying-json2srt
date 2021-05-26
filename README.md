# json2srt：剪映字幕 json 转 srt

这是一个命令行 js 程序，**需要安装 node**

Windows 平台：剪映 1.2.1 测试通过

macOS：剪映 1.3.1 测试通过

## 用法

### 0. 首先，当然是要下载本库的 json2srt.js 这个程序。

### 1. 第一步，在「剪映 Pro」软件中，自动生成字幕

### 2. 第二步，进入命令行。

此工具需要带一个参数，即 json 文件所处的目录名称。

Windows 上，剪映字幕的工作目录是：USER_HOME + '\AppData\Local\JianyingPro\User Data\Projects\com.lveditor.draft\';

macOS 上，剪映字幕的工作目录是：USER_HOME + '/Movies/JianyingPro/User Data/Projects/com.lveditor.draft/'

在命令行上，执行：

    node json2srt.js <json 文件所在的目录名>

如果不知道「json 文件所在的目录名」，可以不带参数执行：

    node json2srt.js

命令会提示你到哪个目录下去找。

### 生成的 srt 文件在那里？

生成的 srt 文件，和 json 文件在同一个目录。

命令执行成功时，会把生成的 srt 文件路径打印在屏幕上。

- Windows 平台生产的文件是 draft.srt
- macOS 平台生产的文件是 template.srt

## 声明
此命令行工具，是用这个网页版修改而来：

https://pansong291.gitee.io/web/html/tool/JianyingPro.html

感谢作者。
