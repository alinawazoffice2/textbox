//draw
var pixel_height = 2;
var pixel_width = 2;

function draw(){
	
	this.paintBuffer = [];
	this.rects = [];
	let me = this;

	this.line = function(pxStart, pyStart, pxEnd, pyEnd, pColor){
		for (var i = pxStart; i <= pxEnd; i++) {
			for (var j = pyStart; j <= pyEnd; j++) {
				if(i==j)
				$(".pixel" + i + j).css('background-color', pColor);
			}
		}
	}

	this.paint = function(pxStart, pyStart, pxEnd, pyEnd, pColor){
		me.paintBuffer = [];
		for (var i = pxStart; i <= pxEnd; i++) {
			for (var j = pyStart; j <= pyEnd; j++) {
				$(".pixel" + i + j).css('background-color', pColor);
				me.paintBuffer.push({x: i, y: j, c: pColor});
			}
		}
	}

	this.bPaint = function(buff){
		for (var i = 0; i < buff.length; i++) {
			$(".pixel" + buff[i].x + buff[i].y).css('background-color', buff[i].c);
		}
	}

	this.markBufferToScreen = function(name, buff){
		for (var i = 0; i < buff.length; i++) {

		}
	}

	this.rect = function(name, x, y, w, h, color){
		let _h = parseInt(h) + parseInt(y);
		let _w = parseInt(w) + parseInt(x);
		me.paint(x, y, _w, _h, color);
		let obj = {name: name, buffer: me.paintBuffer};
		me.rects.push(obj);
		return obj;
	}

	this.getRect = function(name){
		for (var i = 0; i < me.rects.length; i++) {
			if(me.rects[i].name == name){
				return me.rects[i];
			}
		}
		return null;
	}

	this.rectTranslate = function(name, x, y, color){
		let rect = me.getRect(name);
		if(rect != null){
			let b = new buffer(rect.buffer);
			let translatedBuff = b.translate(x, y, color);
			me.bPaint(translatedBuff);
		}
	}

	this.flush = function(color){
		$(".allpixels").css('background-color', color);
	}	
	this.init = function(color){
		var left = 0;
		var top = 0;		
		var screen_color = color;
		for (var i = 0; i < 100/pixel_height; i++) {
			for (var j = 0; j < 200/pixel_width; j++) {
				var pixel = '<div class="allpixels pixel' + i + j + '" style="margin: 2px;position: absolute;top: '+top+'px; left: '+left+'px;width: '+pixel_width+'px; height: '+pixel_height+'px; background-color: '+screen_color+';"></div>';
				$("#screen").append(pixel);
				left+=pixel_width;
			}	
			top+=pixel_height;
			left=0;
		}
	}

}

// buffer
function buffer(buff)
{

	let me = this;
	this.buff = buff;

	this.get = function()
	{
		return me.buff;
	}

	this.translate = function(x, y, _color)
	{
		let tempBuff = [];
		for (var i = 0; i < me.buff.length; i++) {
			tempBuff.push({x: me.buff[i].x, y: me.buff[i].y, c: me.buff[i].c});
			tempBuff[i].x += x;
			tempBuff[i].y += y;
			if(_color !== undefined)
			{
				tempBuff[i].c = _color;
			}
		}
		return tempBuff;
	}

}