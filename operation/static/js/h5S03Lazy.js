/**
 * @method h5S03Lazy h5运营单题测试
 * @author xuanbin zhang
 * @time 2016-01-19
 */

define('h5S03Lazy',['./lib/common','./lib/service'],function(common,service){
    var id = "",
            //ip = returnCitySN["cip"].replace(/\./g,'-'),
            ip='',
            chance = "";
    var h5S03Lazy = {
        init: function(){
            var that = this;

            $('.exam-box p').height($('.exam-box span').height());

            $('#shareImg').attr('src','/static/images/h5/s03/banner.jpg');

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
                url: "/html/emptyPage.html?origin=h5S03Lazy&option="+id+"&user="+ip,
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
                            "content": "你上班偷懒被逮住的机率是20%，一定程度上，你算是高手，而且即使老板发现，因为你平时的表现，也不会为难你。",
                            "score": "A",
                            "bg":"bg-s3-a"}]
            },
            arr2 = {
                "list": [{"title":"",
                            "content":"你上班偷懒被逮住的机率是90%，你这功力，还是努力工作，然后洗洗睡吧，老板早就注意你很久了，不加班就算了，还要偷懒？",
                            "score":"B",
                            "bg":"bg-s3-b"}]
            },
            arr3 = {
                "list": [{"title":"",
                            "content":"你上班偷懒被逮住的机率是8%，你的偷懒功力无人能及，或许是你平时表现太过优异，所有人都对你太放心。",
                            "score":"C",
                            "bg":"bg-s3-c"}]
            },
            arr4 = {
                "list": [{"title":"",
                            "content":"你上班偷懒被逮住的机率是50%，这种概率，你想要偷懒可得斟酌好了，运气稍差，你可就要倒大霉。",
                            "score":"D",
                            "bg":"bg-s3-d"}]
            },
            arr5 = {
                "list": [{"title":"",
                            "content":"你上班偷懒被逮住的机率是80%，可能你是个子太大，也可能动作太招摇，总之，你很不幸，只要偷懒，八成被抓！",
                            "score":"E",
                            "bg":"bg-s3-e"}]
            };

            if(id=='a'){
                chance = '20%';
                that.renderData(arr1);
            }else if(id=='b'){
                chance = '90%';
                that.renderData(arr2);
            }else if(id=='c'){
                chance = '8%';
                that.renderData(arr3);
            }else if(id=='d'){
                chance = '50%';
                that.renderData(arr4);
            }else if(id=='e'){
                chance = '80%';
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
            $('title').text('我上班偷懒被逮住的几率是'+chance+'，你的呢？');
            
            that.bindClick();
        }

    };

    return h5S03Lazy;
});