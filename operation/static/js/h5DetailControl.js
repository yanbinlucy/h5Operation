/**
 * @method h5DetailControl h5运营多题测试
 * @author xuanbin zhang
 * @time 2016-02-28
 */

define('h5DetailControl',['./lib/common','./lib/service'],function(common,service){
    var my_score = 0,
            my_percent = 0,
            my_desc = '',
            sum_score = 0;
    var h5DetailControl = {
        init: function(){
            var that = this;

            $('.exam-box').each(function(index,obj){
                $(this).find('p').height($(this).find('span').height());
            });
            
            //$('#shareImg').attr('src','/static/images/h5/m01/banner.jpg');

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
                    if(resultLen == 6){
                        $('.error-tip').hide();
                    }
                });

                $('.result-btn a').on('click', function(e){
                    e.preventDefault();
                    var resultLen = $('.exam-box ul li.selected').length;
                    if(resultLen == 6) {
                        $('.error-tip').hide();
                        that.showResult();

                        that.statisticsData();
                    }else {
                        $('.error-tip').show();
                    }
                });

            });
        },

        statisticsData: function(){
            var options = {
                url: "/html/emptyPage.html?origin=h5DetailControl&option="+sum_score,
                callback: function() {
                    
                }
            };
            service.normalAjax(options);
        },

        bindClick: function(){
            var that = this;

            $('.close-btn').on('click', function(e){
                e.preventDefault();

                $('#mask').hide();
                $('#resultWrapper').hide();
            });

            $('.share-btn').on('click',function(e){
                e.preventDefault();

                $('#resultWrapper').hide();
                that.showShareContainer();
            });

            $('.close-tip').on('click',function(e){
                e.preventDefault();
                
                that.closeShareContainer();
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
            sum_score = sumScore;

            var random1 = Math.floor(Math.random()*(95-85+1)+85),
                    random2 = Math.floor(Math.random()*(80-65+1)+65),
                    random3 = Math.floor(Math.random()*(65-50+1)+50),
                    random4 = Math.floor(Math.random()*(50-40+1)+40),
                    random5 = Math.floor(Math.random()*(40-30+1)+30),
                    random6 = Math.floor(Math.random()*(30-25+1)+25);

            var arr1 = {
                "list": [{"score": 100,
                            "result": "细节把控小能手，除了你，还有sei！完美胜任Apple设计师！"}]
            }, 
            arr2 = {
                "list": [{"score": random1,
                            "result": "你的细节把控力超过了85%的测试者，是个潜力股，可以自己开个设计工作室啦！"}]
            },
            arr3 = {
                "list": [{"score": random2,
                            "result": "你的细节把控力超过了65%的测试者，努努力也是可以称霸铁岭设计圈的~"}]
            },
            arr4 = {
                "list": [{"score": random3,
                            "result": "你的细节把控力超过了50%的测试者，玩《秘密花园》绰绰有余。"}]
            },
            arr5 = {
                "list": [{"score": random4,
                            "result": "你的细节把控力超过了45%的测试者，买本简笔画来练练手吧~"}]
            },
            arr6 = {
                "list": [{"score": random5,
                            "result": "你的细节把控力超过了30%的测试者，这水平，也就能混混3~5岁的设计圈了···"}]
            },
            arr7 = {
                "list": [{"score": random6,
                            "result": "完美错过所有正确答案，记吃药，勿弃疗！"}]
            };

            if(sumScore==6){
                my_score = 100;
                my_desc = '细节把控力近乎完美！';

                that.renderData(arr1);
            }else if(sumScore==5){
                my_score = random1;
                my_desc = '战胜了85%的测试者，近乎完美了。';

                that.renderData(arr2);
            }else if(sumScore==4){
                my_score = random2;
                my_desc = '战胜了65%的测试者，堪称专业了。';

                that.renderData(arr3);
            }else if(sumScore==3){
                my_score = random3;
                my_desc = '战胜了50%的测试者，还不错哟~';

                that.renderData(arr4);
            }else if(sumScore==2){
                my_score = random4;
                my_percent = '45%';
                my_desc = '战胜了45%的测试者，还不错哟~';

                that.renderData(arr5);
            }else if(sumScore==1){
                my_score = random5;
                my_percent = '30%';
                my_desc = '战胜了30%的测试者，还不错哟~';

                that.renderData(arr6);
            }else if(sumScore==0){
                my_score = random6;
                my_desc = '是个潜力股。';

                that.renderData(arr7);
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
            $('title').text('【看看你是不是细节控】我得分'+my_score+'分，'+my_desc);
            
            that.bindClick();
        }

    };

    return h5DetailControl;
});