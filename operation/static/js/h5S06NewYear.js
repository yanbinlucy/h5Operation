/**
 * @method h5S06NewYear 新年拜年活动
 * @author xuanbin zhang
 * @time 2016-02-05
 */

define('h5S06NewYear',['./lib/common','./lib/service'],function(common,service){
    var SHAKE_THRESHOLD = 1500,//3000
            last_update = 0,
            x,y,z,last_x,last_y,last_z,
            played = false,
            ip = '',
            media = document.getElementById('musicBox');
    var h5S06NewYear = {
        init: function(){
            var that = this;

            if (window.DeviceMotionEvent) {
                window.addEventListener('devicemotion', that.deviceMotionHandler, false);
            } else {
                alert('哥们儿，该换手机了吧？');
            }

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

            media.load();

            that.bindEvent();
        },

        //绑定事件
        bindEvent: function(){
            var that = this;
            $('.header-logo').on('click',function(e){
                e.preventDefault();
                $('.banner').addClass('shake-out');
            });
        },

        deviceMotionHandler: function(eventData){
            var acceleration =eventData.accelerationIncludingGravity;
            var curTime = new Date().getTime();
            var that = this;

            if ((curTime - last_update)> 100) {
                var diffTime = curTime -last_update;
                last_update = curTime;
                x = acceleration.x;
                y = acceleration.y;
                z = acceleration.z;
                var speed = Math.abs(x +y + z - last_x - last_y - last_z) / diffTime * 10000;

                if (!played && speed > SHAKE_THRESHOLD) {
                    media.play();
                    played = true;


                    $('.banner').addClass('shake-out');

                    setTimeout(function(){
                        var urlArr = ['http://mp.weixin.qq.com/s?__biz=MzA4MTg3NDYzNA==&mid=449177801&idx=1&sn=a8d9a2671b33edf1eb69f31101df3aa7#rd',
                                'http://mp.weixin.qq.com/s?__biz=MzA4MTg3NDYzNA==&mid=449286828&idx=1&sn=3dba1a978ce4d95c4322cda1d9c06c90#rd',
                                'http://mp.weixin.qq.com/s?__biz=MzA4MTg3NDYzNA==&mid=449287474&idx=1&sn=af93ab3e63ffe8dd97a456de460367ca#rd',
                                'http://mp.weixin.qq.com/s?__biz=MzA4MTg3NDYzNA==&mid=449288315&idx=1&sn=7e7ebc821752727954d81287654c4f95#rd',
                                'http://mp.weixin.qq.com/s?__biz=MzA4MTg3NDYzNA==&mid=449288650&idx=1&sn=25b2f890d5ffccc1a38ff7efeebeddde#rd',
                                'http://mp.weixin.qq.com/s?__biz=MzA4MTg3NDYzNA==&mid=449288884&idx=1&sn=769814e2bb457b2aa8af54d74061f140#rd',
                                'http://mp.weixin.qq.com/s?__biz=MzA4MTg3NDYzNA==&mid=449778262&idx=1&sn=92381acb960c0f2478da7006230580d6#rd',
                                'http://mp.weixin.qq.com/s?__biz=MzA4MTg3NDYzNA==&mid=449780089&idx=1&sn=af139e1518250c3f429b3c5db72cf67a#rd',
                                'http://mp.weixin.qq.com/s?__biz=MzA4MTg3NDYzNA==&mid=449782299&idx=1&sn=04437f229de080d2616592eedcc632fc#rd',
                                'http://mp.weixin.qq.com/s?__biz=MzA4MTg3NDYzNA==&mid=449783839&idx=1&sn=75773cb78f3ffff6bb1ef3df7e37d22a#rd',
                                'http://mp.weixin.qq.com/s?__biz=MzA4MTg3NDYzNA==&mid=449785364&idx=1&sn=a857b0b2373410ae90be849bd5da0f12#rd',
                                'http://mp.weixin.qq.com/s?__biz=MzA4MTg3NDYzNA==&mid=449811591&idx=1&sn=ea2517fef107d37eed854617cc6776e8#rd',
                                'http://mp.weixin.qq.com/s?__biz=MzA4MTg3NDYzNA==&mid=449812403&idx=1&sn=ac8f04e140f8ec6bdcfcfb2254f48966#rd',
                                'http://mp.weixin.qq.com/s?__biz=MzA4MTg3NDYzNA==&mid=449813403&idx=1&sn=d2e7d262607406bc1f01865097b5cc7c#rd',
                                'http://mp.weixin.qq.com/s?__biz=MzA4MTg3NDYzNA==&mid=449814447&idx=1&sn=add417dbccf5a71ba59531943d0e3156#rd',
                                'http://mp.weixin.qq.com/s?__biz=MzA4MTg3NDYzNA==&mid=449815103&idx=1&sn=0358e475e62ab149df8fe29c37e318e5#rd',
                                'http://mp.weixin.qq.com/s?__biz=MzA4MTg3NDYzNA==&mid=449828906&idx=1&sn=b99703696051da25128094262d00aa9a#rd',
                                'http://mp.weixin.qq.com/s?__biz=MzA4MTg3NDYzNA==&mid=449829660&idx=1&sn=2e99371be03589295c807178c6992d79#rd',
                                'http://mp.weixin.qq.com/s?__biz=MzA4MTg3NDYzNA==&mid=449830258&idx=1&sn=c6ed3332673638390c10d61df67d3839#rd',
                                'http://mp.weixin.qq.com/s?__biz=MzA4MTg3NDYzNA==&mid=449830647&idx=1&sn=5273d8a8c3ecad8817793136848c041d#rd',
                                'http://mp.weixin.qq.com/s?__biz=MzA4MTg3NDYzNA==&mid=449877507&idx=1&sn=bee3add49eb81f306b24f30dc062143d#rd'];

                        var randomNum = Math.floor(Math.random()*21),
                                currentUrl = urlArr[randomNum];
                        window.location.href = currentUrl;
                    },1500);
                }
                last_x = x;
                last_y = y;
                last_z = z;
            }
        },


       getLocation: function(){
            var urlArr = ['http://mp.weixin.qq.com/s?__biz=MzA4MTg3NDYzNA==&mid=449177801&idx=1&sn=a8d9a2671b33edf1eb69f31101df3aa7#rd',
                                'http://mp.weixin.qq.com/s?__biz=MzA4MTg3NDYzNA==&mid=449286828&idx=1&sn=3dba1a978ce4d95c4322cda1d9c06c90#rd',
                                'http://mp.weixin.qq.com/s?__biz=MzA4MTg3NDYzNA==&mid=449287474&idx=1&sn=af93ab3e63ffe8dd97a456de460367ca#rd',
                                'http://mp.weixin.qq.com/s?__biz=MzA4MTg3NDYzNA==&mid=449288315&idx=1&sn=7e7ebc821752727954d81287654c4f95#rd',
                                'http://mp.weixin.qq.com/s?__biz=MzA4MTg3NDYzNA==&mid=449288650&idx=1&sn=25b2f890d5ffccc1a38ff7efeebeddde#rd',
                                'http://mp.weixin.qq.com/s?__biz=MzA4MTg3NDYzNA==&mid=449288884&idx=1&sn=769814e2bb457b2aa8af54d74061f140#rd',
                                'http://mp.weixin.qq.com/s?__biz=MzA4MTg3NDYzNA==&mid=449778262&idx=1&sn=92381acb960c0f2478da7006230580d6#rd',
                                'http://mp.weixin.qq.com/s?__biz=MzA4MTg3NDYzNA==&mid=449780089&idx=1&sn=af139e1518250c3f429b3c5db72cf67a#rd',
                                'http://mp.weixin.qq.com/s?__biz=MzA4MTg3NDYzNA==&mid=449782299&idx=1&sn=04437f229de080d2616592eedcc632fc#rd',
                                'http://mp.weixin.qq.com/s?__biz=MzA4MTg3NDYzNA==&mid=449783839&idx=1&sn=75773cb78f3ffff6bb1ef3df7e37d22a#rd',
                                'http://mp.weixin.qq.com/s?__biz=MzA4MTg3NDYzNA==&mid=449785364&idx=1&sn=a857b0b2373410ae90be849bd5da0f12#rd',
                                'http://mp.weixin.qq.com/s?__biz=MzA4MTg3NDYzNA==&mid=449811591&idx=1&sn=ea2517fef107d37eed854617cc6776e8#rd',
                                'http://mp.weixin.qq.com/s?__biz=MzA4MTg3NDYzNA==&mid=449812403&idx=1&sn=ac8f04e140f8ec6bdcfcfb2254f48966#rd',
                                'http://mp.weixin.qq.com/s?__biz=MzA4MTg3NDYzNA==&mid=449813403&idx=1&sn=d2e7d262607406bc1f01865097b5cc7c#rd',
                                'http://mp.weixin.qq.com/s?__biz=MzA4MTg3NDYzNA==&mid=449814447&idx=1&sn=add417dbccf5a71ba59531943d0e3156#rd',
                                'http://mp.weixin.qq.com/s?__biz=MzA4MTg3NDYzNA==&mid=449815103&idx=1&sn=0358e475e62ab149df8fe29c37e318e5#rd',
                                'http://mp.weixin.qq.com/s?__biz=MzA4MTg3NDYzNA==&mid=449828906&idx=1&sn=b99703696051da25128094262d00aa9a#rd',
                                'http://mp.weixin.qq.com/s?__biz=MzA4MTg3NDYzNA==&mid=449829660&idx=1&sn=2e99371be03589295c807178c6992d79#rd',
                                'http://mp.weixin.qq.com/s?__biz=MzA4MTg3NDYzNA==&mid=449830258&idx=1&sn=c6ed3332673638390c10d61df67d3839#rd',
                                'http://mp.weixin.qq.com/s?__biz=MzA4MTg3NDYzNA==&mid=449830647&idx=1&sn=5273d8a8c3ecad8817793136848c041d#rd',
                                'http://mp.weixin.qq.com/s?__biz=MzA4MTg3NDYzNA==&mid=449877507&idx=1&sn=bee3add49eb81f306b24f30dc062143d#rd'];

            var randomNum = Math.round(Math.random()*21),
                    currentUrl = urlArr[randomNum];
            window.location.href = currentUrl;
       },


       statisticsData: function(id){
            var options = {
                url: "/html/emptyPage.html?origin=h5S06NewYear&option="+id+"&user="+ip,
                callback: function() {
                    
                }
            };
            service.normalAjax(options);
        }

    };

    return h5S06NewYear;
});