/**
 * @method h5S06NewYearAward 新年拜年活动
 * @author xuanbin zhang
 * @time 2016-02-05
 */

define('h5S06NewYearAward',['./lib/common','./lib/service'],function(common,service){
    var count = $.fn.cookie('count') || 0;
    var h5S06NewYearAward = {
        init: function(){
            var that = this;

            var imgObj = new Image(),
                    $img = $(imgObj);
            $img.attr('src', '/static/images/h5/new_shake/300.png');
            $img.css({
                position: 'fixed',
                top: '0',
                left: '0',
                opacity: '0',
                width: '0',
                height: '0'
            });
            $('#imgBox').append($img);

            if (count >= 3) {
                var imgObj = new Image();
                imgObj.src = '/static/images/h5/new_shake/0.png';
                $('.award-box').addClass('zero-award');
                $('.award-input').hide();
                $('.no-award').show();
                $('.award-box').attr('data-id',0);
                $('.award-box').append(imgObj);
                $('.retry-btn').css('visibility','hidden');
            }else{
                that.showResult();

                that.bindEvent();
            }

            
        },

        showResult: function(){
            var awardArr = [0,2,8,18,28,58],
                    imgArr = ['/static/images/h5/new_shake/0.png',
                                        '/static/images/h5/new_shake/2.png',
                                        '/static/images/h5/new_shake/8.png',
                                        '/static/images/h5/new_shake/18.png',
                                        '/static/images/h5/new_shake/28.png',
                                        '/static/images/h5/new_shake/58.png'];

            var random1 = awardArr[Math.floor(Math.random()*1667)],
                    random2 = awardArr[Math.floor(Math.random()*167)],
                    random3 = awardArr[Math.floor(Math.random()*83)],
                    random4 = awardArr[Math.floor(Math.random()*100)],
                    random5 = awardArr[Math.floor(Math.random()*2)],
                    random6 = awardArr[Math.floor(Math.random()*10)];
            var randomArr = [random1,random2,random3,random4,random5,random6];
            var ranNum = Math.floor(Math.random()*6);

            var imgObj = new Image();
            
            if(randomArr[ranNum] == 2){
                imgObj.src = imgArr[1];
                $('.award-box').attr('data-id',awardArr[1]);
                $('.award-box').append(imgObj);
                $('.award-input').show();
                $('.award-btn').show();
            }else if(randomArr[ranNum] == 8){
                imgObj.src = imgArr[2];
                $('.award-box').attr('data-id',awardArr[2]);
                $('.award-box').append(imgObj);
                $('.award-input').show();
                $('.award-btn').show();
            }else if(randomArr[ranNum] == 18){
                imgObj.src = imgArr[3];
                $('.award-box').attr('data-id',awardArr[3]);
                $('.award-box').append(imgObj);
                $('.award-input').show();
                $('.award-btn').show();
            }else if(randomArr[ranNum] == 28){
                imgObj.src = imgArr[4];
                $('.award-box').attr('data-id',awardArr[4]);
                $('.award-box').append(imgObj);
                $('.award-input').show();
                $('.award-btn').show();
            }else if(randomArr[ranNum] == 58){
                imgObj.src = imgArr[5];
                $('.award-box').attr('data-id',awardArr[5]);
                $('.award-box').append(imgObj);
                $('.award-input').show();
                $('.award-btn').show();
            }else {
                imgObj.src = imgArr[0];
                $('.award-box').addClass('zero-award');
                $('.award-input').hide();
                $('.no-award').show();
                $('.retry-btn').show();
                $('.award-box').attr('data-id',awardArr[0]);
                $('.award-box').append(imgObj);
            }
            
        },

        //绑定事件
        bindEvent: function(){
            var that = this;
            /*$('.header-logo').on('click',function(e){
                e.preventDefault();
                $('.banner').addClass('shake-out');
                that.showShareContainer();
            });*/

            $('.award-btn').on('click',function(e){
                e.preventDefault();
                var flag = that.checkForm();
                if(flag){
                    that.submitForm();
                }
            });

            $('.retry-btn').on('click',function(e){
                e.preventDefault();
                
                if (count < 3) {
                    $.fn.cookie('count', Number(count)+1);
                    window.location.href = window.location.href;
                }else {
                    $('.retry-btn').css('visibility','hidden');
                }
            });

            $('.close-btn').on('click',function(e){
                e.preventDefault();
                that.closeShareContainer();
            });

            $('.select-btn').on('click',function(e){
                e.preventDefault();
                window.location.href = 'http://www.hike100.com/haidian/';
            });

        },

        checkForm: function(){
            var mobile = $.trim($('.award-input input').val());
            if(!mobile){
                common.showTip('请输入手机号领取');
                return false;
            }else if(!/^1\d{10}$/.test(mobile)) {
                common.showTip('手机号码格式不正确');
                return false;
            }
            return true;
        },

        submitForm: function(){
            var mobile = $.trim($('.award-input input').val()),
                    money = $('.award-box').attr('data-id'),
                    that = this;
            var options = {
                url: "/html/emptyPage.html?origin=h5S06NewYearAward&mobile="+mobile+"&money="+money,
                callback: function() {
                    that.showShareContainer();
                }
            };
            service.normalAjax(options);
        },

        showShareContainer: function() {
            var $height = Math.max($(window).height(), $(document).height());
            $("#mask").height($height).show();
            $("#selectClass").show();
            $('.close-btn').show();
        },

        closeShareContainer: function() {
            $("#mask").hide();
            $("#selectClass").hide();
            $('.close-btn').hide();
        },

    };

    return h5S06NewYearAward;
});