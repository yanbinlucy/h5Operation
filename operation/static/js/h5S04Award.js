/**
 * @method h5S04Award h5运营单题测试
 * @author xuanbin zhang
 * @time 2016-01-23
 */

define('h5S04Award',['./lib/common','./lib/service'],function(common,service){
    var id = "",
            //ip = returnCitySN["cip"].replace(/\./g,'-'),
            ip='',
            chance = '';
    var h5S04Award = {
        init: function(){
            var that = this;

            $('.exam-box p').height($('.exam-box span').height());

            $('#shareImg').attr('src','/static/images/h5/s04/banner.jpg');

            that.bindEvent();
        },

        //绑定事件
        bindEvent: function(){
            var that = this;

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
        },

        statisticsData: function(id){
            var options = {
                url: "/html/emptyPage.html?origin=h5S04Award&option="+id+"&user="+ip,
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
                "list": [{"title":"",
                            "content": "升职加薪＋搭档共度一夜。",
                            "score": "A",
                            "bg":"bg-s4-a"}]
            },
            arr2 = {
                "list": [{"title":"",
                            "content":"股权激励＋上司临幸次数加倍。",
                            "score":"B",
                            "bg":"bg-s4-b"}]
            },
            arr3 = {
                "list": [{"title":"",
                            "content":"公司所有员工香吻各一枚。",
                            "score":"C",
                            "bg":"bg-s4-c"}]
            },
            arr4 = {
                "list": [{"title":"",
                            "content":"年底双薪＋玛莎拉蒂一辆。",
                            "score":"D",
                            "bg":"bg-s4-d"}]
            },
            arr5 = {
                "list": [{"title":"",
                            "content":"升职副总＋京城四合院一套。",
                            "score":"E",
                            "bg":"bg-s4-e"}]
            },
            arr6 = {
                "list": [{"title":"",
                            "content":"万元抚恤金＋金属边框棺材一口。",
                            "score":"F",
                            "bg":"bg-s4-f"}]
            };

            if(id=='a'){
                chance = '升职加薪＋搭档共度一夜';
                that.renderData(arr1);
            }else if(id=='b'){
                chance = '股权激励＋上司临幸次数加倍';
                that.renderData(arr2);
            }else if(id=='c'){
                chance = '公司所有员工香吻各一枚';
                that.renderData(arr3);
            }else if(id=='d'){
                chance = '年底双薪＋玛莎拉蒂一辆';
                that.renderData(arr4);
            }else if(id=='e'){
                chance = '升职副总＋京城四合院一套';
                that.renderData(arr5);
            }else if(id=='f'){
                chance = '万元抚恤金＋金属边框棺材一口';
                that.renderData(arr6);
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
            $('title').text('我的年终奖是：'+chance+'。你的呢？');
            
            that.bindClick();
        }

    };

    return h5S04Award;
});