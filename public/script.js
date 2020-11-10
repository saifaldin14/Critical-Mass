// call on the canvas
// window.onload = function() {

// }
var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
var wood = document.getElementById("wood");
var pat = c.createPattern(wood, "repeat");;
let img = new Image();
img.src = './assets/bg.jpg';

function setup() {
    canvas.height = window.innerHeight - 200;
    //canvas.height = 700;
    //canvas.width = 1000;
    canvas.width = window.innerWidth - 800;
    c.translate(canvas.width - 10, canvas.height - 100);
}
setup();

img.addEventListener("load", () => {
    c.save()
    c.globalCompositeOperation='destination-over'
    //c.drawImage(img, 0, 0, 1000, 700);
    c.drawImage(img, -800, -1000, window.innerWidth, window.innerHeight + 100);
    c.restore();
})

wood.addEventListener("load", () => {
    pat = c.createPattern(wood, "repeat");
})

const drawImage = () => {
    c.save()
    c.globalCompositeOperation='destination-over'
    //c.drawImage(img, 0, 0, 1000, 700);
    c.drawImage(img, -800, -1000, window.innerWidth, window.innerHeight + 100);
    c.restore();
}
drawImage();


// drawing the ramp
const drawRamp = (angle) => {
    c.save();
    c.beginPath();
    c.rotate(angle * Math.PI / 180);
    c.moveTo(-750, 0);
    //c.moveTo(900, 0);
    c.lineWidth = 20;
    c.lineTo(0, 0);
    //c.lineTo(100, 0);
    c.strokeStyle=pat;
    c.stroke();
    c.restore();
}

const drawConnectingLine = (x1, angle) => {
    c.save();
    c.beginPath();
    c.rotate(angle * Math.PI / 180);
    c.moveTo(-760, -29);
    c.lineWidth = 5;
    c.lineTo(x1, -29);
    c.fillStyle = pat;
    c.stroke();
    c.restore();
}

// const drawCurvedLine = () => {
//     c.moveTo(-100, -200);
//     c.bezierCurveTo(-300, -100, -250, -50, -200, 0);
//     c.stroke();
//     c.save();
//     c.beginPath();
//     c.arc(-400, -200, -100, 0, Math.PI, false);
//     c.lineWidth = 10;
//     c.stroke();
//     c.restore();
// }

// drawing the base -- this should stay fixed
function drawBase() {
    c.save()
    c.beginPath();
    c.rotate(0 * Math.PI / 180);
    c.moveTo(-600, 0);
    c.lineWidth = 30;
    c.lineTo(0, 0);
    c.strokeStyle=pat;
    c.stroke();
    c.restore();
}
drawBase();

// the rectangle that will be sliding down the ramp -- starting point is ontop of the ramp
const rectangle = (posX, posY, angle) => {
    c.save();
    c.beginPath();
    c.rotate(angle * Math.PI / 180);
    c.fillStyle = "#668cff";
    c.fillRect(posX, posY, 80, 50);
    c.fillStyle = "white";
    c.font = "15pt sans-serif";
    c.textAlign="center";
    c.textBaseline = "middle";
    c.fillText("m2", posX+(80/2),posY+(50/2));
    c.stroke();
    c.restore();
}

const drawWeight = (posX, posY) => {
    c.save();
    c.beginPath();
    c.rotate(0);
    c.fillStyle = "#668cff";
    c.fillRect(posX, posY, 80, 50);
    c.fillStyle = "white";
    c.font = "15pt sans-serif";
    c.textAlign="center";
    c.textBaseline = "middle";
    c.fillText("m1", posX+(80/2),posY+(50/2));
    //c.strokeText(msg, posX + 33, posY + 35);
    c.stroke();
    c.restore();
}

const drawLine = (x1, y1, x2, y2) => {
    c.save();
    c.beginPath();
    c.moveTo(x1, y1);
    c.lineWidth = 5;
    c.lineTo(x2, y2);
    c.stroke();
    c.restore();
}

const drawCircle = () => {
    c.beginPath();
    c.arc(-530, -545, 30, 0, 2 * Math.PI);
    c.fill();
}
function genRand(min, max, decimalPlaces) {
    return (Math.random() * (max - min) + min).toFixed(decimalPlaces);
    // var rand = Math.random()*(max-min) + min;
    // var power = Math.pow(100, decimalPlaces);
    // return Math.floor(rand*power) / power;
}

var currX = -400; // set the initial X pos of the rectangle
var currY = -58; // set the initial Y pos of the rectangle

var weightPositionX = -570;

var linePositionX1 = -530;
var linePositionY1 = -532;
var linePositionX2 = -530;
var linePositionY2 = -400;

var criticalMass = genRand(99.5, 100.5, 1);
var currentMass = 0;
var activeUp = false;
var activeDown = false;
var isUpOrDown = true;

