/**
 * @method h5NewYear03 新年运营测试题3
 * @author xuanbin zhang
 * @time 2016-02-04
 */

define('h5NewYear03',['./lib/common','./lib/service'],function(common,service){
    var id = "",
            //ip = returnCitySN["cip"].replace(/\./g,'-');
            ip='';
    var h5NewYear03 = {
        init: function(){
            var that = this;

            $('.exam-box p').height($('.exam-box span').height());

            $('#shareImg').attr('src','/static/images/h5/new03/banner.jpg');

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
                url: "/html/emptyPage.html?origin=h5NewYear03&option="+id+"&user="+ip,
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
                "list": [{"title":"面对升职的机会，往往没有及时把握",
                            "content": "大多数人徘徊在普通职员阶段.",
                            "score": "A",
                            "bg":"bg-new3-a"}]
            },
            arr2 = {
                "list": [{"title":"面对升职的机会，权衡利弊后往往能抓住机会，但缺少大将风度，升职空间有限",
                            "content":"通常徘徊在科长、部门经理阶段.",
                            "score":"B",
                            "bg":"bg-new3-b"}]
            },
            arr3 = {
                "list": [{"title":"升职欲望较大，一有机会，决不放过",
                            "content":"通常在副总阶段找寻出路.",
                            "score":"C",
                            "bg":"bg-new3-c"}]
            },
            arr4 = {
                "list": [{"title":"认真对待每一件事情，是个好员工，但缺乏组织领导能力",
                            "content":"通常是个副手的角色，或是研发人员.",
                            "score":"D",
                            "bg":"bg-new3-d"}]
            },
            arr5 = {
                "list": [{"title":"目标明确，会充分利用自己的和周边环境的优势",
                            "content":"面对升职的机会能牢牢抓住，潜力大，大多会升迁.",
                            "score":"E",
                            "bg":"bg-new3-e"}]
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

    return h5NewYear03;
});