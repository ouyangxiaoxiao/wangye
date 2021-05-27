// list = [
//     'https://ouyangxiaoxiao.github.io/wangye/demo/AVideo.2.0/video/22.mp4',
// 'https://ouyangxiaoxiao.github.io/wangye/demo/AVideo.2.0/video/22.mp4',
// 'https://ouyangxiaoxiao.github.io/wangye/demo/AVideo.2.0/video/22.mp4',
// 'https://ouyangxiaoxiao.github.io/wangye/demo/AVideo.2.0/video/22.mp4',
// 'https://ouyangxiaoxiao.github.io/wangye/demo/AVideo.2.0/video/22.mp4',
// 'https://ouyangxiaoxiao.github.io/wangye/demo/AVideo.2.0/video/22.mp4',
// 'https://ouyangxiaoxiao.github.io/wangye/demo/AVideo.2.0/video/22.mp4',
// 'https://ouyangxiaoxiao.github.io/wangye/demo/AVideo.2.0/video/22.mp4',
// 'https://ouyangxiaoxiao.github.io/wangye/demo/AVideo.2.0/video/22.mp4',
// 'https://ouyangxiaoxiao.github.io/wangye/demo/AVideo.2.0/video/22.mp4',
// ];


var lis = document.getElementsByTagName("li");
var ul = document.getElementsByTagName("ul");

list = [];

for (var i = 0; i < lis.length; i++) {

    list[i] = lis[i].getAttribute("value");


}

i = 0;
var x = document.getElementById("myVideo");
x.src = list[0];/*这是默认播放*/
var len = list.length - 1;

/*这是摁钮*/
function next() {

    if (i == list.length - 1) {
        i = 0;
        console.log('elseif工作' + i);
        x.src = list[i];

    } else {
        i++;
        console.log(i + 'else生效');
        x.src = list[i];

    }

}

function back() {

    if (i == 0) {
        i = list.length - 1;
        console.log('elseif工作' + i);
        x.src = list[i];

    } else {
        //最后的语句
        i = i - 1;
        console.log('else工作' + i);
        x.src = list[i];

    }

}


x.onended = function () {
    if (i == list.length - 1) {
        i = 0;
        console.log('elseif工作' + i);
        x.src = list[i];

    } else {
        i++;
        console.log(i + 'else生效');
        x.src = list[i];

    }
};

/*排他 选颜色*/
var lir = document.getElementsByTagName('li');
for (var a = 0; a < lir.length; a++) {
    lir[a].onclick = function () {
        for (var i = 0; i < lir.length; i++) {
            lir[i].style.backgroundColor = '';
        }
        this.style.backgroundColor = 'pink';
        x.setAttribute("src", this.getAttribute("value"));
        console.log(this.getAttribute("value"))
    };

}


