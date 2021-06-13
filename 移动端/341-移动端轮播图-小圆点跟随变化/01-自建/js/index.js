window.addEventListener('load', function () {
    alert('哈喽');
    //1.获取元素
    var focus = document.querySelector('.focus');
    var ul = focus.children[0];
    //2.获得focus的宽度
    var w = focus.offsetWidth;
    var ol =focus.children[1];//第二个孩子
    //利用定时器自动轮播图图片
    var index = 0;
    var timer = setInterval(function () {
        index++;

        var translateX = -index * w;
        //过度效果
        ul.style.transition = 'all .3s';
        ul.style.transform = 'translateX(' + translateX + 'px)';
    }, 2000);
    //等着我们过度完成之后，再去判断 监听过度完成的事件 transitionend
    ul.addEventListener('transitionend', function () {
        console.log('播放完了');
        //无缝滚动
        if (index == 3) {
            index = 0;
            console.log(index);
            //去掉过度效果 这样让我们的ul 快速的跳到目标位置
            ul.style.transition = 'none';
            //利用最新的索引号乘以宽度 去滚动图片
            var translateX = -index * w;
            ul.style.transform = 'translateX(' + translateX + 'px)';
        }else if(index <0){
            index = 2;
            ul.style.transition = 'none';
            //利用最新的索引号乘以宽度 去滚动图片
            var translateX = -index * w;
            ul.style.transform = 'translateX(' + translateX + 'px)';
        }
        //3.小圆点跟随变化
        //把ol里面li带有current类名选出来去掉类名 remove
        ol.querySelector('li.current').classList.remove('current')
        //让当前索引号的小li加上current add
        ol.children[index].classList.add('current')
    })
});