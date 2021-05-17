var win = window,
    doc = document,
    decode = decodeURIComponent,
    ua = navigator.userAgent.toLowerCase(),
    ie = /msie/.test(ua) && !/opera/.test(ua),//ie
    ie6 = /msie 6/.test(ua),//ie6
    ie7 = /msie 7/.test(ua), //ie7
    ie8 = /msie 8/.test(ua), //ie8
    opera = /opera/.test(ua), //opera
    firefox = /firefox/i.test(ua),
    chrome = /chrome/i.test(ua) && /webkit/i.test(ua) && /mozilla/i.test(ua); //chrome

//因为要用到https协议，父子窗口的通信设置document.domain为通配型域名
document.domain = 'qinxue.com';

$(function () {
    window.error = function () {
        //return false;
    }

    /**
     * 弹框：是否有遮罩层通过参数masked来配置。遮罩层样式需要在配置中说明maskCls
     *       并且需要事先在样式表中定义好。如果有遮罩层，则在Ie6下还需要定义shimCls
     * @class
     * @method menu
     * @param  {Object}  cfg 参数配置
     * @return {Object}  弹框对象
     */
    $.fn.popup = function (option) {
        var setting = {
            cls: "",
            style: '', //border:1px solid #ccc; padding:10px;position:absolute;background-color:#fff;
            hasCloseBtn: true,
            masked: true,
            maskCls: "masked",
            shimCls: "masked-shim",
            closeCls: "container-close"
        };

        if (option) $.extend(setting, option);


        var dialog, mask, shim;

        dialog = $(this);


        if (!$(this).length) {
            dialog = $(doc.createElement("div"));
            dialog.attr("class", setting.cls);
            dialog.attr("id", this.selector.substr(1, this.selector.length));
            $(document.body).append(dialog);
        }

        dialog.get(0).style.cssText = setting.style;
        //dialog.css({"position":"fixed","visibility": "hidden","background":"url(/images/zhuce_bk.png)"});
        dialog.css({"position": "fixed", "display": "none"});
        //dialog.css({"position":"absolute","visibility": "hidden"});

        //是否有关闭按钮
        if (setting.hasCloseBtn) {
            /*var close =  doc.createElement("input");
            close.type = "button";
            close.value = "关闭";*/
            var close = doc.createElement("a");
            close.className = setting.closeCls;
            close.innerText = " ";
            dialog.append(close);
            $(close).click(function () {
                handle.hide();
            })

        }

        //是否有遮罩层
        if (setting.masked) {
            if (ie6) {
                shim = doc.createElement("iframe");
                shim.className = setting.shimCls;
                $(doc.body).append(shim);
            }

            shim = $(shim);
            mask = doc.createElement("div");
            mask.id = setting.maskedId || "";
            mask.className = setting.maskCls || "";
            mask.style.display = "none";
            //mask.style.background = "none";
            $(doc.body).append(mask);
        }

        mask = $(mask);

        var handle = {};

        handle.dialog = dialog;

        //遮罩层
        handle.mask = mask;

        //ie6下的隐性iframe
        handle._shim = shim;

        /**
         * 弹框的位置定位，在window resize时重新定位;
         *       暂时没有在window滚动时（scroll）重新定位
         * @method setPosition
         */
        handle.setPosition = function () {
            var bHeight = dialog.height();
            //解决页面刷新后，iframe高度重置为0的情况,100,200为随意值
            bHeight = bHeight < 100 ? 200 : bHeight;
            var scrollTop = doc.documentElement.scrollTop || doc.body.scrollTop;
            //var bTop = doc.documentElement.clientHeight/2 + scrollTop - bHeight/2;
            //var bTop  = ($(window).height())/2 + scrollTop - bHeight/2;
            var bTop = ($(window).height()) / 2 - bHeight / 2;
            // msgDialog.dialog.offset().top
            //var bTop = '20%';
            var bWidth = dialog.width() || parseInt(dialog[0].style.width);
            bTop = bTop < 0 ? 0 : bTop;
            //console.log( bTop );
            //dialog.css({"top": bTop,'height':bHeight, "left": (doc.documentElement.clientWidth - bWidth)/2});
            dialog.css({"top": bTop, "left": (doc.documentElement.clientWidth - bWidth) / 2});
            if (mask) {
                var viewHeight = (doc.documentElement.scrollHeight >= doc.documentElement.clientHeight ? doc.documentElement.scrollHeight : doc.documentElement.offsetHeight) + "px";
                $(mask).css({"width": doc.documentElement.scrollWidth, "height": viewHeight});
                $(shim).css({"width": doc.documentElement.scrollWidth, "height": viewHeight});

            }
        };

        /**
         * dialog 弹出，弹出时重新定位
         *       暂时没有在window滚动时（scroll）重新定位
         *         同时触发事先注册好的onShow事件
         * @method show
         */
        handle.show = function (e) {
            //智能调整终弹框的大小，小于400的宽度设置为300
            if (dialog.width() < 300)
                dialog.width(300);

            //智能调整位置
            handle.setPosition();

            if (handle.mask) {

                $(mask).show();

                if (shim) {
                    $(shim).show();
                }

            }

            //dialog.css("visibility", "visible");
            dialog.slideDown();
        };

        /**
         * dialog 关闭
         *         同时触发事先注册好的onShow事件
         * @method show
         */
        handle.hide = function () {
            dialog.hide();
            if (handle.mask) {
                mask.hide();
                if (handle._shim) {
                    shim.hide();
                }
            }
        };

        $(window).bind('resize', function (e) {
            handle.setPosition();
        });

        return handle;

    };
});

/**
 * ajax请求封装
 *
 * @author zhouyang
 * @date 2013-10-10
 */
