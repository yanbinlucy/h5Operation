/*
 * @service.js 封装ajax请求
 * @author xuanbin zhang
 * @time 2015-10-30
 **/

define('lib/service',['./common'], function(common) {
    jQuery.noConflict();
    var sendData = {
        send: function(req) {
            this.ajax(req);
        },
        ajax: function(params) {
            var postData = params.data,
                data = new FormData();

            //触发事件源
            var id = '',target = '';
            var evt = window.event || arguments[0];//arguments兼容FF

            if(evt){
                target = evt.target;
                id = $(target).attr('id');
            }
            

            for(var key in postData) {
                data.append(key, postData[key]);
            }
            $.ajax({
                url: params.url,
                type: params.type || 'POST',
                data: data,
                async: params.async || true,
                cache: params.cache || false,
                contentType: false,
                processData: false,
                dataType: params.dataType || 'json',
                beforeSend: function(xhr, settings) {
                    if(id){
                        $(target).addClass('status-disabled');
                        $(target).attr('id','');
                    }
                    xhr.setRequestHeader("X-CSRFToken", $.fn.cookie('csrftoken'));
                },
                success: function(data) {       
                    if(id){
                        $(target).removeClass('status-disabled');
                        $(target).attr('id',id);
                    }


                    if(params.scope) {
                        params.callback && params.callback.call(params.scope, data);
                    } else {
                        params.callback && params.callback(data);
                    }
                },

                error: function(xhr, status, errorThrow) {
                    if(id){
                        $(target).removeClass('status-disabled');
                        $(target).attr('id',id);
                    }

                    var message = '';
                    try{
                       message = $.parseJSON(xhr.response);
                    }catch(ex){
                        message = '';
                    }
                    if(message){
                        var messages = message.detail;
                        var msg = '';
                        if(typeof messages == 'string'){
                            msg = messages;
                        }else{
                            for (var key in messages) {
                                if(messages[key] != '成功'){//过滤掉成功的信息
                                    //msg = messages[key][0];
                                    msg = messages[key];
                                }
                            }
                        }
                        common.showTip(msg, $('.form-tip'));
                    }else{
                        common.showTip('请求失败', $('.form-tip'));
                    }
                }

            });
        }
    };

    //发请求时不loading
    var sendFile = function(params) {
        $.ajax({
            url: params.url,
            type: params.type || 'Post',
            data: params.data.data,
            async: params.async || true,
            dataType: params.dataType || 'json',
            contentType: false,
            processData: false,
            beforeSend: function(xhr, settings) {
                xhr.setRequestHeader("X-CSRFToken", $.fn.cookie('csrftoken'));
                //如果是上传图片，则加载上传中等待动画
                if(params.data.target && params.data.target=='upload'){
                    var loadingStr = '<li id="loadingImg"><div>'+
                            '<img src="/static/images/common/loading-img.gif" /></div></li>';
                    if($('.last-li').length>0){
                        $(loadingStr).insertBefore('.last-li');
                    }
                }
            },
            success: function(data) {
                if(params.scope) {
                    params.callback && params.callback.call(params.scope, data);
                } else {
                    params.callback && params.callback(data);
                }
                var messages = data.detail;
                if(messages){
                    var msg = '';
                    if(typeof messages == 'string'){
                        msg = messages;
                    }else{
                        for (var key in messages) {
                            if(messages[key] != '成功'){//过滤掉成功的信息
                                msg = messages[key];
                            }
                        }
                    }
                    common.showTip(msg, $('.form-tip'));
                }

            },

            error: function(xhr, status, errorThrow) {

            }

        });
    };

    var uploadFile = function (params) {
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("load", params.callback, false);

        xhr.open("POST", params.url);
        xhr.setRequestHeader('Content-Type', 'multipart/form-data');
        xhr.send(params.data);
    };

    //发请求时不loading
    var normalAjax = function(params) {
        $.ajax({
            url: params.url,
            type: params.type || 'GET',
            data: params.data,
            async: params.async || true,
            dataType: 'json',
            contentType: params.contentType,
            success: function(data) {
                if(params.scope) {
                    params.callback && params.callback.call(params.scope, data);
                } else {
                    params.callback && params.callback(data);
                }
            },

            error: function(xhr, status, errorThrow) {
                //common.showTip('请求失败', $('.form-tip'));
                
            }

        });
    };

    var localAjax = function(params) {
        /*var random = Mock.Random;
        var para = random.paragraph(4),
                imgArr = [],
                imgSize = params.imgSize || '90x90',
                colorArr = ['#fb0a2a','#22ecd5','#e7ec22'],
                imgIndex = Math.floor(Math.random()*2);

        imgArr.push(random.image(imgSize, colorArr[imgIndex]));   

        //mock测试
        Mock.mock('/getData/',{
            'list|10': [{
                'id|+1': 1,
                'name': '@chineseName',
                'age|1-100': 100,
                'content': para,
                'img': imgArr
            }]
        });

        jQuery.ajax({
            url: '/getData/',
            dataType:'json'
        }).done(function(data, status, xhr){
            var dataTempList = data.list,
                    dataList = [];
            for(var i = 0, len = dataTempList.length; i < len; i++) {
                if(page == 1 && i <= 2){//第一次加载三条，以后每次加载一次
                    dataList.push(dataTempList[i]);
                }else{
                    tempData.push(dataTempList[i]);//前三条之后的存在全局变量中
                }
            }

            if(params.scope) {
                params.callback && params.callback.call(params.scope, data);
            } else {
                params.callback && params.callback(data);
            }
        });*/
    };

    return {
        sendData: sendData,
        uploadFile: uploadFile,
        sendFile: sendFile,
        normalAjax: normalAjax,
        localAjax: localAjax
    }
});