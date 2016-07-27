/**
 * @method h5TalentRecruit 达人招募
 * @author xuanbin zhang
 * @time 2016-04-22
 */

define('h5TalentRecruit',['./lib/common','./lib/service'],function(common,service){
    var  appType ='web',
            gDate = new Date(),
            gFullDate = gDate.getFullYear()+''+(gDate.getMonth()+1)+''+gDate.getDate();

    var h5TalentRecruit = {
        init: function(){
            var _this = this;

            Zepto(function($){
                $(".main").onePageScroll({
                    sectionContainer: "section",     
                    easing: "ease-out",                  
                    animationTime: 1000,             
                    pagination: false,
                    loop: false,//循环滚动                
                    keyboard: true,                  
                    responsiveFallback: false,
                    beforeMove: function(index) {
                        if(index==1){
                            $('.page2').removeClass('ani');
                        }
                        if(index==2){
                            $('.page1').removeClass('init').removeClass('ani');
                            $('.page3').removeClass('ani');
                        }
                        if(index==3){
                            $('.page2').removeClass('ani');
                            $('.page4').removeClass('ani');
                        }
                        if(index==4){
                            $('.page3').removeClass('ani');
                        }
                    },
                    afterMove: function(index) {
                        $('.page'+index).addClass('ani');
                    }
                });
            });
            _this.bindEvent();
        },

        bindEvent: function(){
            var _this = this;
            $('#fourthPage .tb-bottom').on('click', function(event){
                event.preventDefault();

                window.location.href = 'activity.html?activity=talentRecruit&app_type='+appType+'&time='+gFullDate;
            });
        }

    };

    return h5TalentRecruit;
});