var ajax = {
    url: '',
    data: {},
    configAjax: {},
    configTip: {},
    init: function () {
        this.url = '';
        this.data = {};
        this.configAjax = {};
        this.configTip = {};
        return this;
    },
    setUrl: function (_url) {
        //拼接随机数，保证每次请求不会被缓存
        //查看字符串中是否有?
        if (_url.indexOf('?') >= 0)
            this.url = _url + "&random=" + Math.random();
        else
            this.url = _url + "?random=" + Math.random();
        return this;
    },
    setData: function (_data) {
        this.data = _data;
        return this;
    },
    setSn: function (_sn) {
        this.configAjax.sn = _sn;
        return this;
    },
    setAjaxType: function (_strType) {
        this.configAjax.ajaxType = _strType;
        return this;
    },
    setIsConfirm: function (_isConfirm) {
        this.configAjax.isConfirm = _isConfirm;
        return this;
    },
    setConfirmInfo: function (_strConfirmInfo) {
        this.configAjax.confirm_info = _strConfirmInfo;
        return this;
    },
    setCb: function (_strFunName) {
        this.configAjax.cb = _strFunName;
        return this;
    },
    setCbSuccess: function (_strFunName) {
        this.configAjax.cb_success = _strFunName;
        return this;
    },
    setCbError: function (_strFunName) {
        this.configAjax.cb_error = _strFunName;
        return this;
    },
    setCbSysError: function (_strFunName) {
        this.configAjax.cb_syserror = _strFunName;
        return this;
    },
    setIsLoadingTip: function (_isTip) {
        this.configTip.isLoadingTip = _isTip;
        return this;
    },
    setIsTip: function (_isTip) {
        this.configTip.isTip = _isTip;
        return this;
    },
    setIsTipSuccess: function (_isTip) {
        this.configTip.isTipSuccess = _isTip;
        return this;
    },
    setIsTipError: function (_isTip) {
        this.configTip.isTipError = _isTip;
        return this;
    },
    setTipId: function (_tipId) {
        this.configTip.tipId = _tipId;
        return this;
    },
    setLoadingTipId: function (_tipId) {
        this.configTip.tipLoadingId = _tipId;
        return this;
    },
    setLoadingTipMsg: function (_tipMsg) {
        this.configTip.tipLoadingMsg = _tipMsg;
        return this;
    },
    setTipPosition: function (_tipPosition) {
        this.configTip.tipPosition = _tipPosition;
        return this;
    },
    setIsAutoCloseTip: function (_isAutoCloseTip) {
        this.configTip.isAutoCloseTip = _isAutoCloseTip;
        return this;
    },
    preRun: function () {
        return ajaxV2(this.url, this.data, this.configAjax, this.configTip);
    }
};

var ajaxCbData = {
    cbData: {},
    /**
     * 生成ajax序列号
     */
    sn: function () {
        var dateToday = new Date();
        return dateToday.getHours() + '-' + dateToday.getMinutes() + '-' + dateToday.getSeconds() + '-' + dateToday.getMilliseconds() + '-' + Math.floor(Math.random() * 100 + 1);
    },
    set: function (_sn, _jsonData) {
        this.cbData[_sn] = _jsonData;
    },
    get: function (_sn) {
        var returnVal = this.cbData[_sn];
        delete (this.cbData[_sn]);
        return returnVal;
    }
};

var ajaxV2 = function (_url, _data, _config, _configTip) {
    var cfg = {
        sn: '',
        cb: '',//通信成功并未出现异常，回调函数
        cb_success: '',//操作成功，回调函数
        cb_error: '',//操作失败，回调函数
        cb_syserror: '',//系统错误，回调函数(如404,505等)
        ajaxType: 'POST',//请求类型
        isConfirm: false,//是否进行confirm确认
        confirm_info: ''//确认信息
    };
    //加载配置
    if (_config) $.extend(cfg, _config);
    //初始化提示信息区域
    var objAjaxTipV2 = ajaxTipV2(_configTip);

    //定义ajax操作
    var ajaxOp = {};
    ajaxOp.sn = cfg.sn;
    ajaxOp.run = function () {
        //确认操作
        if (cfg.isConfirm && !confirm(cfg.confirm_info)) return false;
        _data.ajaxsn = cfg.sn != '' ? cfg.sn : ajaxCbData.sn();
        //发送ajax请求
        $.ajax({
            type: cfg.ajaxType,
            url: _url,
            data: _data,
            beforeSend: function () {
                objAjaxTipV2.showLoadingMsg();
            },
            success: function (XMLHttpRequest, textStatus) {
                objAjaxTipV2.hideLoadingMsg();

                try {
                    var data = eval('(' + XMLHttpRequest + ')');
                    //将ajax响应结果存入返回值
                    ajaxCbData.set(data.SN, data);

                    if (data.ISOK) {
                        objAjaxTipV2.showSuccessMsg(data.MSG, data.LINK);
                        //执行成功回调函数
                        if (cfg.cb_success != '')
                            eval(cfg.cb_success);
                    } else {
                        //弹出验证
                        if (data.VERIFY) {
                            objDlgRefresh.showDlg();
                            return;
                        }

                        //未登录，弹出登录框
                        if (data.ISLOGIN == 0) {
                            popLogin.data = data.DATA;
                            popLogin.show();
                            return;
                        } else {
                            objAjaxTipV2.showErrorMsg(data.MSG, data.LINK);
                            //执行成功回调函数
                            if (cfg.cb_error != '')
                                eval(cfg.cb_error);
                        }

                        //加载图片
                        $('img').lazy();

                    }
                    if (cfg.cb != '')
                        eval(ajax.cb);
                } catch (e) {
                    //if( NBT_DEBUG ) dump(e);
                    objAjaxTipV2.showSysErrorMsg("返回的数据无法解析");
                    //执行失败回调函数
                    if (cfg.cb_syserror != '')
                        eval(cfg.cb_syserror);
                }
            },
            error: function (XMLHttpRequest, textStatus) {
                objAjaxTipV2.hideLoadingMsg();
                var msg = "出错了";
                try {
                    var data = eval('(' + XMLHttpRequest.response + ')');
                    msg = data.MSG;
                } catch (e) {

                }
                objAjaxTipV2.showSysErrorMsg(msg);
                //执行失败回调函数
                if (cfg.cb_error != '')
                    eval(cfg.cb_syserror);
            }
        });
    };
    return ajaxOp;
};

