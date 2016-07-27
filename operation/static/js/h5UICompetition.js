/**
 * @method h5UICompetition 设计师优秀作品大赛
 * @author xuanbin zhang
 * @time 2016-04-19
 */

define('h5UICompetition',['./lib/common','./lib/service'],function(common,service){
    var ch = '',
            iosFlag = false,//ios app
            androidFlag = false,//android app
            appType = 'web',//活动在哪里打开android/ios/web 默认为web
            topicId = '45',
            topicTitle = '优秀设计作品大赛',
            gDate = new Date(),
            gFullDate = gDate.getFullYear()+''+(gDate.getMonth()+1)+''+gDate.getDate();

    var h5UICompetition = {
        init: function(){
            var _this = this;

            var chObj = common.searchToObject();
            ch = chObj.ch;

            //判断是否在android app中
            if(window.CaffeedActivity){
                appType = 'android';
                androidFlag = true;
            }

            //检测是否在ios app中
            _this.setupWebViewJavascriptBridge(function(bridge) {
                bridge.callHandler("checkApp", function(response) {
                    if(response){
                        appType = 'ios';
                        iosFlag = true;
                    }
                })
            });

            _this.bindEvent();
        },

        bindEvent: function(){
            var _this = this;
            $('#btn img').on('click', function(event){
                event.preventDefault();
                if(androidFlag){
                    _this.statisticsData();
                    CaffeedActivity.toTopic(topicId);
                }else if(iosFlag){
                    var data = {
                        "topic_id": topicId,
                        "title": topicTitle
                    };

                    _this.statisticsData();

                    _this.setupWebViewJavascriptBridge(function(bridge) {
                        bridge.callHandler("enterActivity", data, function(response) {
                            
                        })
                    });
                }else {
                    window.location.href = 'activity.html?ch='+ch+'&activity=uiCompetition&app_type='+appType+'&time='+gFullDate;
                }
            });
        },

        statisticsData: function(){
            var options = {
                url: '/html/activity.html?ch='+ch+'&activity=uiCompetition&app_type='+appType+'&time='+gFullDate,
                callback: function() {
                    
                }
            };
            service.normalAjax(options);
        },

        setupWebViewJavascriptBridge: function(callback) {
            if (window.WebViewJavascriptBridge) { 
                return callback(WebViewJavascriptBridge); 
            }
            if (window.WVJBCallbacks) { 
                return window.WVJBCallbacks.push(callback); 
            }
            window.WVJBCallbacks = [callback];
            var WVJBIframe = document.createElement('iframe');
            WVJBIframe.style.display = 'none';
            WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
            document.documentElement.appendChild(WVJBIframe);
            setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
        }

    };

    return h5UICompetition;
});