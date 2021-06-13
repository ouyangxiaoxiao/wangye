//var obj = {};
    //obj.name = 'andy';
    //简单动画函数封装 obj目标对象 target 目标位置
    //给不同的元素指定不同的定时器
    function animate(obj, target, callback) {
        console.log(callback);
        //当我们不断的点击按钮，这个元素的速度就会越来越快，因为开启了太多的定时器
        //解决方案就是 让我们的元素只有一个定时器执行
        //先清除之前的定时器，保留当前的定时器
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            //步长值写到定时器的里面
            var step = (target - obj.offsetLeft) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            if (obj.offsetLeft == target) {
                //停止定时器 本质是停止定时器
                clearInterval(obj.timer);
                //回调函数写到定时器结束里面
                if(callback){
                    // alert('你好吗？');
                    // span.style.backgroundColor = 'red';
                    callback();
                }
            }
            //每次+1的步长值 改为一个慢慢变小的值 步长公式(目标值-现在的位置)/10
            obj.style.left = obj.offsetLeft + step + 'px';
        }, 15);
    }