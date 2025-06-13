let coreElements = [];
let starDegree = 45;
let overallTexture;

let song, analyser;
let fft;
let numBins = 128;
let smoothing = 0.8;
let button;
let volume = 1.0;
let pan = 0.0;

function preload() {
	overallTexture = loadImage("assets/Texture.png");
	song = loadSound("assets/music1.mp3");
}

function setup() {
	background(0);
	createCanvas(windowWidth, windowHeight);
	analyser = new p5.Amplitude();
	analyser.setInput(song);
	fft = new p5.FFT(smoothing, numBins);
	song.connect(fft);
	//Draw a button. If (!button) is to prevent the bug of two buttons appearing when moving the canvas.
	if (!button) {
		button = createButton("Play/Pause");
		button.mousePressed(play_pause);
	}
	button.position((width - button.width) / 2, height - button.height - 2);

	colorMode(HSB, 255);

	// create a meteor layer
	meteorLayer = createGraphics(windowWidth, windowHeight);
	drawMeteorLayer();

	background(0, 50);
	angleMode(DEGREES);
}

function draw() {
	background(0);
	let spectrum = fft.analyze();
	let rms = analyser.getLevel();

	for (let i = 0; i < spectrum.length; i++) {
		fill(map(i, 0, spectrum.length, 0, 255), 255, 255);
	}
	//Introducing the two main colors in the picture.
	let color1 = color(rms * 255 + frameCount % 255, 255, 255, 255);
	let color2 = color(rms * 255 + frameCount % 255, 255, 255, 70);

	push();
	translate(width / 2, height / 2);
	let totalR = max(noise(rms * 0.5) * width / 4, width / 20);

	//Draw a random star at the bottom for decoration
	push();
	drawStar(0, 0, totalR / 1.9, 0);
	pop();

	//Draw all the concentric circles
	if (!coreElements.length) {
		coreElements = new createMutipleCircle(0, 0, totalR, color1, color2);
	}

	coreElements.drawLine(rms);
	coreElements.diverPoint(spectrum);
	coreElements.randomPoint();
	coreElements.drawTriangle(90, rms);
	coreElements.drawMoon();
	coreElements.decorationCircle();

	//Draw the star in the middle
	drawStar(-totalR / 9, 0, totalR / 9, 0);
	pop();
	//Displays specific Volume and Pan numbers
	fill(255);
	text('Volume: ' + volume.toFixed(2), 10, 20);
	text('Pan: ' + pan.toFixed(2), 10, 40);

	fill(255);
	text('Volume: ' + volume.toFixed(2), 10, 20);
	text('Pan: ' + pan.toFixed(2), 10, 40);

	//Use multiply mode to add a layer of texture
	push();
	blendMode(MULTIPLY);
	image(overallTexture, 0, 0, width, height);
	pop();
}

//As the canvas size changes, the relative position of the main element also changes
function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	button.position((width - button.width) / 2, height - button.height - 2);
}

//Change the state of music playback.
function play_pause() {
	if (song.isPlaying()) {
		song.stop();
	} else {
		song.loop();
	}
}

function mouseMoved() {
	// Map volume according to the mouse Y coordinate: the closer to the top, the louder the volume
	volume = map(mouseY, 0, height, 1, 0);
	song.setVolume(volume);

	//Set stereo channel based on mouse X coordinate: left -1, right +1
	pan = map(mouseX, 0, width, -1, 1);
	song.pan(pan);
}





