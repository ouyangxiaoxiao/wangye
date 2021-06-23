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
                this.style.color = '';
            }

            this.style.backgroundColor = "#f5f5f5";
            this.style.color = '#70a401';





        }
    }
});


