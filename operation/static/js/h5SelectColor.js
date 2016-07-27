/**
 * @method h5SelectColor h5运营多题测试
 * @author xuanbin zhang
 * @time 2016-03-10
 */

define('h5SelectColor',['./lib/common','./lib/service'],function(common,service){
    var my_score = 0,
            my_desc = '',
            sumScore = 0,
            current_step = 1,
            sortArr = [1,2,3,4,5],
            sort_step = 0,
            awardArr = [1,3,0,1,2],
            flag = true,
            mouseX,mouseY;
    var h5SelectColor = {
        init: function(){
            var that = this;

            $('#shareImg').attr('src','/static/images/h5/m02/banner.png');

            sortArr.sort(function(){ return 0.5 - Math.random() });

            $('#shbBg').attr('src','/static/images/h5/m02/'+that.copyChar(sortArr[0],2)+'.png');
            $('#shbCover').attr('src','/static/images/h5/m02/'+that.copyChar(sortArr[0],3)+'.png');
            $('.step-item').addClass('si-0'+sortArr[0]);
            $('.step-item span').eq(awardArr[sortArr[0]-1]).attr('data-id','1').siblings().attr('data-id','0');

            sort_step++;

            /*if(common.navUserAgent().isTrueMobile()){//移动设备
                //以下注释是为横屏处理的代码增加样式，然后以@media适配横评
                $('#mask').addClass('flexcontainer');
            }*/

            that.bindEvent();
        },

        //绑定事件
        bindEvent: function(){
            var that = this;
            $(document).ready(function(){
                $('#fpBtn').on('click', function(e){
                    e.preventDefault();
                    $('.pre-move').addClass('animate');
                    $('.header-bar').hide();
                    setTimeout(function(){
                        $('#firstPage').hide();
                        $('#secondPage').show();
                    },1500);
                });

                $('.step-item span').on('click',function(e){
                    e.preventDefault();

                    if(!flag) return;

                    flag = false;
                    current_step += 1;

                    //点击处生成一个小正圆，由小扩大至全屏
                    var bg_color = $(this).css('background');
                    $(this).css('z-index','9').siblings().css('z-index','1');
                    $(this).append('<i class="scaled animate" style="background: '+bg_color+';border: 1px solid #'+bg_color+';"></i>');

                    //计算总分
                    var score = Number($(this).attr('data-id'));
                    sumScore += score;

                    setTimeout(function(){
                        if(current_step<6){
                            next_step = current_step + 1;

                            $('.step-item span').empty();

                            $('#shbBg').attr('src','/static/images/h5/m02/'+that.copyChar(sortArr[sort_step],2)+'.png');
                            $('#shbCover').attr('src','/static/images/h5/m02/'+that.copyChar(sortArr[sort_step],3)+'.png');
                            $('.step-item').addClass('si-0'+sortArr[sort_step]).removeClass('si-0'+sortArr[sort_step-1]);
                            $('.step-item span').eq(awardArr[sortArr[sort_step]-1]).attr('data-id','1').siblings().attr('data-id','0');

                            sort_step++;
                            flag = true;
                        }else {
                            that.showResult();
                            $('#secondPage').hide();
                            $('#thirdPage').show();
                            $('.header-bar').show();
                            that.statisticsData();
                        }
                    },1000);
                    
                });
 
            });
        },

        copyChar: function(char,num){
            var charNum = new Array(num+1).join(''+char+'');
            return charNum;
        },

        statisticsData: function(){
            var options = {
                url: "/html/emptyPage.html?origin=h5SelectColor&option="+sumScore+"&time="+new Date().getDate(),
                callback: function() {
                    
                }
            };
            service.normalAjax(options);
        },

        bindClick: function(){
            var that = this;

            $('.rb-share').on('click',function(e){
                e.preventDefault();

                $('#resultContainer').hide();
                $('.header-bar').hide();
                that.showShareContainer();
            });

            $('.rb-retry').on('click',function(e){
                e.preventDefault();

                window.location.href = 'h5SelectColor.html';
            });

            $('.close-tip').on('click',function(e){
                e.preventDefault();
                
                $('#resultContainer').show();
                $('.header-bar').show();
                that.closeShareContainer();
            });
        },

        showShareContainer: function() {
            var $height = Math.max($(window).height(), $(document).height());
            $("#shareContainer").show();
        },

        closeShareContainer: function() {
            $("#shareContainer").hide();
        },

        showResult: function(){
            var that = this;

            var random1 = Math.floor(Math.random()*(95-80+1)+80),
                    random2 = Math.floor(Math.random()*(75-60+1)+60),
                    random3 = Math.floor(Math.random()*(55-40+1)+40),
                    random4 = Math.floor(Math.random()*(40-30+1)+30),
                    random5 = Math.floor(Math.random()*(30-20+1)+20);

            var arr1 = {
                "list": [{"score": 100,
                            "result": "你的色彩分辨能力秒杀众生，你就是那个万中无一奇特不凡与众不同的色彩分辨大师！"}]
            }, 
            arr2 = {
                "list": [{"score": random1,
                            "result": "你的色彩分辨能力超过了80%的测试者，明察秋毫洞若观火的你不做和颜色有关的职业简直是浪费人才。"}]
            },
            arr3 = {
                "list": [{"score": random2,
                            "result": "你的色彩分辨能力超过了60%的测试者，初步诊断为色彩界近视眼。"}]
            },
            arr4 = {
                "list": [{"score": random3,
                            "result": "你的色彩分辨能力超过了40%的测试者，初步诊断为色彩界老花眼。"}]
            },
            arr5 = {
                "list": [{"score": random4,
                            "result": "你的色彩分辨能力超过了20%的测试者，初步诊断为色弱患者。"}]
            },
            arr6 = {
                "list": [{"score": random5,
                            "result": "完美错过所有正确答案，初步诊断为资深色盲。"}]
            };

            switch(sumScore) {
                case 5:
                        my_score = 100;
                        my_desc = '我的色彩分辨能力秒杀众生！';
                        that.renderData(arr1);
                        break;
                case 4:
                        my_score = random1;
                        my_desc = '战胜了80%的测试者，近乎完美了。';
                        that.renderData(arr2);
                        break;
                case 3:
                        my_score = random2;
                        my_desc = '战胜了60%的测试者，堪称专业了。';
                        that.renderData(arr3);
                        break;
                case 2:
                        my_score = random3;
                        my_desc = '战胜了40%的测试者，还不错哟~';
                        that.renderData(arr4);
                        break;
                case 1:
                        my_score = random4;
                        my_desc = '战胜了20%的测试者，还不错哟~';
                        that.renderData(arr5);
                        break;
                case 0:
                        my_score = random5;
                        my_desc = '初步诊断为色盲患者！';
                        that.renderData(arr6);
                        break;
            }  

            /*if(sumScore==5){
                my_score = 100;
                my_desc = '我的色彩分辨能力秒杀众生！';

                that.renderData(arr1);
            }else if(sumScore==4){
                my_score = random1;
                my_desc = '战胜了80%的测试者，近乎完美了。';

                that.renderData(arr2);
            }else if(sumScore==3){
                my_score = random2;
                my_desc = '战胜了60%的测试者，堪称专业了。';

                that.renderData(arr3);
            }else if(sumScore==2){
                my_score = random3;
                my_desc = '战胜了40%的测试者，还不错哟~';

                that.renderData(arr4);
            }else if(sumScore==1){
                my_score = random4;
                my_desc = '战胜了20%的测试者，还不错哟~';

                that.renderData(arr5);
            }else if(sumScore==0){
                my_score = random5;
                my_desc = '初步诊断为色盲患者！';

                that.renderData(arr6);
            }*/

        },

        renderData: function(data){
            var dataList = data.list[0],
                    that = this;
            var tpl = _.template($("#resultTpl").html());
            var html = tpl({
                "data": dataList
            });

            $('#resultContainer').show();

            $("#resultContainer").empty();
            $("#resultContainer").append(html);

            //修改title，分享出去的文案
            $('title').text('【史上最虐心色盲测试】我得分'+my_score+'分，'+my_desc);
            
            that.bindClick();
        }

    };

    return h5SelectColor;
});