function upwardStart() {
    currX = -400; // set the initial X pos of the rectangle
    currY = -58; // set the initial Y pos of the rectangle

    weightPositionX = -570;

    linePositionX1 = -530;
    linePositionY1 = -532;
    linePositionX2 = -530;
    linePositionY2 = -400;

    isUpOrDown = true;
    changeButtonColor();

    c.clearRect(55, 0, -1500, -790);
    const currAngle = 45;
    drawImage();
    drawRamp(currAngle);
    rectangle(currX, currY, currAngle);
    drawConnectingLine(currX, 45);
    drawCircle();
    //rectangle(weightPositionX, linePositionY2, 0); //Draw weights box
    drawWeight(weightPositionX, linePositionY2);
    drawLine(linePositionX1, linePositionY1, linePositionX2, linePositionY2); //Draw connecting line
    //requestAnimationFrame(upwardStart); // call the animateframe to display

}
upwardStart();

function downwardStart() {
    currX = -730; // set the initial X pos of the rectangle
    currY = -58; // set the initial Y pos of the rectangle

    weightPositionX = -570;

    linePositionX1 = -530;
    linePositionY1 = -532;
    linePositionX2 = -530;
    linePositionY2 = -100;

    isUpOrDown = false;
    changeButtonColor();

    c.clearRect(55, 0, -1500, -790);
    const currAngle = 45;
    drawImage();
    drawRamp(currAngle);
    rectangle(currX, currY, currAngle);
    drawConnectingLine(currX, 45);
    drawCircle();
    //rectangle(weightPositionX, linePositionY2, 0); //Draw weights box
    drawWeight(weightPositionX, linePositionY2);
    drawLine(linePositionX1, linePositionY1, linePositionX2, linePositionY2); //Draw connecting line
    //requestAnimationFrame(downwardStart); // call the animateframe to display

}
// downwardStart();

function startAnim() {
    var newMass = document.getElementById('add_mass').valueAsNumber;
    var massLabel = document.getElementById('massLabel');
    currentMass = newMass;
    if (currentMass >= criticalMass) {
        activeUp = true;
        upRamp();
    }

    if (!activeUp && currentMass < criticalMass) {
        activeDown = true;
        downRamp();
    }
    //document.getElementById('add_mass').value = '';
    massLabel.innerHTML = currentMass.toFixed(2);
}

// moving the actual rectangle up the ramp
function upRamp() {
    var label = currentMass.toFixed(2);
    if (activeUp) {
        c.clearRect(55, 0, -1500, -790);
        const currAngle = 45;
        drawImage();
        drawRamp(currAngle);
        currX = currX - 5; // increment x pos
        console.log(currX);
        if (currX >= -730) {
            linePositionY2 += 5;
            rectangle(currX, currY, currAngle);
            drawConnectingLine(currX, 45);
            drawCircle();
            drawWeight(weightPositionX, linePositionY2);
            //rectangle(weightPositionX, linePositionY2, 0);
            drawLine(linePositionX1, linePositionY1, linePositionX2, linePositionY2);
        }
        else {
            currX = -730;
            rectangle(currX, -58, currAngle);
            drawConnectingLine(currX, 45);
            drawCircle();
            drawWeight(weightPositionX, -100);
            //rectangle(weightPositionX, -150, 0);
            drawLine(linePositionX1, linePositionY1, linePositionX2, -100);
            activeUp = false;
        }
        requestAnimationFrame(upRamp);
    }
}

function downRamp() {
    var label = currentMass.toFixed(2);
    if (activeDown) {
        c.clearRect(55, 0, -1500, -790);
        const currAngle = 45;
        drawImage();
        drawRamp(currAngle);
        currX += 5;
        if (currX < -400) {
            linePositionY2 -= 5;
            rectangle(currX, currY, currAngle);
            drawConnectingLine(currX, 45);
            drawCircle();
            drawWeight(weightPositionX, linePositionY2);
            drawLine(linePositionX1, linePositionY1, linePositionX2, linePositionY2);
        }
        else {
            currX = -400
            rectangle(currX, -58, currAngle);
            drawConnectingLine(currX, 45);
            drawCircle();
            drawWeight(weightPositionX, -400);
            drawLine(linePositionX1, linePositionY1, linePositionX2, -400);
            activeDown = false;
        }
        requestAnimationFrame(downRamp);
    }
}

function resetPosition() {
    activeUp = false;
    activeDown = false;
    currentMass = 0;
    massLabel.innerHTML = currentMass.toFixed(2);
    currY = -58;

    weightPositionX = -570;

    linePositionX1 = -530;
    linePositionY1 = -532;
    linePositionX2 = -530;

    if (isUpOrDown) {
        currX = -400;
        linePositionY2 =  -400;
    } else {
        currX = -730;
        linePositionY2 =  -100;
    }
    changeButtonColor();

    c.clearRect(55, 0, -1500, -790);
    const currAngle = 45;
    drawImage();
    drawRamp(currAngle);
    rectangle(currX, currY, currAngle);

    drawConnectingLine(currX, 45);
    drawCircle();

    drawWeight(weightPositionX, linePositionY2);
    drawLine(linePositionX1, linePositionY1, linePositionX2, linePositionY2);
    document.getElementById('add_mass').value = '';
}

function resetRamp() {
    criticalMass = genRand(99, 101, 1);
    resetPosition();
}

function changeButtonColor () {
    if (isUpOrDown) {
        document.getElementById("submit_button1").className = 'btn btn-danger';
        document.getElementById("submit_button2").className = 'btn btn-success';
    } else {
        document.getElementById("submit_button1").className = 'btn btn-success';
        document.getElementById("submit_button2").className = 'btn btn-danger';
    }
}