var ajaxTipV2 = function (_cfg) {
    var cfg = {
        isLoadingTip: true,//是否进行loading提示
        isTip: true, //是否进行失败提示
        isTipSuccess: true,//是否进行成功提示
        isTipError: true,//是否进行出错提示
        tipId: '#jqAjaxTip',//请求提示ID
        tipLoadingId: '#jqAjaxLoadingTip',//loading请求ID
        tipLoadingMsg: '',//loading提示
        tipPosition: {},//提示框显示位置
        tipTemplate: 'normal',//使用模板，暂未实现
        isAutoCloseTip: true//是否自动关闭成功提示信息
    };

    //初始化配置
    $.extend(cfg, _cfg);

    var ajaxTipV2Obj = {
        init: function () {
            //创建完整消息提示框
            $(cfg.tipId).html('');
            $(cfg.tipId).append('<div class="jqAjaxTitle"><a href="javascript:void(0);" class="close" onclick="javascript:$(this).parent().parent().hide();">x</a></div>');
            $(cfg.tipId).append('<div class="jqAjaxContainer"></div>');
        },
        /**
         * 加载loading提示信息
         */
        showLoadingMsg: function () {
            /*
            if( !cfg.isLoadingTip ) return;
            if( cfg.formTipId != '' )
                $( cfg.formTipId ).hide();
            _strInfo = ( typeof( _strInfo ) == 'undefined' || _strInfo == '' ) ? '正在处理您的请求...' : _strInfo;
            var tempLoadingStr = "<div class='loading'>"+_strInfo+"</div>";
            $( cfg.tipId + " > .jqAjaxContainer" ).html( tempLoadingStr );
            $( cfg.tipId ).css( cfg.tipPosition );
            $( cfg.tipId ).show();
            delete( tempLoadingStr );
            */

            if (!cfg.isLoadingTip) return;
            if (cfg.formTipId != '')
                $(cfg.formTipId).hide();

            if (cfg.tipLoadingId == "#jqAjaxLoadingTip") {
                var tmpIntTop = $(window).height() - $(cfg.tipLoadingId).height();
                var tmpIntLeft = $(window).width() - $(cfg.tipLoadingId).width();
                cfg.tipPosition.top = parseInt(tmpIntTop) / 2 + "px";
                cfg.tipPosition.left = parseInt(tmpIntLeft) / 2 + "px";
            }

            $(cfg.tipLoadingId).html(cfg.tipLoadingMsg);
            $(cfg.tipLoadingId).css(cfg.tipPosition);
            $(cfg.tipLoadingId).show();
            delete (tempLoadingStr);
        },
        hideLoadingMsg: function () {
            $(cfg.tipLoadingId).hide()
        },
        /**
         * 成功提示信息
         */
        showSuccessMsg: function (_strInfo, _aryLink) {
            if (!cfg.isTip || !cfg.isTipSuccess) return;
            _strInfo = (typeof (_strInfo) == 'undefined' || _strInfo == '') ? '保存成功' : _strInfo;
            /*_strInfo = '<div class="success">'+_strInfo+'</div>';
            $( cfg.tipId + " > .jqAjaxContainer" ).html( _strInfo );
            $( cfg.ipId ).css( cfg.tipPosition );
            $( cfg.tipId ).show();
            if( cfg.isAutoCloseTip )
            {
                window.setTimeout(function(){ $(cfg.tipId).hide(); }, 3000);
            }
            delete( jqTipId );*/
            //popMsg.showSuccessMsg( '温馨提示' ,  _strInfo , _aryLink , cfg.isAutoCloseTip );
            popMsgTop.showSuccessMsg(_strInfo, _aryLink, cfg.isAutoCloseTip);

        },
        /**
         * 错误提示信息
         */
        showErrorMsg: function (_strTipInfo, _aryLink) {
            if (!cfg.isTipError) return;
            //构建错误消息
            _strTipInfo = typeof (_strTipInfo) == 'undefined' ? '非常抱歉，操作失败!' : _strTipInfo;
            /*$( cfg.tipId + " > .jqAjaxContainer" ).html( '<div class="error">'+_strTipInfo+'</div>' );
            $( cfg.tipId ).css( cfg.tipPosition );
            $( cfg.tipId ).show();
            /*if( cfg.isAutoCloseTip )
            {
                window.setTimeout(function(){ $(cfg.tipId).hide(); }, 3000);
            }
            delete( _strTipInfo );*/
            //popMsg.showErrorMsg( '温馨提示' ,  _strTipInfo , _aryLink , cfg.isAutoCloseTip );
            popMsgTop.showErrorMsg(_strTipInfo, _aryLink, cfg.isAutoCloseTip);
        },
        /**
         * 系统错误提示信息
         */
        showSysErrorMsg: function (_strError) {
            this.hideLoadingMsg();

            //if( !cfg.isTip ) return;
            _strError = (typeof (_strError) == 'undefined' || _strError == '') ? '系统错误' : _strError;
            /*var tempErrorStr = "<div class='sysError'>"+_strError+"</div>";
            //$( jqTipId ).html( tempErrorStr );
            $( cfg.tipId + " > .jqAjaxContainer" ).html( tempErrorStr );
            $( cfg.tipId ).css( cfg.tipPosition );
            $( cfg.tipId ).show();
            if( cfg.isAutoCloseTip )
                window.setTimeout(function(){ $(cfg.tipId).hide(); }, 3000);
            delete( tempErrorStr );*/
            //popMsg.showErrorMsg( '温馨提示' ,  _strError , [] , cfg.isAutoCloseTip );
            popMsgTop.showErrorMsg(_strError, [], cfg.isAutoCloseTip);
        },
        /**
         * 隐藏消息提示框
         */
        hidMsg: function () {
            $(cfg.tipId).hide();
        }
    };
    ajaxTipV2Obj.init();
    return ajaxTipV2Obj;
}

/**弹框提示**/
var popMsgTop = {
    cfg: {
        tipPannelId: '#jqSessTipPannel',
        tipId: '#jqSessTip',
        autoClose: true
    },
    timer: null,
    showSuccessMsg: function (_strTipInfo, _aryLink, _bolAutoClose) {
        $(this.cfg.tipId).html('<div class="sessTipSuccess">' + _strTipInfo + '</div>');
        $(this.cfg.tipPannelId).show();

        if (_bolAutoClose != undefined)
            this.cfg.autoClose = _bolAutoClose;

        //3秒后自动隐藏-先清除计时器，再重新倒计时
        clearTimeout(popMsg.timer);
        if (this.cfg.autoClose) {
            popMsgTop.timer = window.setTimeout(function () {
                popMsgTop.hide();
            }, 3000);
        }
    },
    showErrorMsg: function (_strTipInfo, _aryLink, _bolAutoClose) {
        $(this.cfg.tipId).html('<div class="sessTipError">' + _strTipInfo + '</div>');
        $(this.cfg.tipPannelId).show();

        if (_bolAutoClose != undefined)
            this.cfg.autoClose = _bolAutoClose;

        //3秒后自动隐藏-先清除计时器，再重新倒计时
        clearTimeout(popMsgTop.timer);
        if (this.cfg.autoClose) {
            popMsgTop.timer = window.setTimeout(function () {
                popMsgTop.hide();
            }, 3000);
        }

    },
    hide: function () {
        $(this.cfg.tipPannelId).hide();
    }

};

/**
 * 一般登录提示小窗口
 */
