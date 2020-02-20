window.addEventListener('resize', function () {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	manyDots()
})


var tl = {
	t1: ((window.innerWidth) / .95) - innerWidth,
	t1a: 205,
	t2: ((window.innerWidth) / .95) - innerWidth,
	t2a: 355,
	t3: ((window.innerWidth) / .95) - innerWidth,
	t3a: 505
}

function Banner() {

	var text1 = "PACE";
	var text2 = "WE WILL MISS"
	var text3 = "    YOU!"
	var text4 = "WEBPT15"
	var canvas;
	var ctx;
	var textCanvas;
	var textctx;
	var dotMargin = 5;
	var dots = [];
	var mouse = {
		x: 0,
		y: 0
	};
	var mouseOnScreen = false;
	var count = 0;
	var countTotal = 10;



	this.initialize = function (canvas_id) {
		canvas = document.getElementById(canvas_id);
		ctx = canvas.getContext('2d');

		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		textCanvas = document.createElement('canvas');
		textctx = textCanvas.getContext('2d');

		textCanvas.width = window.innerWidth;
		textCanvas.height = window.innerHeight;

		canvas.addEventListener('mousemove', MouseMove, false);
		canvas.addEventListener('mouseout', MouseOut, false);



		start();
	}

	$('#canvas').click(function () {
		$('#main').toggle("explode", 1200)
		setTimeout(function () {
			$(this).hide();
		})

	})
	var start = function () {

		textctx.font = '200px impact';
		textctx.fillText(text1, tl.t1, tl.t1a);
		textctx.fillText(text2, tl.t2, tl.t2a);
		textctx.fillText(text3, tl.t3, tl.t3a);
		textctx.fillText(text4, 505, 655);

		clear();

		getCoords();
	}

	var getCoords = function () {
		var imageData, pixel, height, width;

		imageData = textctx.getImageData(0, 0, canvas.width, canvas.height);

		// quickly iterate over all pixels - leaving density gaps
		for (height = 0; height < textCanvas.height; height += dotMargin * 1.2) {
			for (width = 0; width < textCanvas.width; width += dotMargin * 1.2) {
				pixel = imageData.data[((width + (height * textCanvas.width)) * 4) - 1];
				//Pixel is black from being drawn on. 
				if (pixel == 255) {
					drawCircle(width, height);
				}
			}
		}

		setInterval(update), 2500;
		//		requestAnimationFrame(initialize) 
	}

	function random(min, max) {
		return Math.random() * (max - min) + min;
	}
	var colorArray = ['blue', 'red', 'red', 'pink'];
	var drawCircle = function (x, y) {

		var startx = (Math.random() * canvas.width);
		var starty = (Math.random() * canvas.height);

		var velx = (x - startx) / countTotal;
		var vely = (y - starty) / countTotal;

		dots.push({
			c: colorArray[random(0, 3)],
			x: x, //goal position
			y: y,
			x2: startx, //start position
			y2: starty,
			r: true, //Released (to fly free!)

			v: {
				x: velx,
				y: vely
			}
		})
	}

	var update = function () {
		var i, dx, dy, sqrDist, scale;
		count++;
		clear();
		for (i = 0; i < dots.length; i++) {

			if (dots[i].r == true) {
				dots[i].x2 += dots[i].v.x;
				dots[i].y2 += dots[i].v.y;
				dots[i].x -= 1;
			}
			if (count == countTotal) {
				dots[i].v = {
					x: (Math.random() * 6) * 2 - 6,
					y: (Math.random() * 6) * 2 - 6
				};

				dots[i].r = false;
			}

			dx = dots[i].x - mouse.x;
			dy = dots[i].y - mouse.y;
			sqrDist = Math.sqrt(dx * dx + dy * dy);

			if (sqrDist < 20) {
				drawCircle();
				dots[i].r = true;
			}

			
			ctx.fillStyle = "white";
			
			ctx.beginPath();
			ctx.fillRect(dots[i].x2, dots[i].y2, 5, 5);
			ctx.closePath();
			ctx.fill();
			ctx.stroke();
		}

		ctx.strokeStyle = "blue";
		ctx.fillStyle = "transparent";
		ctx.lineWidth = 5;
		ctx.font = '200px impact';
		ctx.strokeText(text1, tl.t1, tl.t1a);
		ctx.strokeText(text2, tl.t2, tl.t2a);
		ctx.strokeText(text3, tl.t3, tl.t3a);
		ctx.fillText(text4, 505, 655);
		ctx.strokeText(text4, 505, 655);
		ctx.fillText(text1, tl.t1, tl.t1a);
		ctx.fillText(text2, tl.t2, tl.t2a);
		ctx.fillText(text3, tl.t3, tl.t3a);
	}



	var MouseMove = function (e) {
		if (e.layerX || e.layerX === 100) {
			//Reset particle positions
			mouseOnScreen = true;
			mouse.x = e.layerX - canvas.offsetLeft;
			mouse.y = e.layerY - canvas.offsetTop;
		}
	}

	var MouseOut = function (e) {
		mouseOnScreen = false;
		mouse.x -= mouse.x;
		mouse.y -= mouse.x;
	}

	var clear = function () {
		var gradient = ctx.createLinearGradient(0, 0, innerWidth, innerHeight);
		gradient.addColorStop(0, 'gray');
		//gradient.addColorStop(025, 'transparent');
		gradient.addColorStop(0.5, 'transparent');
		//gradient.addColorStop(0.75, 'transparent');
		gradient.addColorStop(1, 'gray');
		//ctx.fillStyle = fsadf;
		ctx.fillRect(20, 20, 200, 100);
		ctx.fillStyle = gradient;
		ctx.beginPath();
		ctx.rect(0, 0, canvas.width, canvas.height);
		ctx.closePath();
		ctx.fill();


	}
}

var banner = new Banner();
banner.initialize('canvas');
