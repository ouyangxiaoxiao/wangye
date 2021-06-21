window.addEventListener('load', function () {
    var video = document.getElementById('video');
    var kcxq = document.querySelector('.kcxq');
    console.log(kcxq);
    var lis = kcxq.getElementsByTagName('li');
    console.log(lis);
    var url = [];
    for (var i = 0; i < lis.length; i++) {

        url[i] = lis[i].getAttribute("value");

    }
    console.log('5566');
    console.log(url);
    console.log(video.src);
    video.src = url[0];
    console.log(video.src);
    for (i = 0; i < lis.length; i++) {
        lis[i].onclick = function () {
            console.log('点击了');
            video.src = this.getAttribute("value");
            console.log(this.getAttribute("value"));

            /*1.先去掉所有元素的样式*/
            for (var i = 0; i < lis.length; i++) {
                lis[i].style.backgroundColor = "";
            }

            /*当前这个元素的样式 的背景颜色设置为粉色*/
            // this.style.backgroundImage= "url('https://csdnimg.cn/release/blogv2/dist/pc/img/translate.png')";
            // this.style.backgroundColor = "pink";
            // this.style.color = "white";
            this.style.backgroundColor = "#f5f5f5";





        }
    }
});


