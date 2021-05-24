const os = require('os');
const fs = require('fs')

// 获取 home 目录
const USER_HOME = process.env.HOME || process.env.USERPROFILE

// 当前字幕文件的目录（从命令行读取）
jsonFolder = process.argv.slice(2);

// 剪映的工作目录(macOS)
if (os.platform() == 'darwin') { //macOS 的路径
    jianyingPath = USER_HOME + '/Movies/JianyingPro/videocut/';
    // 剪映生成的字幕 json 文件
    jsonFile = jianyingPath + jsonFolder + '/template.json';
    // 程序将生成的 srt 文件
    srtFile = jianyingPath + jsonFolder + '/template.srt';

} else { // Windows 的路径
    jianyingPath = USER_HOME + '\\AppData\\Local\\JianyingPro\\User Data\\Projects\\com.lveditor.draft\\';
    // 剪映生成的字幕 json 文件
    jsonFile = jianyingPath + jsonFolder + '/draft.json';
    // 程序将生成的 srt 文件
    srtFile = jianyingPath + jsonFolder + '/draft.srt';
}

// 换行符
let RN = '\r\n';


try {
    if (jsonFolder.length == 0) {
        console.log('请提供 json 目录。\n');
        console.log('请到 ' + jianyingPath + ' 目录下找。\n\n');
        console.log('如果目录名为 AFA473B4-BB11-4D6D-98AC-4A0E039A13D6，则请执行：');
        console.log('node json2srt.js AFA473B4-BB11-4D6D-98AC-4A0E039A13D6\n');
        return;
    }
    // 读取 json 文件
    let  inputText= fs.readFileSync(jsonFile);

    let temp;
    // 剪映 json 对象
    temp = JSON.parse(inputText);
    
    let srtFiles = convertJSON2SRT(temp);
    console.log('生成完毕：'+ srtFile);
} catch (e) {
    console.log('JSON 解析错误：'+e);
}


function convertJSON2SRT(jy) {
    // 平台系统
    let os = jy.platform.os;
    // 提取文本材料
    // Map 结构 = {id1: text1, id2: text2, ...}
    let texts = {}, temp = jy.materials.texts;
    for (let i in temp) {
        texts[temp[i].id] = temp[i].content;
    }

     // 轨道列表
    let tracks = jy.tracks, track;
    // SRT 文件 Map
    let srtFiles = {};
    for (let i in tracks) {
        track = tracks[i];
        temp = convertTrack2Srt(track, texts, os);
        if (temp) {
            srtFiles[track.id] = temp;
        }
    }
    return srtFiles;
}

/**
 * 将一条轨道转换为 srt 文本
 * @param track 轨道
 * @param texts 文本材料
 * @param milli 是否是毫秒单位
 * @return {string}
 */
function convertTrack2Srt(track, texts, milli) {
    let segments = track.segments, segment;
    let srt = {content: null, start: null, end: null};
    let srtText = '', index = 0;
    for (let i in segments) {
        segment = segments[i];
        srt.content = texts[segment.material_id];
        if (!srt.content) continue;
        srt.start = segment.target_timerange.start;
        srt.end = srt.start + segment.target_timerange.duration;
        srt.start = getSrtTimeText(srt.start, milli);
        srt.end = getSrtTimeText(srt.end, milli);
        index++;
        srtText += formatSrt(index, srt);
    }
    fs.writeFile(srtFile, srtText, function (err) {
        if (err) {
            return console.error(err);
        } 
    });
}

/**
 * 获取 SRT 格式的时间文本
 * @param time 时间，windows版本为微秒数
 * @param milli 是否是毫秒单位
 * @returns {string}
 */
function getSrtTimeText(time, milli) {
    // 1h1m1s111ms = 61m1s111ms = 3661s111ms = 3661111ms
    if (!milli) {
        time = Math.floor(time / 1000);
    }
    // 余出的毫秒
    let millisecond = time % 1000;
    time = Math.floor(time / 1000);
    // 余出秒
    let second = time % 60;
    time = Math.floor(time / 60);
    // 余出分钟
    let minute = time % 60;
    time = Math.floor(time / 60);
    // 剩余时数
    let hour = time;
    hour = formatDigit(hour, 2);
    minute = formatDigit(minute, 2);
    second = formatDigit(second, 2);
    millisecond = formatDigit(millisecond, 3);
    return hour + ':' + minute + ':' + second + ',' + millisecond;
}

 /**
 * 格式化为 SRT
 * @param index 字幕序号，从 1 开始
 * @param srt 字幕内容等信息
 * @returns {string}
 */
function formatSrt(index, srt) {
    return index + RN + srt.start + ' --> ' + srt.end + RN + srt.content + RN + RN;
}

/**
 * 格式化数字   
 * @param digit 数字
 * @param length 长度
 * @returns {string}
 */
function formatDigit(digit, length) {
    let str = digit.toString();
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
}
