/**
 * @method h5S02Position h5运营单题测试
 * @author xuanbin zhang
 * @time 2016-01-19
 */

define('h5S02Position',['./lib/common','./lib/service'],function(common,service){
    var id = "",
            //ip = returnCitySN["cip"].replace(/\./g,'-');
            ip='';
    var h5S02Position = {
        init: function(){
            var that = this;

            $('.exam-box p').height($('.exam-box span').height());

            $('#shareImg').attr('src','/static/images/h5/s02/banner.jpg');

            that.bindEvent();
        },

        //绑定事件
        bindEvent: function(){
            var that = this;
            //$(document).ready(function(){
            $('#answerList li').on('click', function(e){
                e.preventDefault();
                $('.error-tip').hide();

                id = $(this).attr('data-id');

                $(this).addClass('selected').siblings().removeClass('selected');
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
                url: "/html/emptyPage.html?origin=h5S02Position&option="+id+"&user="+ip,
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
                "list": [{"title":"你是老板眼中聪明的猴子",
                            "content": "这类型的人的工作表现都让老板觉得非常灵巧非常聪明，不仅在专业上非常认真，而且在待人处世以及人际关系上都做的非常好，在老板心中地位越来越重要。",
                            "score": "A",
                            "bg":"bg-s2-a"}]
            },
            arr2 = {
                "list": [{"title":"你是老板眼中的大猪头",
                            "content":"这类型的人心里要有准备，在老板心中不仅仅是猪头，甚至可能在很短的时间叫他滚蛋，因为老板心中虽然有期待，可是这类型的人永远都只能做到20分、10分。",
                            "score":"B",
                            "bg":"bg-s2-b"}]
            },
            arr3 = {
                "list": [{"title":"你是老板眼中的小猪头",
                            "content":"工作认真个性迷糊的你老板看到你又好气又好笑：这类型的人在工作上非常认真努力，本分之内都会做的非常好，可是在生活上个性上会比较迷糊散仙，在老板眼中看起来像是个永远长不大的大孩子。",
                            "score":"C",
                            "bg":"bg-s2-c"}]
            };

            if(id=='a'){
                that.renderData(arr1);
            }else if(id=='b'){
                that.renderData(arr2);
            }else if(id=='c'){
                that.renderData(arr3);
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

    return h5S02Position;
});