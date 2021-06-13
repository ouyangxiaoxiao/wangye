(function flexible(window, document) {
    //获取html 的根元素
    var docE1 = document.documentElement;
    //dpr 物理像素比
    var dpr = window.devicePixelRatio || 1;

    //adjust body font size 设置body字体大小
    function setBodyFontSize() {
        //判断 如果页面中有body这个元素 就设置body的字体大小
        if (document.body) {
            //就设置物理像素比是 12
            document.body.style.fontSize = (12 * dpr) + 'px'
        } else {
            //如果页面中没有body元素，则等着页面上的主要DOM 元素加载完成在去设置body字体大小
            document.addEventListener('DOMContentLoaded', setBodyFontSize)
        }
    }

    setBodyFontSize();

    //set 1rem = viewWidth /10 设置我们html 元素的 文字大小
    function setRemUnit() {
        var rem = docE1.clientWidth / 10;
        docE1.style.fontSize = rem + 'px';
    }

    setRemUnit();
    // //reset rem unit on page resize 当我们页面尺寸大小发生变化的时候，要重新设置rem 的大小
    window.addEventListener('resize', setRemUit);
    //pageshow 是我们重新加载页面触发的事件
    window.addEventListener('pageshow', function (e) {
        //e.persisted 返回的是true 就是说 如果这个页面是从缓存取过来的页面，也需要从新计算一下rem的大小
        if (e.persisted) {
            setRemUit()
        }
    });
    //detect 0.5px supports 有些移动端的浏览器不支持0.5像素写法
    if (dpr >= 2) {
        var fakBody = document.createElement('body');
        var testElement = document.createElement('div');
        testElement.style.border = '.5px solid transparent';
        fakBody.appendChild(testElement);
        docE1.appendChild(fakBody);
        if (testElement.offsetHeight === 1) {
            docE1.removeChild(fakBody)
        }
        docE1.removeChild(fakBody)
    }
}(window, document));