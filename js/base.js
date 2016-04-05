// JavaScript Document
//获取样式
function getStyle(obj,attr){
	return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj,false)[attr];
}
//运动封装
function move(obj,json,opational){
	
	var opational=opational||{};
	opational.time=opational.time||300;
	opational.fn=opational.fn||null;
	opational.type=opational.type||'ease-out';
	
	var start={};
	var dis={};
	for(var key in json){
		start[key]=parseInt(getStyle(obj,key));
		dis[key]=json[key]-start[key];
	}
	
	var count=Math.round(opational.time/30);
	var n=0;
	
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		n++;
		for(var key in json){
			switch(opational.type){
				case 'linear':
					var a=n/count;
					var cur=start[key]+dis[key]*a;
					break;
				case 'ease-in':
					var a=n/count;
					var cur=start[key]+dis[key]*a*a*a
					break;
				case 'ease-out':
					var a=1-n/count;
					var cur=start[key]+dis[key]*(1-a*a*a)
					break;	
			}
			
			if(key=='opacity'){
				obj.style.opacity=cur;
				obj.style.filter='alpha(opacity:'+cur*100+')';
			}else{
				obj.style[key]=cur+'px';
				
			}	
		}
		
		if(n==count){
			clearInterval(obj.timer);
			opational.fn&&opational.fn();
			
		}
	},30);
}
//添加鼠标滚动
function addMouseWheel(obj,fn){
	if(navigator.userAgent.toLowerCase().indexOf('firefox') != -1){
		obj.addEventListener('DOMMouseScroll',fnWheel,false);
	}else{
		obj.onmousewheel=fnWheel;
	}
	function fnWheel(ev){
		var oEvt=ev||event;
		var down=false;
		if(oEvt.detail){
			down=oEvt.detail>0?true:false;
		}else{
			down=oEvt.wheelDelta>0?false:true;
		}
		fn(down);
		
		oEvt.preventDefault&&oEvt.preventDefault();
		return false;
		
	}	
}
function addEvent(obj,type,fn){
    if (obj.addEventListener) {
        obj.addEventListener(type, fn, false);
    } else {
        obj.attachEvent('on' + type, function() {
            fn.call(obj);
        })
    }
}