/**
 * @method h5NewYear01 新年运营测试题1
 * @author xuanbin zhang
 * @time 2016-02-04
 */

define('h5NewYear01',['./lib/common','./lib/service'],function(common,service){
    var id = "",
            //ip = returnCitySN["cip"].replace(/\./g,'-');
            ip='';
    var h5NewYear01 = {
        init: function(){
            var that = this;

            $('.exam-box p').height($('.exam-box span').height());

            $('#shareImg').attr('src','/static/images/h5/new01/banner.jpg');

            that.bindEvent();
        },

        //绑定事件
        bindEvent: function(){
            var that = this;
            //$(document).ready(function(){
            $('#answerList li').on('click', function(e){
                e.preventDefault();
                $('.error-tip').hide();

                $(this).addClass('selected').siblings().removeClass('selected');

                id = $(this).attr('data-id');
            });

            $('.result-btn a').on('click', function(e){
                e.preventDefault();
                var answerLen = $('#answerList li.selected').length;
                if(answerLen==0){
                    $('.error-tip').show();
                }else {
                    $('.error-tip').hide();
                    var selectedNum = $('#answerList li.selected').attr('data-id');
                    that.showResult(selectedNum);
                    
                    that.statisticsData(id);
                }

            });

            //});
        },

       statisticsData: function(id){
            var options = {
                url: "/html/emptyPage.html?origin=h5NewYear01&option="+id+"&user="+ip,
                callback: function() {
                    
                }
            };
            service.normalAjax(options);
        },

        bindClick: function(){
            var that = this;
            $('.close-btn').on('click', function(e){
                $('#mask').hide();
                $('#resultWrapper').hide();
            });

            $('.share-btn').on('click',function(e){
                e.preventDefault();
                $('#resultWrapper').hide();
                that.showShareContainer();
            });

            $('.close-tip').on('click',function(e){
                //$('#resultWrapper').show();
                
                that.closeShareContainer();
                /*var $height = Math.max($(window).height(), $(document).height());
                $("#mask").height($height).show();*/
            });
        },

        showShareContainer: function() {
            var $height = Math.max($(window).height(), $(document).height());
            $("#mask").height($height).show();
            $("#shareContainer").show();
        },

        closeShareContainer: function() {
            $("#mask").hide();
            $("#shareContainer").hide();
        },

        showResult: function(id){
            var that = this;

            var arr1 = {
                "list": [{"title":"朋友",
                            "content": "你是一个讲义气的人，朋友有事你能帮一定会帮.",
                            "score": "A",
                            "bg":"bg-new1-a"}]
            },
            arr2 = {
                "list": [{"title":"家人",
                            "content":"你是个孝顺的人，如果家里有事情，会毫不犹豫地帮助.",
                            "score":"B",
                            "bg":"bg-new1-b"}]
            },
            arr3 = {
                "list": [{"title":"亲戚",
                            "content":"你要防止的人，是你的七大姑八大姨和七舅姥爷们.",
                            "score":"C",
                            "bg":"bg-new1-c"}]
            },
            arr4 = {
                "list": [{"title":"同事",
                            "content":"工作中你的效率不错，但难免会遇到猪队友，让你的职涯没办法潇洒.",
                            "score":"D",
                            "bg":"bg-new1-d"}]
            },
            arr5 = {
                "list": [{"title":"爱人",
                            "content":"感情始终是是你的软肋，一旦陷入一段感情，你甚至会牺牲自己的自由与工作.",
                            "score":"E",
                            "bg":"bg-new1-e"}]
            };

            if(id=='a'){
                that.renderData(arr1);
            }else if(id=='b'){
                that.renderData(arr2);
            }else if(id=='c'){
                that.renderData(arr3);
            }else if(id=='d'){
                that.renderData(arr4);
            }else if(id=='e'){
                that.renderData(arr5);
            }
        },

        renderData: function(data){
            var dataList = data.list[0],
                    that = this;
            var tpl = _.template($("#resultTpl").html());
            var html = tpl({
                "data": dataList
            });

            var $height = Math.max($(window).height(), $(document).height());
            $("#mask").height($height).show();
            $('#resultWrapper').show();

            $("#resultWrapper").empty();
            $("#resultWrapper").append(html);

            //修改title，分享出去的文案
            //var title = $('.rb-title').text();
            //$('title').text('我测试的结果是：'+title+'，你也快来测试一下吧！');
            
            that.bindClick();
        }

    };

    return h5NewYear01;
});