var popMsg = {
    /**
     * msg弹框的内容框--bd里的最外层div
     * @property
     */
    content: null,
    hd: null,
    /**
     * msg弹框的实例化对象
     * @property
     */
    msgDialog: null,
    /**
     * msg弹框遮挡ie6下的select使用的iframe
     * @property
     */
    iframe: null,
    /**
     * 弹窗关闭计时器
     */
    timer: null,
    /**
     * msg弹框内容设置
     * @property
     * @method {Function} setBody
     * @param  {String}   html    要放入内容里的html代码
     */
    setBody: function (html) {
        this.content.html(html);
    },
    setHead: function (html) {
        if (!html) {
            return;
        }
        this.hd.html(html);
    },
    /**
     * msg弹框显示
     * @property
     * @method {Function} show
     */
    show: function (opt) {
        var setting = {
            html: '',
            hdText: '',
            target: null,
            autoHide: false,
            autoClose: true,
            masked: false
        };

        if (opt) $.extend(setting, opt);

        if (!this.msgDialog) {
            this.init({masked: setting.masked});
        }

        this.setBody(setting.html);
        this.setHead(setting.hdText);

        //定位，需要改进,delay
        /*if(setting.target){
            popMsg.msgDialog.subscribe("onShow", function(){
                var target = setting.target,
                    offset = target.offset();
                popMsg.msgDialog.dialog.css({"left": offset.left, "top": offset.top + target.height()});
            });
        }*/
        /*var offset = setting.target.offset();
        this.msgDialog.dialog.css({"left": offset.left, "top": offset.top + setting.target.height()});*/
        this.msgDialog.show();

        /*var self = this;

        setTimeout(function(){
            //点击其它地方关闭
            $(document).bind('click', function(e){
                var target = e.target;
                if(target.id !== 'popupMsg' && !$(target).parent("#popupMsg").length ){
                    self.hide();
                }
            });

        }, 1000);*/
        //3秒后自动隐藏-先清除计时器，再重新倒计时
        clearTimeout(popMsg.timer);
        if (setting.autoClose) {
            popMsg.timer = window.setTimeout(function () {
                popMsg.hide();
            }, 3000);
        }
    },
    showSuccessMsg: function (_strTitle, _strMsg, _link, _bolAutoClose, _bolMasked) {
        var cfg = {};
        cfg.hdText = _strTitle;
        cfg.html = '<div class="msg msgSuccess">' + _strMsg + '</div>';
        if (_link != undefined) {
            cfg.html += '<div class="linkto">';
            for (i in _link)
                cfg.html += _link[i];
            cfg.html += '</div>';
        }
        if (_bolAutoClose != undefined)
            cfg.autoClose = _bolAutoClose;
        if (_bolMasked != undefined)
            cfg.masked = _bolMasked;
        this.show(cfg);
    },
    showSuccessMsgNoSuccess: function (_strTitle, _strMsg, _link, _bolAutoClose, _bolMasked) {
        var cfg = {};
        cfg.hdText = _strTitle;
        cfg.html = '<div class="msg">' + _strMsg + '</div>';
        if (_link != undefined) {
            cfg.html += '<div class="linkto">';
            for (i in _link)
                cfg.html += _link[i];
            cfg.html += '</div>';
        }
        if (_bolAutoClose != undefined)
            cfg.autoClose = _bolAutoClose;
        if (_bolMasked != undefined)
            cfg.masked = _bolMasked;
        this.show(cfg);
    },
    showErrorMsg: function (_strTitle, _strMsg, _link, _bolAutoClose, _bolMasked) {
        var cfg = {};
        cfg.hdText = _strTitle;
        cfg.html = '<div class="msg msgError">' + _strMsg + '</div>';
        if (_link != undefined) {
            cfg.html += '<div class="linkto">';
            for (i in _link)
                cfg.html += _link[i];
            cfg.html += '</div>';
        }
        if (_bolAutoClose != undefined)
            cfg.autoClose = _bolAutoClose;
        if (_bolMasked != undefined)
            cfg.masked = _bolMasked;
        this.show(cfg);
    },
    showErrorMsgAddDIV: function (_strTitle, _strMsg, _link, _bolAutoClose, _bolMasked, _disklinks, _jsonExtendParams, _aryShikanChaptersHtml) {
        var cfg = {};
        cfg.hdText = _strTitle;
        cfg.html = '<div class="msg msgError">' + _strMsg + '</div>';
        if (_link != undefined) {
            cfg.html += '<div class="linkto">';
            for (i in _link)
                cfg.html += _link[i];
            cfg.html += '</div>';
        }
        var tempHtml = "";

        var intTuCatId = 0
        if (typeof (_jsonExtendParams) != 'undefined' && typeof (_jsonExtendParams.tu_catid) != 'undefined')
            intTuCatId = _jsonExtendParams.tu_catid;

        if (_disklinks != undefined) {

            for (i in _disklinks) {
                tempHtml += _disklinks[i];
            }
            cfg.html += "<div class='linkto_p03 linkto_p03" + intTuCatId + "'><div class='linkto_p03_01'><span>温馨提示：</span>若您不方便网上学习，您可以购买教程U盘，可货到付款</div><div class='linkto_p03_02'>" + tempHtml + "</div></div>";
        }
        tempHtml = "";
        if (_aryShikanChaptersHtml != undefined) {

            for (i in _aryShikanChaptersHtml) {
                tempHtml += _aryShikanChaptersHtml[i];
            }
            cfg.html += "<div class='linkto_p05 linkto_p05" + intTuCatId + "'><div class='linkto_p05_01'><strong>免费试看小节：</strong></div><div class='linkto_p05_02'>" + tempHtml + "</div></div>";
        }

        if (_bolAutoClose != undefined)
            cfg.autoClose = _bolAutoClose;
        if (_bolMasked != undefined)
            cfg.masked = _bolMasked;
        this.show(cfg);
    },
    showErrorMsgFreePlay: function (_strTitle, _strMsg, _link, _bolAutoClose, _bolMasked, _disklinks, _jsonExtendParams) {
        var cfg = {};
        cfg.hdText = _strTitle;
        cfg.html = '<div class="msg msgError">' + _strMsg + '</div><div class="linkto_p04">您也可以直接购买教程，随时学习，无任何限制。</div>';
        if (_link != undefined) {
            cfg.html += '<div class="linkto">';
            for (i in _link)
                cfg.html += _link[i];
            cfg.html += '</div>';
        }
        var tempHtml = "";
        var intTuCatId = 0
        if (typeof (_jsonExtendParams) != 'undefined' && typeof (_jsonExtendParams.tu_catid) != 'undefined')
            intTuCatId = _jsonExtendParams.tu_catid;

        if (_disklinks != undefined) {

            for (i in _disklinks) {
                tempHtml += _disklinks[i];
            }
            cfg.html += "<div class='linkto_p03 linkto_p03" + intTuCatId + "''><div class='linkto_p03_01'><span>温馨提示：</span>若您不方便网上学习，您可以购买教程U盘，可货到付款</div><div class='linkto_p03_02'>" + tempHtml + "</div></div>";
        }

        if (_bolAutoClose != undefined)
            cfg.autoClose = _bolAutoClose;
        if (_bolMasked != undefined)
            cfg.masked = _bolMasked;
        this.show(cfg);
    },
    showNoticeMsg: function (_strTitle, _strMsg, _link, _bolAutoClose, _bolMasked) {
        var cfg = {};
        cfg.hdText = _strTitle;
        cfg.html = '<div class="msg msgNotice">' + _strMsg + '</div>';
        if (_link != undefined) {
            cfg.html += '<div class="linkto">';
            for (i in _link)
                cfg.html += _link[i];
            cfg.html += '</div>';
        }
        if (_bolAutoClose != undefined)
            cfg.autoClose = _bolAutoClose;
        if (_bolMasked != undefined)
            cfg.masked = _bolMasked;
        this.show(cfg);
    },
    /**
     * msg弹框隐藏
     * @property
     * @method {Function} hide
     */
    hide: function () {
        this.msgDialog.hide();
        if (this.iframe) {
            this.iframe.hide();
        }
    },

    /**
     * msg弹框初始化 创建弹框实例
     *                 创建msg弹框dom元素
     * @property
     * @method {Function} hide
     */
    init: function (_cfg) {
        var cfg = {cls: "popup pop-msg", hasCloseBtn: true, masked: false};
        if (_cfg != undefined)
            $.extend(cfg, _cfg);
        var msgDialog = $("#popupMsg").popup(cfg);
        this.msgDialog = msgDialog;

        if (ie6) {//遮挡ie6下的select
            var iframe = doc.createElement("iframe");
            iframe.style.cssText = "border:0;position:absolute;z-index:3;top:0;left:0,display:none;";
            iframe.setAttribute("frameBorder", 0);
            document.body.appendChild(iframe);

            var setPosition = function () {
                $(iframe).height(msgDialog.dialog.height() + 20);
                $(iframe).width(msgDialog.dialog.width() + 18);
                $(iframe).css({'top': msgDialog.dialog.offset().top, 'left': msgDialog.dialog.offset().left});
            };
            $(window).bind('resize', function (e) {
                setPosition();
            });
        }


        var hd = doc.createElement("h2");
        hd.className = "hd";
        hd.innerHTML = "温馨提示";
        msgDialog.dialog.append(hd);
        var content = doc.createElement("div");
        content.className = "bd";
        msgDialog.dialog.append(content);
        this.hd = $(hd);
        this.content = $(content);
    },
    resizePopupDialog: function (_intWidth) {
        $("#popupMsg").width(_intWidth);
        this.msgDialog.setPosition();
    }
};

