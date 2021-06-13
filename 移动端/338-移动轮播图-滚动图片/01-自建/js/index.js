window.addEventListener('load', function () {
    alert('哈喽');
    //1.获取元素
    var focus = document.querySelector('.focus');
    var ul = focus.children[0];
    //2.获得focus的宽度
    var w = focus.offsetWidth;
    //利用定时器自动轮播图图片
    var index = 0;
    var timer = setInterval(function () {
        index++;

        var translateX = -index * w;
        //过度效果
        ul.style.transition = 'all .3s';
        ul.style.transform = 'translateX(' + translateX + 'px)';
    }, 2000);
});