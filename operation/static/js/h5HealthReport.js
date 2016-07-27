/**
 * @method h5HealthReport h5运营体检报告
 * @author xuanbin zhang
 * @time 2016-03-21
 */

define('h5HealthReport',['./lib/common','./lib/service'],function(common,service){
    var result = '',
            shareUrl = window.location.href,
            checkName = '',
            randomNum,
            shareFlag = false,
            gDate = new Date(),
            gFullDate = gDate.getFullYear()+''+(gDate.getMonth()+1)+''+gDate.getDate();
    var h5HealthReport = {
        init: function(){
            var that = this;

            var urlObj = common.searchToObject();
            if(urlObj && urlObj.from){
                checkName = decodeURI(urlObj.name);
                randomNum = Number(urlObj.option);
                shareFlag = true;
                $('.header-bar').show();
                $('#sharePage').show();
                that.showResult();
            }else {
                if(urlObj && urlObj.name){
                    $('#loadingPage').hide();
                    $('.header-bar').show();
                    $('#secondPage').show();

                    checkName = decodeURI(urlObj.name);
                    randomNum = Number(urlObj.option);

                    that.showResult();
                    that.statisticsData();
                }else {
                    $('#firstPage').show();
                }
            }

            $('#shareImg').attr('src','/static/images/h5/report/banner.png');

            that.bindEvent();
        },

        //绑定事件
        bindEvent: function(){
            var that = this;
            $(document).ready(function(){
                $('#submit').on('click', function(e){
                    e.preventDefault();
                    
                    var name = $.trim($('#name').val());
                    checkName = name;
                    if(!name){
                        common.showTip('请输入你的姓名哦～');
                        return false;
                    }else {
                        $('#firstPage').hide();
                        $('#loadingPage').show();
                        randomNum = Math.floor((Math.random()*9)+1);
                        setTimeout(function(){
                            window.location.href = window.location.href+'?name='+checkName+'&option='+randomNum;
                            /*$('#loadingPage').hide();
                            $('.header-bar').show();
                            $('#secondPage').show();

                            that.showResult();*/

                            //that.statisticsData();
                        },2000);
                        
                    }
                });

                $('#share').on('click', function(e){
                    e.preventDefault();

                    that.showShareContainer();
                });

                $('.close-tip').on('click',function(e){
                    e.preventDefault();

                    that.closeShareContainer();
                });

                $('#exam').on('click',function(e){
                    e.preventDefault();

                    window.location.href = 'h5HealthReport.html';
                });

                //统计通过该测试进入下载页面的数量
                $('.hb-right a').on('click', function(e){
                    e.preventDefault();

                    window.location.href = "app.html?activity=operation&option=h5HealthReport&time="+gFullDate;
                });
 
            });
        },


        statisticsData: function(){
            var options = {
                url: "/html/emptyPage.html?origin=h5HealthReport&option="+randomNum+"&time="+gFullDate,
                callback: function() {
                    
                }
            };
            service.normalAjax(options);
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

            var arr1 = {
                "list": [{"name": "个人魅力", "score": "100"},
                            {"name": "人&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;缘", "score": "100"},
                            {"name": "口&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;才", "score": "100"},
                            {"name": "乐&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;观", "score": "100"},
                            {"name": "脑&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;洞", "score": "99"}]
            }, 
            arr2 = {
                "list": [{"name": "个人魅力", "score": "100"},
                            {"name": "人&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;缘", "score": "100"},
                            {"name": "口&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;才", "score": "84"},
                            {"name": "乐&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;观", "score": "100"},
                            {"name": "脑&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;洞", "score": "56"}]
            },
            arr3 = {
                "list": [{"name": "决断力", "score": "100"},
                            {"name": "竞争力", "score": "100"},
                            {"name": "纪律性", "score": "100"},
                            {"name": "细节控", "score": "95"},
                            {"name": "逻辑分析力", "score": "80"}]
            },
            arr4 = {
                "list": [{"name": "决断力", "score": "90"},
                            {"name": "竞争力", "score": "86"},
                            {"name": "纪律性", "score": "94"},
                            {"name": "细节控", "score": "85"},
                            {"name": "逻辑分析力", "score": "97"}]
            },
            arr5 = {
                "list": [{"name": "决断力", "score": "98"},
                            {"name": "竞争力", "score": "43"},
                            {"name": "纪律性", "score": "72"},
                            {"name": "细节控", "score": "89"},
                            {"name": "逻辑分析力", "score": "99"}]    
            },
            arr6 = {
                "list": [{"name": "决断力", "score": "95"},
                            {"name": "竞争力", "score": "89"},
                            {"name": "纪律性", "score": "92"},
                            {"name": "细节控", "score": "0"},
                            {"name": "逻辑分析力", "score": "99"}]     
            },
            arr7 = {
                "list": [{"name": "苦逼指数", "score": "100"},
                            {"name": "职场IQ", "score": "100"},
                            {"name": "老板赏识程度", "score": "100"},
                            {"name": "潜力", "score": "100"},
                            {"name": "办公室恋情指数", "score": "0"}]     
            },
            arr8 = {
                "list": [{"name": "苦逼指数", "score": "65"},
                            {"name": "职场IQ", "score": "98"},
                            {"name": "老板赏识程度", "score": "96"},
                            {"name": "潜力", "score": "90"},
                            {"name": "办公室恋情指数", "score": "99"}]     
            },
            arr9 = {
                "list": [{"name": "苦逼指数", "score": "100"},
                            {"name": "职场IQ", "score": "100"},
                            {"name": "老板赏识程度", "score": "100"},
                            {"name": "潜力", "score": "0"},
                            {"name": "办公室恋情指数", "score": "100"}]     
            };

            if(!shareFlag){
                var localName = window.localStorage.getItem("name"),
                    localScore = window.localStorage.getItem("randomNum");

                if(localName==checkName){
                    randomNum = Number(localScore);
                }
            }
            
            switch(randomNum) {
                case 1:
                        result = "此患者在各方面都得到了极高的分数，在职场中人缘极佳，能言善辩，在职场中如鱼得水。";    
                        that.renderData(arr1);
                        break;
                case 2:
                        result = "此患者乐观豁达、待人温和，让人有如沐春风之感，应努力维持。";
                        that.renderData(arr2);
                        break;
                case 3:
                        result = "此患者行事风格果断，思维严谨，是领导层的不二人选。";
                        that.renderData(arr3);
                        break;
                case 4:
                        result = "此患者完美无比，能和你一起共事的人都是上辈子修来的福气，且行且珍惜。";       
                        that.renderData(arr4);
                        break;
                case 5:
                        result = "虽然你有想法有能力，但本人性情温和无欲无求，君子无所争是也。";
                        that.renderData(arr5);
                        break;
                case 6:
                        result = "你是个马大哈吗？你的分析能力异于常人且遇事果断，潜力无限大。";
                        that.renderData(arr6);
                        break;
                case 7:
                        result = "此患者每天第一个到公司最后一个走，颇受老板赏识，升职加薪潜力巨大，但辛苦工作之余也要多向宋仲基欧巴学习撩妹技能啊。";
                        that.renderData(arr7);
                        break;
                case 8:
                        result = "此患者属撩妹高手，但要记住一句话：强行撩妹最为致命！";
                        that.renderData(arr8);
                        break;
                case 9:
                        result = "此患者已升职加薪赢娶白富美，妥妥的人生赢家，毫无潜力可言。";
                        that.renderData(arr9);
                        break;
            }  

            that.addToLocal();
        },

        addToLocal: function(){
            var name = $.trim($('#name').val());

            window.localStorage.setItem("name",checkName);
            window.localStorage.setItem("randomNum",randomNum);
        },

        renderData: function(data){
            var dataList = data.list,
                    that = this;
            var tpl = _.template($("#resultTpl").html());
            var html = tpl({
                "dataArr": dataList
            });


            var dd = new Date();
            var date = dd.getFullYear()+'年'+(dd.getMonth()+1)+'月'+dd.getDate()+'日';

            if(shareFlag){
                //$('#time1').text(date);

                $('#shareName1').text(checkName);
                $("#spTable1").empty();
                $("#spTable1").append(html);

                $('#spResult1').text(result);
            }else {
                $('#time').text(date);

                $("#spTable").empty();
                $("#spTable").append(html);

                $('#spResult').text(result);
            }
            

            setTimeout(function(){
                //$('.sp-stamp img').show();
                $('.sp-stamp img').addClass('smaller');
            },100);

            //修改title，分享出去的文案
            var name = $.trim($('#name').val());
            $('title').text('【'+checkName+'的体检报告】－'+result);

        }

    };

    return h5HealthReport;
});