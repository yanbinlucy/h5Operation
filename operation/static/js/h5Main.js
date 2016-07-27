define('h5Main',
    ['./h5DeviceMotion','./h5S01Potential','./h5S02Position','./h5S03Lazy',
        './h5S04Award','./h5S05Shake',
        './h5NewYear01','./h5NewYear02','./h5NewYear03','./h5NewYear04',
        './h5NewYear05','./h5NewYear06',
        './h5S06NewYear','./h5S06NewYearAward',
        './h5DetailControl','./h5SelectColor','./h5HealthReport',
        './h5UICompetition','./h5TalentRecruit',
        './h5GameWhite'],
    function(h5DeviceMotion,h5S01Potential,h5S02Position,h5S03Lazy,
        h5S04Award,h5S05Shake,
        h5NewYear01,h5NewYear02,h5NewYear03,h5NewYear04,
        h5NewYear05,h5NewYear06,
        h5S06NewYear,h5S06NewYearAward,
        h5DetailControl,h5SelectColor,h5HealthReport,
        h5UICompetition,h5TalentRecruit,
        h5GameWhite){
        _.templateSettings = {
            evaluate: /<%([\s\S]+?)%>/g,
            interpolate: /<%=([\s\S]+?)%>/g,
            escape: /<%-([\s\S]+?)%>/g
        };
        var h5Main = {
            h5DeviceMotion: function(){
                h5DeviceMotion.init();
            },
            h5S01Potential: function(){
                h5S01Potential.init();
            },
            h5S02Position: function(){
                h5S02Position.init();
            },
            h5S03Lazy: function(){
                h5S03Lazy.init();
            },
            h5S04Award: function(){
                h5S04Award.init();
            },
            h5S05Shake: function(){
                h5S05Shake.init();
            },
            h5NewYear01: function(){
                h5NewYear01.init();
            },
            h5NewYear02: function(){
                h5NewYear02.init();
            },
            h5NewYear03: function(){
                h5NewYear03.init();
            },
            h5NewYear04: function(){
                h5NewYear04.init();
            },
            h5NewYear05: function(){
                h5NewYear05.init();
            },
            h5NewYear06: function(){
                h5NewYear06.init();
            },
            h5S06NewYear: function(){
                h5S06NewYear.init();
            },
            h5S06NewYearAward: function(){
                h5S06NewYearAward.init();
            },
            h5DetailControl: function(){
                h5DetailControl.init();
            },
            h5SelectColor: function(){
                h5SelectColor.init();
            },
            h5HealthReport: function(){
                h5HealthReport.init();
            },
            h5UICompetition: function(){
                h5UICompetition.init();
            },
            h5TalentRecruit: function(){
                h5TalentRecruit.init();
            },
            h5GameWhite: function(){
                h5GameWhite.init();
            }
        };
        return h5Main;
});