/**
 * @method h5S01Potential h5运营单题测试
 * @author xuanbin zhang
 * @time 2016-01-19
 */

define('h5S01Potential',['./lib/common','./lib/service'],function(common,service){
    var id = "",
            //ip = returnCitySN["cip"].replace(/\./g,'-');
            ip='';
    var h5S01Potential = {
        init: function(){
            var that = this;

            $('.exam-box p').height($('.exam-box span').height());

            $('#shareImg').attr('src','/static/images/h5/s01/banner.png');

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
                url: "/html/emptyPage.html?origin=h5S01Potential&option="+id+"&user="+ip,
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
                "list": [{"title":"当小BOSS",
                            "content": "显然，你当大老板的天赋技能是比较缺乏的，毕竟你也有懒惰的一面，并不想让自己的人生有呼风唤雨的本事.",
                            "score": "A",
                            "bg":"bg-s1-a"}]
            },
            arr2 = {
                "list": [{"title":"BOSS身边红人",
                            "content":"你就像是老板身边的红人，还是那种出谋划策的军师一般，这个技能和天赋你还是不缺的.只不过你也懒得去担一个大公司的命运，当红人就不错了.",
                            "score":"B",
                            "bg":"bg-s1-b"}]
            },
            arr3 = {
                "list": [{"title":"BOSS天赋很好",
                            "content":"你成为一位大老板，还是有希望的，因为你成为BOSS的天赋挺不错的.一来，你的主动技能比较强，二来你有这样的大局观，眼光看得比较长远.",
                            "score":"C",
                            "bg":"bg-s1-c"}]
            },
            arr4 = {
                "list": [{"title":"BOSS天赋没有",
                            "content":"基本上，你当BOSS的天赋是没有的.作为一名懒惰，不爱去思考的人，你也总是想过一种舒服的生活，不要太麻烦了，图个舒服就好.",
                            "score":"D",
                            "bg":"bg-s1-d"}]
            },
            arr5 = {
                "list": [{"title":"BOSS天赋很少",
                            "content":"你的独立性一般，出了什么事情，一般会咨询别人，即使是当了BOSS，你也喜欢在做出投资决策前询问别人的意见.",
                            "score":"E",
                            "bg":"bg-s1-e"}]
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

    return h5S01Potential;
});