/**
 * 弹框
 * @property
 * @static {Object} popDlg
 */
var popDlg = {
    title: '',
    isTitleShow: true,
    url: '',
    urlParams: {},
    intDefaultWidth: 500,
    intDefaultHeight: 200,
    intWidth: 500,
    intHeight: 200,

    popupDialog: null,
    iframe: null,
    loading: null,
    dlgTitle: null,
    callbackInstance: [],
    init: function () {
        this.title = '';
        this.url = '';
        this.urlParams = {};
        return this;
    },
    setTitle: function (_strTitle) {
        this.title = _strTitle;
        return this;
    },
    setIsTitleShow: function (_isShow) {
        this.isTitleShow = _isShow;
    },
    setUrl: function (_strUrl) {
        //拼接url来源
        if (_strUrl.indexOf("?="))
            _strUrl += "&tpl=blank";
        else
            _strUrl += "?tpl=blank";

        this.url = _strUrl;
        return this;
    },
    setUrlParams: function (_jsonUrlParams) {
        this.urlParams = _jsonUrlParams;
        return this;
    },
    setData: function (_jsonUrlParams) {
        this.urlParams = _jsonUrlParams;

        return this;
    },
    changeTitle: function (_strTitle) {
        this.dlgTitle.html(_strTitle)
        return this;
    },
    changeTitleClass: function (_class) {
        this.dlgTitle.attr("class", _class)
        return this;
    },
    setDefaultWidth: function (_intWidth) {
        this.intDefaultWidth = _intWidth;
        return this;
    },
    setDefaultHeight: function (_intHeight) {
        this.intDefaultHeight = _intHeight;
        return this;
    },
    setHeight: function (_intHeight) {
        var intHeight = 0;
        if (typeof (_intHeight) == 'undefined')
            intHeight = $("#popupDlg").find('iframe').eq(0).contents().height();
        else
            intHeight = _intHeight;

        if (intHeight <= 0)
            intHeight = $("#popupDlg").find('iframe').eq(0).contents().height();
        if (intHeight <= 0)
            intHeight = 310;
        if (intHeight > 700)
            intHeight = 700;

        this.intHeight = intHeight < this.intDefaultHeight ? this.intDefaultHeight : intHeight;
        return this;
    },
    setWidth: function (_intWidth) {
        var intWidth = 0;
        if (typeof (_intWidth) == 'undefined')
            intWidth = $("#popupDlg").find('iframe').eq(0).contents().width();
        else
            intWidth = _intWidth;

        if (intWidth <= 0)
            intWidth = $("#popupDlg").find('iframe').eq(0).contents().width();

        if (intWidth <= 0)
            intWidth = 500;
        if (intWidth > 1024)
            intWidth = 1024;

        this.intWidth = intWidth < this.intDefaultWidth ? this.intDeafultWidth : intWidth;

        return this;
    },
    instance: function () {
        if (!this.popupDialog) {
            this.popupDialog = $("#popupDlg").popup({
                cls: "popup login-popup",
                hasCloseBtn: true,
                masked: true,
                maskCls: "masked",
                shimCls: "masked-shim",
                closeCls: "pop-close",
                closeBtnOnClick: "popDlg.hide()"
            });

            var dialog = this.popupDialog.dialog;

            var dlgTitle = doc.createElement("div");
            dlgTitle.className = "dlg-title DP_Title";
            dialog.append(dlgTitle);
            this.dlgTitle = $(dlgTitle);

            var bd = doc.createElement("div");
            bd.className = "bd";
            bd.setAttribute('style', 'background-color:#FFF;');
            dialog.append(bd);

            var loadingTip = doc.createElement("div");
            loadingTip.className = "bdLoading";
            loadingTip.innerHTML = "正在努力加载，请稍候...";
            loadingTip.setAttribute('style', 'display:block;');
            bd.appendChild(loadingTip);
            this.loading = $(loadingTip);

            var iframe = doc.createElement("iframe");
            iframe.id = "jqDlgIframe";
            iframe.name = "jqDlgIframe";
            iframe.className = "dlg-popup-iframe";
            iframe.setAttribute("scrolling", "no");
            iframe.setAttribute("frameBorder", "0");
            iframe.setAttribute("height", "320");
            iframe.setAttribute('style', 'display:none;');
            //iframe.setAttribute("src", '/index.php?r=index/blank');
            //iframe.setAttribute("src", this.url);
            bd.appendChild(iframe);
            this.iframe = $(iframe);

            //将当前iframe窗口加入到js消息系统中
//			var iframeDlg = document.getElementById(iframe.id);
//			messenger.addTarget(messenger.contentWindow, 'iframeDlg');
        }

        //默认显示加载中,并隐藏iframe区块
        this.loading.show();
        this.iframe.hide();

        this.popupDialog.dialog.width(this.intDefaultWidth);
        this.popupDialog.setPosition();
    },
    //显示弹框
    show: function (_intWidth, _intHeight) {
        //初始化
        this.instance();

        //设置默认窗体大小
        this.setPosition(this.intDefaultHeight, this.intDefaultWidth);

        //加载loading提示
        this.showLoading();

        //设置标题
        if (this.isTitleShow) {
            this.dlgTitle.html(this.title).show();
            this.dlgTitle.prev("a").attr('class', 'pop-close');
        } else {
            this.dlgTitle.prev("a").attr('class', 'pop-close02');
            this.dlgTitle.hide();
        }

        //设置加载的url
        var tmpUrl = this.url;
        var strUrlQueryPrames = "";
        for (var p in this.urlParams) {
            strUrlQueryPrames += ("&" + p + "=" + this.urlParams[p]);
        }
        tmpUrl += strUrlQueryPrames;
        /*if( this.iframe.attr("src") != tmpUrl )
            this.iframe.attr("src", tmpUrl );
        else
            this.resizePopupDialog();*/
        this.iframe.attr("src", tmpUrl);
        this.popupDialog.show();
        this.resizePopupDialog();
    },
    //隐藏弹框
    hide: function () {
        if (this.popupDialog) {
            this.loading.show();
            this.iframe.hide();
            this.iframe.attr("src", MOBILE_DOMAIN + '/proxy.html');
            this.changeTitleClass("dlg-title DP_Title");
            this.popupDialog.hide();
        }
    },
    showIframe: function () {
        this.loading.css({'height': this.intDefaultHeight, 'line-height': this.intDefaultHeight + 'px'}).hide();
        this.iframe.show();
    },
    showLoading: function () {
        this.loading.css({'height': this.intDefaultHeight, 'line-height': this.intDefaultHeight + 'px'}).show();
        this.iframe.hide();
    },
    //调整弹框的大小
    resizePopupDialog: function (_intHeight, _intWidth) {
        this.initPosition();
        this.showIframe();
        this.setPosition(_intHeight, _intWidth);
    },
    initPosition: function () {
        this.loading.css({'height': this.intDefaultHeight, 'line-height': this.intDefaultHeight + 'px'});
        this.iframe.attr("height", this.intDefaultHeight);
        this.iframe.attr("width", this.intDefaultWidth);
        this.iframe.width(this.intDefaultWidth);
        this.iframe.height(this.intDefaultHeight);
        this.popupDialog.dialog.width(this.intDefaultWidth);
        this.popupDialog.setPosition();
    },
    setPosition: function (_intHeight, _intWidth) {
        this.setHeight(_intHeight);
        this.setWidth(_intWidth);

        this.iframe.attr("height", this.intHeight);
        this.iframe.attr("width", this.intWidth);
        this.iframe.width(this.intWidth);
        this.iframe.height(this.intHeight);
        this.popupDialog.dialog.width(this.intWidth);
        this.popupDialog.setPosition();
    }
};

