window.addEventListener('load', function () {
    //获取元素
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;
    //2.鼠标经过focus 就显示隐藏左右按钮
    focus.addEventListener('mouseenter', function () {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        //停用定时器
        clearInterval(timer);
        timer = null;//清除定时器变量
    });
    focus.addEventListener('mouseleave', function () {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        //鼠标离开定时器开启，自动播放轮播图
        timer = setInterval(function () {
            //手动调用点击事件
            arrow_r.click();
        }, 2000)
    });
    //3.动态生成小圆圈，有几张图片，我就生成几个小圆圈
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    //打印ul的儿子们的个数
    console.log(ul.children.length);
    for (i = 0; i < ul.children.length; i++) {
        //创建一个小li
        var li = document.createElement('li');
        //记录当前小圆圈的索引号，通过自定义属性来做
        li.setAttribute('index', i);
        //把小li插入ol
        ol.appendChild(li);
        //4.小圆圈的排他思想，我们可以直接生成小圆圈的同时直接绑定事件
        li.addEventListener('click', function () {
            //干掉所有人 把所有的小li 清除current 类名
            for (i = 0; i < ol.children.length; i++) {
                ol.children[i].className = ''
            }
            //留下我们自己 当前的小li设置current 类名
            this.className = 'current';
            //5.点击小圆圈，移动图片，当然移动的是ul
            //ul移动的距离 小圆圈的索引号 乘以图片的宽度 注意是负值
            //当我们点击了某个小li 就拿到了当前小li的索引号
            var index = this.getAttribute('index');
            //当我们点击了某个小li 就要把这个li 的索引号 给num
            num = index;
            //当我们点击了某个小li 就要把这个li的索引号 给circle
            circle = index;

            // //连写方法
            // num = circle = index;


            console.log(focusWidth);
            console.log(index);
            animate(ul, -index * focusWidth);

        })

    }
    //把ol里面的第一个小li设置类名为current
    ol.children[0].className = 'current';
    //6.克隆第一张图片(li)放到ul最后面
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);

    //7.点击右侧按钮，图片滚动一张
    var num = 0;
    //circle 是控制小圆圈的播放
    var circle = 0;
    arrow_r.addEventListener('click', function () {
        if (num == ul.children.length - 1) {
            ul.style.left = 0;
            num = 0;
        }
        num++;
        animate(ul, -num * focusWidth);
        //8.点击右侧按钮，小圆圈跟随一起变化，可以在声明一个变量控制小圆圈的播放
        circle++;
        //如果circle ==4 说明走到最后我们克隆了这张图片了，我们就复原
        if (circle == 4) {
            circle = 0;
        }
        circleChange();
    });
    // //9.左侧按钮做法
    arrow_l.addEventListener('click', function () {
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';
            }
            num--;
            //调用缓动函数执行缓动函数
            animate(ul, -num * focusWidth, function () {

            });
            //8.点击右侧按钮，小圆圈跟随一起变化，可以在声明一个变量控制小圆圈的播放
            circle--;
            //如果circle <0 说明第一张图片，则小圆圈要改为第4个小圆圈

            if (circle < 0) {
                circle = 3;
            }
            circleChange();
            // circle = circle < 0 ? ol.children.length - 1 : circle;
        }
    );

    function circleChange() {
        //先清除其余小圆圈的current类名
        for (i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        //留下当前的小圆圈的current类名
        ol.children[circle].className = 'current';
    }

    //10.自动播放轮播图
    var timer = setInterval(function () {
        //手动调用点击事件
        arrow_r.click();
    }, 2000)
});