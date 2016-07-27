/**
 * @method h5NewYear02 新年运营测试题2
 * @author xuanbin zhang
 * @time 2016-02-04
 */

define('h5NewYear02',['./lib/common','./lib/service'],function(common,service){
    var id = "",
            //ip = returnCitySN["cip"].replace(/\./g,'-');
            ip='';
    var h5NewYear02 = {
        init: function(){
            var that = this;

            $('.exam-box p').height($('.exam-box span').height());

            $('#shareImg').attr('src','/static/images/h5/new02/banner.jpg');

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
                url: "/html/emptyPage.html?origin=h5NewYear02&option="+id+"&user="+ip,
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
                "list": [{"title":"学会如何与他人相处",
                            "content": "职场中，不仅要会做事，更要会做人.",
                            "score": "A",
                            "bg":"bg-new2-a"}]
            },
            arr2 = {
                "list": [{"title":"不断学习新技术",
                            "content":"你必须改变自己的思维，不断学习接受新知识.",
                            "score":"B",
                            "bg":"bg-new2-b"}]
            },
            arr3 = {
                "list": [{"title":"学会调节自己的心态",
                            "content":"心态平和，不急不躁，才能在职场站稳脚跟.",
                            "score":"C",
                            "bg":"bg-new2-c"}]
            },
            arr4 = {
                "list": [{"title":"学会坦然面对裁员风波",
                            "content":"多学几手，一专多能，哪怕被炒鱿鱼，也能心中不慌.",
                            "score":"D",
                            "bg":"bg-new2-d"}]
            };

            if(id=='a'){
                that.renderData(arr1);
            }else if(id=='b'){
                that.renderData(arr2);
            }else if(id=='c'){
                that.renderData(arr3);
            }else if(id=='d'){
                that.renderData(arr4);
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

    return h5NewYear02;
});