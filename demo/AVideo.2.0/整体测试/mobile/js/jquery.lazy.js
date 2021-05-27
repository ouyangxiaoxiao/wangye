(function($){
    // 默认配置
    var lazyConf = {
        attr:'_src', // 默认的保存图片地址的属性
        callback:null // 用户回调,返回图片地址
    };
    // 插件对象
    $.fn.extend({
        // 主方法
        lazy:function(config){
            // this == 当前jQuery对象
            var jqObj = this;
            // 是否支持W3C标准的
            var body = document.compatMode=='BackCompat' ? document.body : document.documentElement;
            // 宣染过程
            var lazyFun = function(){
                // 得到 scrollTop 兼容 chrome
                var sTop = document.body.scrollTop + document.documentElement.scrollTop;
                // 得到当前可见区域的最大高度
                var currHeight = body.clientHeight + sTop;

                //是否在屏幕可视区域
                var intDocumentScrollTop = $(document).scrollTop();
                var intWindowHeight = $(window).height();

                //异步加载图片
                var lazyImg = function( _jqDom )
                {
                    var src = _jqDom.attr('src');
                    var _src = _jqDom.attr(lazyConf.attr);
                    if( _src == undefined )
                        return;

                    if( typeof(STATIC_RESOURCE_CDN) != 'undefined' && STATIC_RESOURCE_CDN == 1 )
                    {
                        _cdnDomain = IMAGE_DOMAIN;
                        _cdnDomain = _cdnDomain.replace('http://','');
                        _cdnDomain = _cdnDomain.replace('https://','');
                        _cdnDomain = _cdnDomain.replace('//','');
                        _src = _src.replace("image.qinxue.com",_cdnDomain);
                    }

                    // 默认根据自定义属性载入
                    if((typeof lazyConf.callback) != 'function')
                    {
                        //sysDebugLog( '开始预加载图片' );
                        //创建一个Image对象，实现图片的预下载
                        var imgPreLoad = new Image();
                        imgPreLoad.src = _src;
                        //预加载正常，则更新图片
                        imgPreLoad.onload = function()
                        {
                            _jqDom.attr('src', _src);
                        };
                        //预加载失败，抛出异常，不更新图片，或者显示一张加载失败的图片
                        imgPreLoad.onerror = function()
                        {
                            _src = _src.replace("jpg","gif");
                            var imgPreLoad2 = new Image();
                            imgPreLoad2.src = _src;
                            //预加载正常，则更新图片
                            imgPreLoad2.onload = function()
                            {
                                _jqDom.attr('src', _src);
                            };
                            //预加载失败，抛出异常，不更新图片，或者显示一张加载失败的图片
                            imgPreLoad2.onerror = function()
                            {
                                if( _jqDom.attr('_src_error') != undefined )
                                {
                                    _jqDom.attr('src', _jqDom.attr('_src_error'));
                                    _jqDom.attr('class','imgError');
                                }
                            };

                        };
                    }else{
                        // 调用回调得到图片地址
                        var imgObj = _jqDom;
                        setTimeout(function(){
                            _jqDom.attr('src', lazyConf.callback(imgObj));
                        }, 8);
                    }
                };

                //异步处理本域名script
                var lazyScript = function( _jqDom )
                {
                    var cb = _jqDom.attr('data-callback');
                    if( cb == undefined )
                        return;

                    try{
                        eval( cb );
                    }catch(e){
                        //过滤错误
                    }
                };

                //异步加载第三方script
                var lazyThirdPartyScript = function( _jqDom )
                {
                    var url = _jqDom.attr('data-url');

                    if( url == undefined )
                        return;

                    _jqDom.attr('src',url);

                };

                // 遍历图片对象
                jqObj.each(function(){
                    // 当前图片对象和它的"src"属性
                    var dom = $(this);
                    var bolIsLazyed = dom.attr('_att_lazyed');

                    // 结点在可显区域了并且没有装载过就装载(防止复制载入)
                    var bolIsInScreen = (intWindowHeight+intDocumentScrollTop >= dom.offset().top) ? true : false;

                    //if(currHeight>this.offsetTop && (bolIsLazyed==undefined || bolIsLazyed=='false'))
                    if( bolIsInScreen && bolIsLazyed == undefined )
                    {
                        //滚屏加载图片
                        if( dom.get(0).tagName == 'IMG' )
                            lazyImg( dom );

                        //滚屏处理js
                        if( dom.get(0).tagName == 'SCRIPT' )
                        {
                            //加载第三方js
                            if( dom.attr('data-url') != undefined )
                                lazyThirdPartyScript( dom );
                        }

                        //滚屏处理js
                        if( dom.get(0).tagName == 'A' )
                        {
                            //处理本网站的js回调
                            if( dom.attr('data-callback') != undefined )
                            {
                                lazyScript( dom );
                            }
                        }

                        //标记为已加载过
                        dom.attr('_att_lazyed','true');
                    }
                });
            }
            // 合并配置
            $.extend(lazyConf, config||{});
            // 绑定窗口缩放/滚动条事件
            $(window).resize(lazyFun);
            $(window).scroll(lazyFun);
            // 渲染开始
            lazyFun();
        }
    });
})(jQuery);

$(function(){

    //图片延迟加载
    $("img[_src]").lazy();

    //第三方js延迟加载
    setTimeout( function(){ $("script[data-url]").lazy(); } , 3000 );
    //本域js延迟异步请求
    $("a[data-callback]").lazy();
});
