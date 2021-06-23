window.addEventListener('load', function () {
    /*获取视频*/
    var video = document.getElementById('video');
    // 获取列表
    var kcxq = document.querySelector('.kcxq');
    /*精准获取 lis下 每一条li*/
    var lis = kcxq.getElementsByTagName('li');

    // 获取上一曲按键
    var btn1 = document.querySelector('.btn-1');
    //获取下一曲按键
    var btn2 = document.querySelector('.btn-2');

    // 初始化index
    index = 0;
    // 默认播放第一条
    video.src = lis[index].getAttribute("value");
    lis[index].style.backgroundColor = "#f5f5f5";
    lis[index].style.color = '#70a401';
    /*给每条li绑定点击事件*/
    for (i = 0; i < lis.length; i++) {
        lis[i].setAttribute('index', i);
        lis[i].onclick = function () {
            console.log('点击了');
            video.src = this.getAttribute("value");
            console.log(this.getAttribute("value"));


            /*1.先去掉所有元素的样式*/
            for (var i = 0; i < lis.length; i++) {
                lis[i].style.backgroundColor = "";
                lis[i].style.color = '';
            }
            /*留下当前li 设置选中样式*/

            this.style.backgroundColor = "#f5f5f5";
            this.style.color = '#70a401';
            /*获得当前这个li 的索引号给index*/
            index = Number(this.getAttribute('index'));


        }
    }


    /*下一曲*/
    btn2.addEventListener('click', function () {
        if (index === lis.length - 1) {
            index += 1;
            index = 0;
            video.src = lis[index].getAttribute("value");
            console.log(index);
            /*1.先去掉所有元素的样式*/
            for (var i = 0; i < lis.length; i++) {
                lis[i].style.backgroundColor = "";
                lis[i].style.color = '';
            }

            lis[index].style.backgroundColor = "#f5f5f5";
            lis[index].style.color = '#70a401';

        } else {
            index += 1;
            video.src = lis[index].getAttribute("value");
            console.log(index);
            for (var i = 0; i < lis.length; i++) {
                lis[i].style.backgroundColor = "";
                lis[i].style.color = '';
            }

            lis[index].style.backgroundColor = "#f5f5f5";
            lis[index].style.color = '#70a401';
        }


    });
    /*上一曲*/
    btn1.addEventListener('click', function () {
        if (index === 0) {
            index -= 1;
            index = lis.length - 1;
            video.src = lis[index].getAttribute("value");
            console.log(index);
            for (var i = 0; i < lis.length; i++) {
                lis[i].style.backgroundColor = "";
                lis[i].style.color = '';
            }

            lis[index].style.backgroundColor = "#f5f5f5";
            lis[index].style.color = '#70a401';

        } else {
            index -= 1;
            video.src = lis[index].getAttribute("value");
            console.log(index);
            for (var i = 0; i < lis.length; i++) {
                lis[i].style.backgroundColor = "";
                lis[i].style.color = '';
            }

            lis[index].style.backgroundColor = "#f5f5f5";
            lis[index].style.color = '#70a401';
        }


    });
    /*自动播放下一课*/
    video.addEventListener('ended', function () {
        if (index === lis.length - 1) {
            index += 1;
            index = 0;
            video.src = lis[index].getAttribute("value");
            console.log(index);
            /*1.先去掉所有元素的样式*/
            for (var i = 0; i < lis.length; i++) {
                lis[i].style.backgroundColor = "";
                lis[i].style.color = '';
            }

            lis[index].style.backgroundColor = "#f5f5f5";
            lis[index].style.color = '#70a401';

        } else {
            index += 1;
            video.src = lis[index].getAttribute("value");
            console.log(index);
            for (var i = 0; i < lis.length; i++) {
                lis[i].style.backgroundColor = "";
                lis[i].style.color = '';
            }

            lis[index].style.backgroundColor = "#f5f5f5";
            lis[index].style.color = '#70a401';
        }
    })


});