/**
 * 登录弹框
 * @property
 * @static {Object} popLogin
 */
var popLogin = {

    data: {},

    popupDialog: null,

    iframe: null,

    callbackInstance: [],

    instance: function () {
        /*if(!this.popupDialog) {
            this.popupDialog = $("#popup").popup({
                cls: "popup login-popup",
                hasCloseBtn: true,
                masked: true,
                maskCls: "masked",
                shimCls: "masked-shim",
                closeCls:"pop-close"
            });
            var dialog = this.popupDialog.dialog;

            var bd = doc.createElement("div");
            bd.className = "bd";
            dialog.append(bd);

            var loadMsg = doc.createElement("div");
            loadMsg.className = "loading";
            loadMsg.innerHTML = "正在努力加载...";
            bd.appendChild( loadMsg );

            var iframe = doc.createElement("iframe");
            iframe.className = "login-iframe";
            iframe.setAttribute("scrolling", "no");
            iframe.setAttribute("frameBorder", "0");
            iframe.style.display = 'none';
            iframe.style.padding = '0px';
            iframe.style.margin = '0px';
            //iframe.setAttribute("height", "320");
            //iframe.setAttribute("onload", "this.height=this.contentWindow.document.documentElement.scrollHeight");

            bd.appendChild(iframe);
            this.iframe = $(iframe);

            //var borderB = doc.createElement("i");
            //borderB.className = "rc-bt";
            //borderB.innerHTML = '<i class="l"></i><i class="m"></i><i class="r"></i>';
            //dialog.append(borderB);
        }*/
    },
    //显示登录框
    show: function (loginType) {

        var loginUrl = URL_LOGIN_MINI;
        var jsonUrlParams = this.data;

        for (i in jsonUrlParams) {
            //loginUrl += loginUrl+"&"+i+'='+jsonUrlParams[i];
            loginUrl += "&" + i + '=' + jsonUrlParams[i];
        }
        if (window.document.location.protocol == 'https:') {
            loginUrl = URL_LOGIN_MINI + "&isfromhttps=1";
            loginUrl = urlUtil.toHttps(loginUrl);
        }

        var urlLogin = MOBILE_DOMAIN + "/index.php?r=login/index&random=" + Math.random();
        urlLogin += "&gourl=" + utilEncryptBase64.encode(location.href);


        if (ENV_ISMOBILE) {
            window.location.href = urlLogin;
            return;
        }

        popDlg.init();
        popDlg.setUrl(loginUrl);
        popDlg.setDefaultWidth(300);
        popDlg.setDefaultHeight(350);
        popDlg.show();
        popDlg.changeTitle('');
        popDlg.changeTitleClass('noTitle');
        return;


    },
    //隐藏登录框
    hide: function () {
        popDlg.hide();
    },
    //调整登录框的大小
    resizePopupDialog: function (_intHeight) {
        var intHeight = 0;
        if (typeof (_intHeight) == 'undefined')
        //intHeight = $("#popup").find('iframe').eq(0).contents().height();
            intHeight = $("#popup").find('iframe').eq(0).contents().find("#jqLoginPannel").eq(0).height();
        else
            intHeight = _intHeight;

        if (intHeight < 350)
            intHeight = 350;

        /*if( this.iframe == null )
            return;

        this.iframe.css({height:intHeight});
        //this.iframe.height(intHeight);
        //alert(intHeight);

        $("#popup").find('iframe').eq(0).fadeIn();
        $("#popup").find('.loading').eq(0).hide();
        */
        popDlg.resizePopupDialog(0, intHeight);
    },
    //登录之后的通用操作
    callbackLogin: function () {
        this.hide();
        //重写登录之后的信息
        ajax.init()
            .setUrl(URL_MYINFO)
            .setIsTip(false)
            .setCbSuccess("popLogin.callbackLoginSuccess(data)")
            .preRun()
            .run();
    },
    callbackLoginSuccess: function (data) {
        objHeaderLogin.refreshLoginInfo();

        this.afterCallbackLoginSuccess(data);
    },
    //登录之后的回调函数,需要具体的页面进行重写
    afterCallbackLoginSuccess: function (data) {

    }
};

