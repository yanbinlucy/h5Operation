/**
 * @method h5GameWhite 别踩白块游戏
 * @author xuanbin zhang
 * @time 2016-04-14
 */

define('h5GameWhite',['./lib/common','./lib/service'],function(common,service){
    var wrapper = document.getElementById('wrapper'),
            box = document.getElementById('box'),
            replay = document.getElementById('replay'),
            time = document.getElementById('time'),
            down_len = -100,
            sum_score = 0,
            endTime = 0,
            count_time_flag = true,
            first_time_flag = true,
            mode = '1',
            timer = null,
            intervalTime = null,
            speed = 250;

    var h5GameWhite = {
        init: function(){
            var _this = this;

            for(var i=0; i<4; i++){
                _this.createCell();
            }
            replay.onclick = function(){
                window.location.href = window.location.href;
            };
            _this.bindClick();   
        },

        createCell: function(){
            var ran = Math.floor(Math.random()*4);
            var allCell = document.createElement('div');
            for(var i=0; i<4; i++){
                var cell = document.createElement('div');

                if(i==ran){
                    cell.className = 'cell black';
                }else {
                    cell.className = 'cell white';
                }

                allCell.appendChild(cell);
            }    

            if(box.firstChild && box.firstChild.nodeType=='1'){
                box.insertBefore(allCell,box.firstChild);
            }else {
                box.appendChild(allCell);
            } 
        },

        move: function(obj){
            var _this = this;

            if(mode == '1'){
                if(count_time_flag) {
                    _this.countTime();
                    count_time_flag = false;
                }
                box.style.top = down_len + 'px';

                if(box.lastChild.firstChild.offsetTop>=400){
                    box.removeChild(box.lastChild);
                }
                _this.createCell();
                _this.bindClick();   
            }else if(mode=='2'){//逻辑有问题
                _this.createCell();
                clearInterval(intervalTime);
                intervalTime = setInterval(function(){
                    _this.bindClick(); 
                    box.style.top = down_len + 'px';
                    down_len+=10;

                    if(box.offsetTop==0){
                        _this.createCell();
                        down_len = 0;
                        
                    }
                    if(box.offsetTop==100){
                        box.removeChild(box.lastChild);
                    }
                },speed);    
            }
            /*if(obj.offsetTop>400){
                obj.parentNode.parentNode.removeChild(obj.parentNode);
            }*/
        },

        bindClick: function(){
            var _this = this,
                    blacks = document.getElementsByClassName('black'),
                    whites = document.getElementsByClassName('white');
            for(var i=0,len=whites.length; i< len; i++){
                whites[i].onclick = function(){
                    this.style.background = 'red';
                    clearTimeout(timer);
                    clearInterval(intervalTime);
                    _this.showMask();
                }
            }

            blacks[blacks.length-1].onclick = function(){
                this.className = 'cell grey';
                _this.move(this);
                var tips = document.getElementById('tips');
                if(tips){
                    tips.parentNode.removeChild(tips);
                }
                var score = _this.addScore();
                document.getElementById('score').innerHTML = score;
            };
        },

        countTime: function(){
            var _this = this;

            if(first_time_flag){
                endTime = new Date().getTime() + 10000;
                first_time_flag = false;
            }

            var n=(endTime-new Date().getTime())/1000;
            if(n<0) {
                time.innerHTML = '0.000';
                document.getElementById('timeOut').style.display = 'block';
                _this.showMask();
                return;
            }
            time.innerHTML = n.toFixed(3);
            timer = setTimeout(function(){
                _this.countTime();
            }, 10);
        },

        showMask: function(){
            var _height = wrapper.offsetHeight;
            var mask = document.getElementById('mask');

            mask.style.height = _height +'px';
            mask.style.display = 'block';
            replay.style.display = 'block';
        },

        addScore: function(){
            sum_score += 1;

            return sum_score;
        }

    };

    return h5GameWhite;
});