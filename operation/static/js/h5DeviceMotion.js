/**
 * @method h5DeviceMotion h5摇一摇测试
 * @author xuanbin zhang
 * @time 2016-01-22
 */

define('h5DeviceMotion',['./lib/common','./lib/service'],function(common,service){
    var SHAKE_THRESHOLD = 1500,//3000
            last_update = 0,
            x,y,z,last_x,last_y,last_z,
            played = false,
            ip = '',
            media = document.getElementById('musicBox');
    var h5DeviceMotion = {
        init: function(){
            var that = this;
            
            if (window.DeviceMotionEvent) {
                window.addEventListener('devicemotion', that.deviceMotionHandler, false);
            } else {
                alert('哥们儿，该换手机了吧？');
            }

            var imgObj = new Image(),
                    $img = $(imgObj);
            $img.attr('src', '/static/images/h5/wx_shake/share-bg.png');
            $img.css({
                position: 'fixed',
                top: '0',
                left: '0',
                opacity: '0',
                width: '0',
                height: '0'
            });
            $('#imgBox').append($img);

            media.load();

            that.bindEvent();

        },

        bindEvent: function(){
            var that = this;
            $('.hb-right a').on('click',function(e){
                e.preventDefault();
                if(!played){
                    that.showResult();
                }
            });

            $('.retry-icon').on('click',function(e){
                played = false;
                $('.shake-header').addClass('shake-close').removeClass('shake-open');
               
                $('.shake-footer').show();
                $('.sf-wrapper').addClass('shake-close').removeClass('shake-open');
                $('.sf-more-bg').addClass('shake-close').removeClass('shake-open');
            });

            $('.arrow-icon').on('click',function(e){
                that.showShareContainer();
            });

            $('.close-tip').on('click',function(e){
                that.closeShareContainer();
            });
        },

        deviceMotionHandler: function(eventData){
            var acceleration = eventData.accelerationIncludingGravity;
            var curTime = new Date().getTime();
            var that = this;

            if ((curTime - last_update) > 100) {
                var diffTime = curTime - last_update;
                last_update = curTime;
                x = acceleration.x;
                y = acceleration.y;
                z = acceleration.z;
                var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;
                
                if (!played && speed > SHAKE_THRESHOLD) {
                    media.play();
                    played = true;

                    $('#shakeResult').empty();
                    $('.shake-header').addClass('shake-open').removeClass('shake-close');
                    $('.sf-wrapper').addClass('shake-open').removeClass('shake-close');
                    $('.sf-more-bg').addClass('shake-open').removeClass('shake-close');

                    var imgArr = ['/static/images/h5/wx_shake/a.png',
                                    '/static/images/h5/wx_shake/b.png',
                                    '/static/images/h5/wx_shake/c.png',
                                    '/static/images/h5/wx_shake/d.png',
                                    '/static/images/h5/wx_shake/e.png'],
                                    titleArr = ['涨薪进行曲','唱歌加班','办公室之恋','升职歌','跳槽到月球'];
                    var randomNum = Math.round(Math.random()*4);
                    var imgObj = new Image(),
                            $img = $(imgObj);

                    $img.attr('src', imgArr[randomNum]);

                    setTimeout(function(){
                        media.pause();
                        $('.shake-footer').hide();
                        
                        $('#shakeResult').append($img);
                        $('title').text('我的猴年职场主题曲是：'+titleArr[randomNum]+'，你的呢？');
                        that.statisticsData(titleArr[randomNum]);
                    },1500);
                }
                last_x = x;
                last_y = y;
                last_z = z;
            }
        },

        statisticsData: function(id){
            var options = {
                url: "/html/emptyPage.html?option="+id+"&user="+ip,
                callback: function() {
                    
                }
            };
            service.normalAjax(options);
        },

        showResult: function(){
            var that = this;

            media.play();
            played = true;
            $('.shake-footer').css('background','none');
            $('.shake-header').addClass('shake-open').removeClass('shake-close');
            $('.sf-wrapper').addClass('shake-open').removeClass('shake-close');
            $('.sf-more-bg').addClass('shake-open').removeClass('shake-close');
            
            $('#shakeResult').empty();
            setTimeout(function(){
                media.pause();
                $('.shake-footer').hide();
                that.loadResult();
            },1500);
        },

        loadResult: function(){
            var imgArr = ['/static/images/h5/wx_shake/a.png',
                                    '/static/images/h5/wx_shake/b.png',
                                    '/static/images/h5/wx_shake/c.png',
                                    '/static/images/h5/wx_shake/d.png',
                                    '/static/images/h5/wx_shake/e.png'];
            var randomNum = Math.round(Math.random()*4);
            var imgObj = new Image(),
                    $img = $(imgObj);

            console.log(randomNum);
            console.log($img);
            $img.attr('src', imgArr[randomNum]);
            $('#shakeResult').append($img);
        },

        showShareContainer: function() {
            var $height = Math.max($(window).height(), $(document).height());
            $("#mask").height($height).show();
            $("#shareContainer").show();
        },

        closeShareContainer: function() {
            $("#mask").hide();
            $("#shareContainer").hide();
        }

    };

    return h5DeviceMotion;
});