/*
 * url功能
 * 
 */
var urlUtil = {
    /**
     * 当前页面跳转
     * @params string _strGourl 页面跳转地址
     * @param  int     _intSecond    多少秒后执行
     */
    gourl: function (_strGourl, _intSecond) {
        if (typeof (_intSecond) == 'undefined' || _intSecond == '') {
            window.location.href = _strGourl;
        } else {
            setTimeout("window.location.href = '" + _strGourl + "' ", _intSecond);
        }
    },
    /**
     * 带confirm信息的当前页面跳转
     * @param    string    _strConfirm    确认信息
     * @params string _strGourl 页面跳转地址
     * @param  int     _intSecond    多少秒后执行
     */
    confirmGoUrl: function (_strConfirm, _strGourl, _intSecond) {
        if (confirm(_strConfirm)) {
            this.gourl(_strGourl, _intSecond);
        }
    },
    /**
     * 重新加载本页面
     * @param  int     _intSecond    多少秒后执行
     */
    reloadPage: function (_intSecond) {
        if (typeof (_intSecond) == 'undefined' || _intSecond == '') {
            document.location.reload();
        } else {
            setTimeout("document.location.reload();", _intSecond);
        }
    },
    /**
     * 在新窗口中打开指定页面
     * @params string _strGourl 页面跳转地址
     * @param  int     _intSecond    多少秒后执行
     */
    openurl: function (_strGourl, _intSecond) {
        if (typeof (_intSecond) == 'undefined' || _intSecond == '') {
            window.open(_strGourl);
        } else {
            setTimeout("window.open( '" + _strGourl + "' );", _intSecond);
        }
    },
    /**
     * 当前窗口是否HTTPS协议
     */
    isHttps: function () {
        return 'https:' == window.document.location.protocol ? 1 : 0;
    },
    /**
     * 当前窗口的父窗口是否HTTPS协议
     */
    isParentWindowHttps: function () {
        return 'https:' == window.parent.document.location.protocol ? 1 : 0;
    },
    /**
     * 将当前url转换为https协议
     */
    toHttps: function (_url) {
        return _url.replace("http:", "https:");
    }
};


/**
 * 倒计时
 *
 */
var yhtCount = function (dom, config) {
    var cfg = {};
    if (config) $.extend(config, cfg);
    var count = {dom: dom, ss: $(dom).attr('_attr_time'), status: $(dom).attr('_attr_status')};
    var objInterval = null;
    //start
    count.start = function () {
        if (this.ss == 0) {
            $(dom).html('马上开始，3秒后自动刷新');
            this.over();
            return;
        } else if (this.ss < 0) {
            if (this.status == 1)
                $(dom).html('已经结束');
            else if (this.statu == 2)
                $(dom).html('马上开始，3秒后自动刷新');

            this.over();
            return;
        } else {
            this.countDown();
        }
    };
    //倒计时
    count.countDown = function () {
        //格式化为天时分秒
        var second = Math.floor(this.ss % 60);
        var minite = Math.floor((this.ss / 60) % 60);
        var hour = Math.floor((this.ss / 3600) % 24);
        var day = Math.floor((this.ss / 3600) / 24);
        var strHtml = '';
        if (day > 0)
            strHtml += day + "&nbsp;天&nbsp;";
        strHtml += hour + "&nbsp;小时&nbsp;" + minite + "&nbsp;分&nbsp;" + second + "&nbsp;秒";
        $(this.dom).html(strHtml);
        this.ss--;
    };

    //倒计时完毕
    count.over = function () {
        //清除计时器对象
        window.clearInterval(objInterval);
        reloadPageByTimeout(3000);
    };

    //开启计时器对象
    objInterval = setInterval(function () {
        count.start();
    }, 1000);

    return count;
};

/**
 * 防快速刷新对话框
 */
var objDlgRefresh = {
    isInit: false,
    initDlg: function () {
        if (!this.isInit) {
            var strHtml = '<div class="prevent_refresh_tc" id="jqDlgRefreshTc" style="display:none;"><iframe id="jqDlgRefreshTcIframe" width="560" height="480" __src="/index.php?r=feedBack/refreshVerify&tpl=blank"></iframe></div><div class="prevent_refresh_bj" id="jqDlgRefreshTcBg" style="display:none;">&nbsp;</div>';
            $("body").append(strHtml);
            this.isInit = true;
        }
    },
    showDlg: function () {
        this.initDlg();

        $("#jqDlgRefreshTcIframe").attr("src", $("#jqDlgRefreshTcIframe").attr('__src'));
        $("#jqDlgRefreshTc").show();
        $("#jqDlgRefreshTcBg").show();
    },
    closeDlg: function () {
        $("#jqDlgRefreshTcIframe").attr('src', '');
        $("#jqDlgRefreshTc").hide();
        $("#jqDlgRefreshTcBg").hide();
    }
};


/******************************************************************************
 * base64 编码解码
 *
 * @autho zhouyang 20190702
 */
var utilEncryptBase64 = {
    // private property
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    // public method for encoding
    encode: function (input) {
        var _keyStr = this._keyStr;
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = this._utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
                _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
        }
        return output;
    },

    // public method for decoding
    decode: function (input) {
        var _keyStr = this._keyStr;
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = _keyStr.indexOf(input.charAt(i++));
            enc2 = _keyStr.indexOf(input.charAt(i++));
            enc3 = _keyStr.indexOf(input.charAt(i++));
            enc4 = _keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = this._utf8_decode(output);
        return output;
    },

    // private method for UTF-8 encoding
    _utf8_encode: function (string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }
        return utftext;
    },

    // private method for UTF-8 decoding
    _utf8_decode: function (utftext) {
        var string = "";
        var i = 0;

        var c = 0, c1 = 0, c2 = 0, c3 = 0;

        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }
}

/***************************************************************************************
 * 加密解密算法
 *
 * @autho zhouyang 20190702
 */
