/*
 * @common.js 通用函数
 * @author xuanbin zhang
 * @time 2015-10-29
 **/

define('lib/common', ['./jweixin'], function(wx) {
    var loadWx = function() {
        if (typeof WdatePicker == 'undefined') {
            var scr = document.createElement('script');
            scr.src = '/static/js/lib/jweixin.js';
            document.body.appendChild(scr);
        }
    };

    //获取当前时间 如2013-08-08 08:08:08
    //需要把时间格式处理为YYYY/MM/DD（yyyy:mm:dd这种格式某些浏览器中存在bug，比如safari）
    var getTime = function(time, format) {

        var d = new Date(time);
        var year = d.getFullYear();
        var month = d.getMonth() + 1;
        month = (month < 10) ? "0" + month : month;
        var date = d.getDate();
        date = (date < 10) ? "0" + date : date;
        var hour = d.getHours();
        hour = (hour < 10) ? "0" + hour : hour;
        var minute = d.getMinutes();
        minute = (minute < 10) ? "0" + minute : minute;
        var second = d.getSeconds();
        second = (second < 10) ? "0" + second : second;
        if (!format) {
            return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
        } else if (format == 'Y-M-D') {
            return year + "-" + month + "-" + date;
        } else if (format == 'Y-M') {
            return year + "-" + month;
        } else if (format == 'M-D') {
            return month + "-" + date;
        } else if (format == 'Y/M/D') {
            return year + "/" + month + "/" + date;
        } else if (format == 'M.D') {
            return month + "." + date;
        } else if (format == 'MmDd-hh:mm') {
            return month + "月" + date + "日" + " " + hour + ":" + minute;
        } else {
            return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
        }
    };

    //信息提示
    var showTip = function(word, formTip) {
        var dom = formTip || $('.form-tip');
        if (dom.css('display') == 'none') {
            dom.find('span').text(word);
            dom.show();
            setTimeout(function() {
                dom.hide();
            }, 1000)
        }
    };

    var bindscroll = function(params) {
        $(window).scroll(function() {
            if (document.body.scrollTop >= $(document).height() - $(window).height()) {
                params.callback && params.callback.call(params.scope, '');
            }
        });
    };

    var isWeiXin = function() {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true;
        } else {
            return false;
        }
    };

    //获取几天后的日期，如2015-07-23 13:59:00返回两天后的日期为
    //2015-07-25 13:59:00
    var getFurtherDate = function(initDate, n) {
        var dataArr = initDate.split(' '),
            date = dataArr[0],
            furtherDate = '';
        var dd = new Date(date);
        dd.setDate(dd.getDate() + n); //获取n天后的日期
        var y = dd.getFullYear(),
            m = dd.getMonth() + 1, //获取当前月份的日期
            d = dd.getDate();
        m = m < 10 ? ('0' + m) : m;
        d = d < 10 ? ('0' + d) : d;


        if (dataArr.length == 2) {
            furtherDate = y + "-" + m + "-" + d + " " + initDate.split(' ')[1];
        } else {
            furtherDate = y + "-" + m + "-" + d;
        }

        return furtherDate;
    };

    //判断程序所处的环境，包括移动端还是pc端
    var navUserAgent = function() {
        var browser = {
            versions: function() {
                var u = navigator.userAgent,
                    app = navigator.appVersion;
                return { //移动终端浏览器版本信息   
                    trident: u.indexOf('Trident') > -1, //IE内核  
                    presto: u.indexOf('Presto') > -1, //opera内核  
                    webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核  
                    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核  
                    mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端  
                    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端  
                    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器  
                    iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器  
                    iPad: u.indexOf('iPad') > -1, //是否iPad    
                    webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部  
                };
            }(),
            isPcOrMobile: function() {
                if ((browser.versions.mobile || browser.versions.ios || browser.versions.android ||
                        browser.versions.iPhone) && !browser.versions.iPad) { //此处排除了ipad，ipad暂做pc端适配  
                    return 'mobile';
                } else {
                    return 'pc';
                }
            },
            isTrueMobile: function() {
                if (browser.versions.mobile || browser.versions.ios || browser.versions.android ||
                    browser.versions.iPhone || browser.versions.iPad) {
                    return true;
                } else {
                    return false;
                }
            },
            isIosDevice: function() {
                if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
                    return true;
                } else {
                    return false;
                }
            },
            language: (navigator.browserLanguage || navigator.language).toLowerCase()
        }

        return browser;
    };

    var deligateEvent = function(selector, handler) {
        var that = this;
        if (that.navUserAgent().isTrueMobile()) {
            $(selector).tap(handler);
        } else {
            $(selector).click(handler);
        }
    };

    var mergeArray = function() {
        return Array.prototype.concat.apply([], arguments);
    };

    var searchToObject = function() {
        var searchKey = window.location.search,//获取url中search部分
            searchArr = [],//存储search通过'?'分割的数组
            args = '',//searchArr[1]部分
            argsArr = [],//存储args通过'&'分割的数组
            searchObj = {};//

        if(searchKey){
           searchArr = searchKey.split('?');
        }

        if (searchArr.length > 0) {
            args = searchArr[1];
            argsArr = args.split('&');
        }

        argsArr.forEach(function(item,index){
            var itemArr = item.split('=');
            searchObj[itemArr[0]] = itemArr[1]; 
        });

        return searchObj;
    };

    //webview js接口
    var connectWebViewJavascriptBridge = function (callback) {
        if (window.WebViewJavascriptBridge) {
            callback(WebViewJavascriptBridge);
        } else {
            document.addEventListener('WebViewJavascriptBridgeReady', function() {
                callback(WebViewJavascriptBridge);
            }, false);
        }
    };

    return {
        loadWx: loadWx,
        getTime: getTime,
        showTip: showTip,
        bindscroll: bindscroll,
        isWeiXin: isWeiXin,
        getFurtherDate: getFurtherDate,
        navUserAgent: navUserAgent,
        deligateEvent: deligateEvent,
        mergeArray: mergeArray,
        searchToObject: searchToObject 
    };
});
