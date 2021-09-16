// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 1200;
canvas.height = 550;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "leaf.jpeg";


// Bug image
var bugReady = false;
var bugImage = new Image();
bugImage.onload = function () {
	bugReady = true;
};
bugImage.src = "bug.png";

// Game objects
var bug = {
    x:0,
    y:0,
    elapse: 3000
};
var bugSmashed=0;

// Click the bug 
function clickBug (e) {
    if (e.clientX >= (bug.x+128) && e.clientX <= (bug.x + 256) && e.clientY >= (bug.y+160) && e.clientY <= (bug.y + 280))
    {
        reset(); 
        bug.elapse -= 50;
        bugSmashed++;
        if (bug.elapse === 0) 
        {
            bugSmashed++;
            bug.elapse = 3000;
        }
        then = Date.now();
    }
}
canvas.addEventListener("click",clickBug);

// Reset the game when the player clicks a bug
var reset = function () {
	// Throw the bug somewhere on the screen randomly
	bug.x = 64 + (Math.random() * (canvas.width - 192));
	bug.y = 64 + (Math.random() * (canvas.height - 192));
};

// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}
	if (bugReady) {
		ctx.drawImage(bugImage, bug.x, bug.y);
	}

	// Score
	var scoreResult = document.getElementById("score");
    scoreResult.innerHTML = "Score: " + bugSmashed;
};

// Reset Score
function resetScore(){
    bugSmashed=0;
    bug.elapse=3000;
}
document.getElementById("resetScore").addEventListener("click",resetScore);

// Reset Speed
function resetSpeed(){
    bug.elapse=3000;
}
document.getElementById("resetSpeed").addEventListener("click",resetSpeed);

// The main game loop
var main = function () {
    var now = Date.now();
    var delta = now - then;
    if (delta > bug.elapse) {
        reset();
        then = now;
    }
    render();

    requestAnimationFrame(main);
}
// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
reset();
main();
