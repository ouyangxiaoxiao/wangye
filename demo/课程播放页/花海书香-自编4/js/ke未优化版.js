window.addEventListener('load', function () {
    /*获取视频*/
    var video = document.getElementById('video');
    // 获取列表
    var kcxq = document.querySelector('.kcxq');
    var btn1 = document.querySelector('.btn-1');
    var btn2 = document.querySelector('.btn-2');
    console.log(kcxq);
    /*获取每一条li*/
    var lis = kcxq.getElementsByTagName('li');
    console.log(lis);
    // var url = [];
    index = 0;
    console.log(typeof (index));
    /*把每一条li添加到url*/
    // for (var i = 0; i < lis.length; i++) {
    //     lis[i].setAttribute('index', i);
    //     url[i] = lis[i].getAttribute("value");
    // }
    // console.log('5566');
    // console.log(url);
    // console.log(video.src);
    video.src = lis[index].getAttribute("value");
    lis[index].style.backgroundColor = "#f5f5f5";
    lis[index].style.color = '#70a401';
    console.log(video.src);
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

            this.style.backgroundColor = "#f5f5f5";
            this.style.color = '#70a401';
            /*获得当前这个li 的索引号给index*/
            index = Number(this.getAttribute('index'));
            console.log(typeof (index));
            console.log(index);


        }
    }
    // console.log(url);


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