var utilCrypt = {
    //解密方法
    decrypt: function (_str, _strKey) {
        _str = String(_str);
        _str = utilEncryptBase64.decode(_str);

        var aryKey = this.getKey(_strKey);
        var intKeyLength = aryKey.length;
        var intStrLength = _str.length;

        var strReturn = '';
        for (var i = 0; i < intStrLength; i++) {
            var intByte = (_str[i].charCodeAt()) ^ (aryKey[i % intKeyLength]);
            strReturn += String.fromCharCode(intByte)
        }

        return utilEncryptBase64.decode(strReturn);
    },
    //加密方法
    encrypt: function (_str, _strKey) {
        //必须将要解密的字符串base64,因为js的中文和PHP的中文 字符串长度计算不一致
        _str = utilEncryptBase64.encode(_str);

        var aryKey = this.getKey(_strKey);
        var intKeyLength = aryKey.length;
        var intStrLength = _str.length;

        var strReturn = '';
        for (var i = 0; i < intStrLength; i++) {
            var intByte = (_str[i].charCodeAt()) ^ (aryKey[i % intKeyLength]);
            strReturn += String.fromCharCode(intByte);
        }
        return utilEncryptBase64.encode(strReturn);
    },
    getKey: function (_strKey) {
        var aryKey = [];
        for (var i = 0; i < _strKey.length; i++) {
            aryKey[i] = ((_strKey[i].charCodeAt() + i) & 255);
        }
        return aryKey;
    }
};


/**
 * 图片自适应
 * 仅支持学习导航
 */
var objImgAdapter = {
    strStudyImgPathGt500: '',
    strStudyImgPathLt500: '',
    init: function () {
        this.dispatchImg();
        objSysRegist.addResizeEvent("objImgAdapter.dispatchImg();");
    },
    dispatchImg: function () {
        //学员流程图片
        var intWidth = $("#jqImgStudyNav").parent().width();
        var strStudyImgPathGt500 = STATIC_DOMAIN + '/mobile/images/xxlc02.jpg';
        var strStudyImgPathLt500 = STATIC_DOMAIN + '/mobile/images/xxlc.jpg';

        var strPath = intWidth <= 500 ? strStudyImgPathLt500 : strStudyImgPathGt500;

        $("#jqImgStudyNav").attr('src', strPath).show();
    }
};


/***
 * 系统事件注册
 *
 * 目前仅支持分辨率切换事件注册
 */
var objSysRegist = {
    resizeList: {},
    addResizeEvent: function (_functionName) {
        var dateToday = new Date();
        var sn = dateToday.getHours() + '-' + dateToday.getMinutes() + '-' + dateToday.getSeconds() + '-' + dateToday.getMilliseconds() + '-' + Math.floor(Math.random() * 100 + 1);

        this.resizeList[sn] = _functionName;
    },
    evalResizeEvent: function () {
        window.onresize = function () {
            for (i in objSysRegist.resizeList) {
                console.log(objSysRegist.resizeList[i]);
                eval(objSysRegist.resizeList[i]);
            }
        }
    }
};


/**
 * 在控制台输出调试信息
 */
function sysDebugLog(_log) {
    console.log(_log);
}

/*********************************替换头像******************************************************/

function replaceUserIcon(_thisobj, _intUid, _strType, _boolIsHttps) {
    imagename = _strType + "_" + (_intUid % 20) + ".jpg";
    if (_boolIsHttps == null || _boolIsHttps == 'no') {
        $(_thisobj).attr('src', IMAGE_DOMAIN + "/custom/" + imagename);
    } else {
        IMAGE_DOMAIN = IMAGE_DOMAIN.replace(/http:\/\//g, "https://");
        $(_thisobj).attr('src', IMAGE_DOMAIN + "/custom/" + imagename);
    }

}

var objHeaderLogin = {
    //isinit 是否强制执行  isonce 是否是第一次点击 //strinfo 取值信息
    cfg: {isinit: false, strinfo: ""},
    getLoginInfo: function (_isSendRequest) {
        $("#headHtml").show();

        if (_isSendRequest != true && this.cfg.strinfo.length != 0) {
            $("#headHtml").html(this.cfg.strinfo);
            return;
        }

        //获取登录状态
        ajax.init()
            .setUrl('/index.php?r=index/loadMenu')
            .setIsTip(false)
            .setCbSuccess("objHeaderLogin.callbackLoginSuccess(data)")
            .setIsLoadingTip(false)
            .preRun()
            .run();

    },
    callbackLoginSuccess: function (data) {
        this.cfg.strinfo = data.DATA.HTML;
        $("#headHtml").html(this.cfg.strinfo);
    },
    refreshLoginInfo: function () {
        this.getLoginInfo(true);
    }
};


/*********************************页面加载完后执行的js操作***************************************/

$(function () {
    $('img').lazy();

    //分辨率切换事件注册
    objSysRegist.addResizeEvent("popLogin.resizePopupDialog();");

    $("#headerLogin").click(function () {
        objHeaderLogin.getLoginInfo(false);
    });
    //图片自适应
    objImgAdapter.dispatchImg();

    //教程图片
    $(".jqTuIconSmall").error(function () {
        $(this).attr('src', IMAGE_DOMAIN + "/tu_small.png");
    });
    $(".jqTuIconMiddle").error(function () {
        $(this).attr('src', IMAGE_DOMAIN + "/tu_middle.jpg");
    });
    $(".jqTuIconMiddler").error(function () {
        $(this).attr('src', IMAGE_DOMAIN + "/tu_middler.jpg");
    });
    $(".jqTuIconBig").error(function () {
        $(this).attr('src', IMAGE_DOMAIN + "/tu_big.jpg");
    });
    //用户大图
    $(".jqUIconBig").error(function () {
        replaceUserIcon(this, $(this).attr('_att_uid'), 'B');
    });
    //
    $(".jqUIconMiddle").error(function () {
        replaceUserIcon(this, $(this).attr('_att_uid'), 'M', $(this).attr('https'));
    });
    $(".jqUIconSmall").error(function () {
        replaceUserIcon(this, $(this).attr('_att_uid'), 'S');
    });
});

$(function () {
    var _talkHeight = $("body").width() * 0.613333;
    $("#jqPlayerLoading img, #myPlayer img").css("height", _talkHeight);
});

$(function () {
    if ($("body").height() <= $(window).height()) {
        $(window).resize(function () {
            $("body").css("height", $(window).height());
        });
        $("body").css("height", $(window).height());
    }

    $(window).resize(function () {
        $(".i_top, .member_bottom, .vip_but, .teacher_list_list").css("left", $(window).width() / 2 - $("body").width() / 2);
    });

    var ILeft = $(window).width() / 2 - $("body").width() / 2;
    $(".i_top, .member_bottom, .vip_but, .teacher_list_list").css("left", ILeft)

});
