/**
 * @method h5MultipleExam h5运营多题测试
 * @author xuanbin zhang
 * @time 2016-01-19
 */

define('h5MultipleExam',['./lib/common','./lib/service'],function(common,service){

    var h5MultipleExam = {
        init: function(){
            var that = this;

            $('.exam-box').each(function(index,obj){
                $(this).find('p').height($(this).find('span').height());
            });
            
            $('#shareImg').attr('src','/static/images/h5/banner.png');

            that.bindEvent();
        },

        //绑定事件
        bindEvent: function(){
            var that = this;
            $(document).ready(function(){
                $('.exam-box ul li').on('click', function(e){
                    e.preventDefault();
                    $(this).addClass('selected').siblings().removeClass('selected');
                    var resultLen = $('.exam-box ul li.selected').length;
                    if(resultLen == 9){
                        $('.error-tip').hide();
                    }

                });

                $('.result-btn a').on('click', function(e){
                    e.preventDefault();
                    var resultLen = $('.exam-box ul li.selected').length;
                    if(resultLen == 9) {
                        $('.error-tip').hide();
                        that.showResult();
                    }else {
                        $('.error-tip').show();
                    }
                });
            });
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

        showResult: function(){
            var that = this;

            var sumScore = 0;
            $('.exam-box ul li.selected').each(function(index,obj){
                var score = $(obj).attr('data-id');
                sumScore += Number(score);
            });
            var arr1 = {
                "list": [{"result": "你需要随时准备换工作，只要遇到合适的就赶紧走。"}]
            },
            arr2 = {
                "list": [{"result": "对工作有一定的满意度，除非天大的好机会，否则不妨坚持一下。"}]
            },
            arr3 = {
                "list": [{"result": "你对自己的职业具有高度满足感，对你而言，年关更多的是享受一年劳作的成果。"}]
            };

            if(sumScore>=9 && sumScore<=18){
                that.renderData(arr1);
            }else if(sumScore>=19 && sumScore<=25){
                that.renderData(arr2);
            }else if(sumScore>=26 && sumScore<=33){
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
            $('title').text('超级准 | 测测你明年的跳槽概率');
            
            that.bindClick();
        }

    };

    return h5MultipleExam;
});