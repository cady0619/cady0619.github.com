// JavaScript Document

window.onload=function(){
	
	//头部菜单
	(function(){
		var oHdr=document.getElementById('hd_r');
		var aLi=oHdr.children;
		var oBox=aLi[aLi.length-1];
		var oContent=document.getElementById('content');
		var aDiv=oContent.children;
		var now=0;
		for(var i=0;i<aLi.length-1;i++){
			
			(function(index){
				aLi[i].onclick=function(){
					
					move1(oBox,this.offsetLeft);
					for(var i=0;i<aLi.length-1;i++){
					aLi[i].style.color="#fff";
					}
					this.style.color="#000";
					now=index;
					move(oContent,{top:-now*oContent.children[0].offsetHeight},{time:700,fn:function(){

					}});	
				};
				
			})(i);
		
		}
		//滚动
		addMouseWheel(oContent,function(down){
			var t=oContent.offsetTop;
			if(down){
				t-=400;
			}else{
				t+=400;
			}
			setPosition(t)
		});
		function setPosition(t){
			if(t>0) t=0;
			if(t<oContent.children[0].offsetHeight-oContent.offsetHeight)
				t=oContent.children[0].offsetHeight-oContent.offsetHeight;
			
			move(oContent,{top:t},{time:1200});
		
		}
		
		var speed=0;
		var left=0;
		function move1(obj,iTarget){
			clearInterval(obj.timer);
			obj.timer=setInterval(function(){
				speed+=(iTarget-left)/5;
				speed*=0.7;
				
				left+=speed;
				obj.style.left=Math.round(left)+"px";
				if(obj.offsetLeft==iTarget&&Math.abs(speed)<1){
					clearInterval(obj.timer);
				}
			},30);
		}
		
	})();
	
	//page1打字效果

	(function(){
		var oPreface=document.getElementById('preface');
		var str="There's a phrase in Buddhism, 'Beginner's mind.' It's wonderful to have a beginner's mind。";
		for(var i=0;i<str.length;i++){
			var oSpan1=document.createElement('span');
			oSpan1.innerHTML=str[i];
			oPreface.appendChild(oSpan1);
		}
		var i=0;
		var aSpan1=oPreface.children;
		var timer=setInterval(function(){
			aSpan1[i].className='active';
			i++;
			if(i==str.length){
				clearInterval(timer);
			}
		},100)
	})();

	
	
	//page1爆炸效果
	(function(){
		var oB=document.getElementById("banner");
		var R=6;
		var C=12;
		var len=R*C;
		
		for(var r=0; r<R;r++){
			for(var c=0;c<C;c++){
				var oSpan=document.createElement("span");
				oB.appendChild(oSpan);
				oSpan.style.width=oB.offsetWidth/C+"px";
				oSpan.style.height=oB.offsetHeight/R+"px";
				
				oSpan.style.left=oSpan.offsetWidth*c+"px";
				oSpan.style.top=oSpan.offsetHeight*r+"px";
				
				oSpan.style.backgroundPosition=-oSpan.offsetLeft+"px -"+oSpan.offsetTop+"px";
			}
		}
		var iNow=0;
		var aSpan=oB.children;
		
		var timer=setInterval(function(){
			for(var i = 0; i < len; i++){
			aSpan[i].style.transition="none";	
			aSpan[i].style.opacity="1";
			aSpan[i].style.transform="translate(0px,0px) rotateX(0deg) rotateY(0deg)";
			aSpan[i].style.backgroundImage="url(images/bg"+iNow%5+".jpg)";
			}
			
			oB.style.backgroundImage="url(images/bg"+(iNow+1)%5+".jpg)";
			
			iNow++;
			setTimeout(function(){
				for(var i=0;i<len;i++){
					aSpan[i].style.transition = "1s all ease";
					var x=aSpan[i].offsetLeft+aSpan[i].offsetWidth/2-oB.offsetWidth/2;
					var y=aSpan[i].offsetTop+aSpan[i].offsetHeight/2-oB.offsetHeight/2;
					
					aSpan[i].style.transform="translate("+x+"px,"+y+"px) rotateX("+rnd(-180,180)+"deg) rotateY("+rnd(-180,180)+"deg)";
					
					aSpan[i].style.opacity="0";
					
				}
			},0);
			
		},1200);

		
		function rnd(n,m){
			return Math.floor(Math.random()*(m-n)+n);
		}
	})();

	
	//page3     拉钩效果
	(function(){
		var oUl = document.getElementById("show");
		var aLi = oUl.children;
		function a2d(n){
			return n*180/Math.PI	
		}
		function getDir(obj,ev){
			var x = ev.clientX - (obj.offsetLeft+obj.offsetWidth/2+oUl.offsetLeft);
			var y = obj.offsetTop + obj.offsetHeight/2-ev.clientY;
			
			return Math.round((a2d(Math.atan2(y,x))+180)/90)%4;
		}
		for(var i = 0; i < aLi.length; i++){
			lagou(aLi[i]);
			
		}
		
		function lagou(oDiv){
			oDiv.onmouseover = function(ev){
				
				var oFrom = ev.fromElement || ev.releatedTarget;
				
				if(oDiv.contains(oFrom)){
					return ;
				}
				var n = getDir(this,ev);
				
				var oS = this.children[1];
				switch(n){
					case 0:
						oS.style.left = "-250px";
						oS.style.top = "0";
						break;
					case 1:
						oS.style.left = "0";
						oS.style.top = "200px";
						break;
					case 2:
						oS.style.left = "250px";
						oS.style.top = "0";
						break;
					case 3:
						oS.style.left = "0";
						oS.style.top = "-200px";
						break;
				}	
				
				move(oS,{left:0,top:0},{time:700});
			};
		
			oDiv.onmouseout = function(ev){
				
				var oTo = ev.toElement || ev.releatedTarget;
				
				if(oDiv.contains(oTo)){
					return ;
				}
				
				var n = getDir(this,ev);
				var oS = this.children[1];
			
				switch(n){
					case 0:
						move(oS,{left:"-250",top:0},{time:700})
						break;
					case 1:
						move(oS,{left:0,top:200},{time:700})
						break;
					case 2:
						move(oS,{left:250,top:0},{time:700})
						break;
					case 3:
						move(oS,{left:0,top:"-200"},{time:700})
						break;
						
				}	
				
			};	
		
		}
	
		
	})();
	(function(){
		var arr=["html/tupianhuan.html","html/canvas.html","html/fangdajing.html","html/fenkuaiyundong.html","html/lianpai.html","html/pubuliu.html","html/timer.html","html/tuozhuai.html"];
		var aA=document.getElementById('show').getElementsByTagName('a');
		for(var i=0;i<aA.length;i++){
			aA[i].index=i;
			aA[i].onclick=function(){
				window.open(arr[this.index])
			}
		}
		
	})();
	
		

};