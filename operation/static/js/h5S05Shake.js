/**
 * @method h5S05Shake h5摇一摇测试
 * @author xuanbin zhang
 * @time 2016-01-22
 */

define('h5S05Shake',['./lib/common','./lib/service'],function(common,service){
    var SHAKE_THRESHOLD = 1500,//3000
            last_update = 0,
            x,y,z,last_x,last_y,last_z,
            played = false,
            ip = '',
            media = document.getElementById('musicBox');
    var h5S05Shake = {
        init: function(){
            var that = this;
            
            if (window.DeviceMotionEvent) {
                window.addEventListener('devicemotion', that.deviceMotionHandler, false);
            } else {
                alert('过年了，给自己换个好点的手机吧？');
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

            that.addEmptyLabel();

            that.bindEvent();

        },

        addEmptyLabel: function(){
            var str = '';
            var arr = [];
            for(var i=0; i<30; i++){
                arr[i] = i+1;
            }

            arr.sort(function(){ return 0.5 - Math.random() });
            
            for (var i = 0; i < 30; i++) {
                str += '<span data-id="'+arr[i]+'" class="down down-'+arr[i]+'"></span>';
            };

            $('.empty-box').append(str);
        },

        bindEvent: function(){
            var that = this;
            /*$('.hb-right a').on('click',function(e){
                e.preventDefault();
                if(!played){
                    that.showResult();
                }
            });*/

            $('.retry-icon').on('click',function(e){
                played = false;

                $('.shake-bg').removeClass('overflow-y');

                $('.down').removeClass('down-h5');
                $('.down').each(function(index,obj){
                    var len = $(obj).attr('data-id');
                    $(obj).attr('style','')
                });
                $('.empty-box').hide();
                $('.shake-btn').hide();
                $('.shake-tip').hide();
               
                $('.shake-footer').show();
                /*$('.shake-header').addClass('shake-close').removeClass('shake-open');
                $('.sf-wrapper').addClass('shake-close').removeClass('shake-open');
                $('.sf-more-bg').addClass('shake-close').removeClass('shake-open');

                $('#shakeResult').addClass('shake-close').removeClass('shake-open');
                $('.shake-btn').addClass('shake-close').removeClass('shake-open');
                $('.shake-tip').addClass('shake-close').removeClass('shake-open');*/
                $('.shake').addClass('shake-close').removeClass('shake-open');
            });

            $('.arrow-icon').on('click',function(e){
                that.showShareContainer();
            });

            $('.close-tip').on('click',function(e){
                that.closeShareContainer();
            });

            $('.share-icon').on('click',function(e){
                that.showShareContainer();
            });
        },

        deviceMotionHandler: function(eventData){
            var acceleration =eventData.accelerationIncludingGravity;
            var curTime = new Date().getTime();
            var that = this;

            if ((curTime - last_update) > 100) {
                var diffTime = curTime -last_update;
                last_update = curTime;
                x = acceleration.x;
                y = acceleration.y;
                z = acceleration.z;
                var speed = Math.abs(x +y + z - last_x - last_y - last_z) / diffTime * 10000;

                if (!played && speed > SHAKE_THRESHOLD) {
                    media.play();
                    played = true;
                    $('.shake-bg').addClass('overflow-y');
                    $('.empty-box').show();
                    $('.shake-btn').show();
                    $('.shake-tip').show();
                    $('.shake-footer').css('background','none');
                    $('.shake-header').addClass('shake-open').removeClass('shake-close');
                    $('.sf-wrapper').addClass('shake-open').removeClass('shake-close');
                    $('.sf-more-bg').addClass('shake-open').removeClass('shake-close');

                    $('#shakeResult').empty();
                    setTimeout(function(){
                        media.pause();
                        $('.shake-footer').hide();

                        $('.down').addClass('down-h5');

                        $('.down-h5').each(function(index,obj){
                            var len = Math.round(Math.random()*30);
                            len = len==0 ? 1 : len;
                            $(obj).css({
                                '-webkit-transition': 'all 3s ease-out '+len/10+'s',
                                'transition': 'all 3s ease-out '+len/10+'s'
                            });
                        });


                        var imgArr = ['/static/images/h5/wx_shake/a.png',
                                                '/static/images/h5/wx_shake/b.png',
                                                '/static/images/h5/wx_shake/c.png',
                                                '/static/images/h5/wx_shake/d.png',
                                                '/static/images/h5/wx_shake/e.png'],
                                    titleArr = ['涨薪进行曲','唱歌加班','办公室之恋','最扯淡的事','升职歌'];    
                        var randomNum = Math.round(Math.random()*4);

                        var imgObj = new Image(),
                                $img = $(imgObj);

                        $img.attr('src', imgArr[randomNum]);
                        $('#shakeResult').append($img);
                        $('#shakeResult').addClass('shake-open').removeClass('shake-close');
                        $('.shake-btn').addClass('shake-open').removeClass('shake-close');
                        $('.shake-tip').addClass('shake-open').removeClass('shake-close');
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
                url: "/html/emptyPage.html?origin=h5S05Shake&option="+id+"&user="+ip,
                callback: function() {
                    
                }
            };
            service.normalAjax(options);
        },

        showResult: function(){
            var that = this;

            media.play();
            played = true;
            $('.shake-bg').addClass('overflow-y');
            $('.empty-box').show();
            $('.shake-btn').show();
            $('.shake-tip').show();
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
            $('.down').addClass('down-h5');

            $('.down-h5').each(function(index,obj){
                var len = Math.round(Math.random()*30);
                len = len==0 ? 1 : len;
                $(obj).css({
                    '-webkit-transition': 'all 3s ease-out '+len/10+'s',
                    'transition': 'all 3s ease-out '+len/10+'s'
                });
            });


            var imgArr = ['/static/images/h5/wx_shake/a.png',
                                    '/static/images/h5/wx_shake/b.png',
                                    '/static/images/h5/wx_shake/c.png',
                                    '/static/images/h5/wx_shake/d.png',
                                    '/static/images/h5/wx_shake/e.png'];
            var randomNum = Math.round(Math.random()*4);

            var imgObj = new Image(),
                    $img = $(imgObj);

            $img.attr('src', imgArr[randomNum]);
            $('#shakeResult').append($img);
            $('#shakeResult').addClass('shake-open').removeClass('shake-close');
            $('.shake-btn').addClass('shake-open').removeClass('shake-close');
            $('.shake-tip').addClass('shake-open').removeClass('shake-close');

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

    return h5S05Shake;
});