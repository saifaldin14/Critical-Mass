//Define canvas
var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

//Define images and wood pattern
var wood = document.getElementById("wood");
var pat = c.createPattern(wood, "repeat");;
let img = new Image();
img.src = './assets/bg.jpg';

//Define canvas dimensions
function setup() {
    canvas.height = 625;
    canvas.width = 625;
}
setup();

//Load background image
img.addEventListener("load", () => {
    c.save()
    c.globalCompositeOperation='destination-over'
    c.drawImage(img, 0, 0, 600, 600); //Call the draw image function
    c.restore();
})

//Load the wood background before brower page loads
wood.addEventListener("load", () => {
    pat = c.createPattern(wood, "repeat");
})

//Function to draw the background image
const drawImage = () => {
    c.save()
    c.globalCompositeOperation='destination-over'
    c.drawImage(img, 0, 0, 600, 600);
    c.restore();
}
drawImage();

//Function to draw the main ramp
const drawRamp = (angle) => {
    c.save();

    //Begin drawing
    c.beginPath();
    c.rotate(angle * Math.PI / 180); //Rotate the line at 45 degrees
    c.moveTo(800, 0); //Start position for the ramp
    c.lineWidth = 20;
    c.lineTo(100, 0);//End poistion for the ramp
    c.strokeStyle=pat;//Load the wood image as a pattern for the line
    c.stroke();
    c.restore();
}

//Function to draw the connecting line between 
//the center block and the top of the ramp
const drawConnectingLine = (x1, angle) => {
    c.save();
    c.beginPath();
    c.rotate(angle * Math.PI / 180);//Rotate the line by the same amount as the ramp (45 degrees)
    c.moveTo(75, -29);//Start position
    c.lineWidth = 5;
    c.lineTo(x1, -29);//End position
    c.fillStyle = pat;
    c.stroke();
    c.restore();
}

//Function to draw the base of the ramp
//Supposed to be just a horizontal line
function drawBase() {
    c.save()
    c.beginPath();
    c.rotate(0 * Math.PI / 180);
    c.moveTo(570, 570);
    c.lineWidth = 30;
    c.lineTo(50, 570);
    c.strokeStyle=pat;
    c.stroke();
    c.restore();
}
drawBase();

//Function to draw the rectangle that will be slding down the ramp
const rectangle = (posX, posY, angle) => {
    c.save();
    c.beginPath();
    c.rotate(angle * Math.PI / 180);//Rotate the box to match the anlge of the box
    c.fillStyle = "#668cff";
    c.fillRect(posX, posY, 80, 50);
    //Define text that indicates M2
    c.fillStyle = "white";
    c.font = "15pt sans-serif";
    c.textAlign="center";
    c.textBaseline = "middle";
    c.fillText("m2", posX+(80/2),posY+(50/2));
    c.stroke();
    c.restore();
}

//Function to draw the weight that will be going down and up 
const drawWeight = (posX, posY) => {
    c.save();
    c.beginPath();
    c.rotate(0);
    c.fillStyle = "#668cff";
    c.fillRect(posX, posY, 80, 50);
    //Define the text of M1
    c.fillStyle = "white";
    c.font = "15pt sans-serif";
    c.textAlign="center";
    c.textBaseline = "middle";
    c.fillText("m1", posX+(80/2),posY+(50/2));
    c.stroke();
    c.restore();
}

//Draw the line that connects the weight with the top of the ramp
const drawLine = (x1, y1, x2, y2) => {
    c.save();
    c.beginPath();
    c.moveTo(x1, y1);
    c.lineWidth = 5;
    c.lineTo(x2, y2);
    c.stroke();
    c.restore();
}

//Function to draw the pulley shape at the top of the ramp
const drawCircle = () => {
    c.beginPath();
    //c.arc(-530, -545, 30, 0, 2 * Math.PI);
    c.arc(75, 55, 30, 0, 2 * Math.PI)
    c.fill();
}

//Function to generate a random number netween a max and min
function genRand(min, max, decimalPlaces) {
    return (Math.random() * (max - min) + min).toFixed(decimalPlaces);
}

//Define and initialize the global variables used throughout the program
//Current poition of the box
var currX = 400;
var currY = -58;
var weightPositionX = 20;

//Positon of the connecting line between the weight and the ramp 
var linePositionX1 = 75;
var linePositionY1 = 70;
var linePositionX2 = 75;
var linePositionY2 = 200;

var criticalMass = genRand(99.5, 100.5, 1);//Define the critical mass between 99.5 - 100.5
var currentMass = 0;//User defined mass for the box
var activeUp = false; //Varibale to indicate the start of either the up animation
var activeDown = false;//Varibale to indicate the start of either the up animation
var isUpOrDown = true;//Varibale to deterine the start position of the simulation
//True means up false means down

const currAngle = 45; //Define constant angle of 45 degrees

//Start the simulation in the upward position
function upwardStart() {
    //Position the box at the middle of the ramp
    currX = 400;
    currY = -58;
    weightPositionX = 20;

    //Position the weight and line at the top of the ramp
    linePositionX1 = 60;
    linePositionY1 = 70;
    linePositionX2 = 60;
    linePositionY2 = 200;

    isUpOrDown = true; //The simulation is in the up position
    changeButtonColor();

    //Initialize the canvas position of all the components of the simulation
    c.clearRect(0, 0, 700, 700);
    drawImage();
    drawRamp(currAngle);
    rectangle(currX, currY, currAngle);
    drawConnectingLine(currX, 45);
    drawCircle();
    drawWeight(weightPositionX, linePositionY2); //Draw the weight
    drawLine(linePositionX1, linePositionY1, linePositionX2, linePositionY2); //Draw connecting line
    drawBase();
}
upwardStart();

//Start the simulation in the downward position
function downwardStart() {
    //Position the box at the top of the ramp
    currX = 120;
    currY = -58;
    weightPositionX = 20;

    //Position the weight and the connecting line at the bottom of the ramp 
    linePositionX1 = 60;
    linePositionY1 = 70;
    linePositionX2 = 60;
    linePositionY2 = 480;

    isUpOrDown = false; //The position is down
    changeButtonColor();

    //Initialize the position of all the components of the simulation
    c.clearRect(0, 0, 700, 700);
    drawImage();
    drawRamp(currAngle);
    rectangle(currX, currY, currAngle);
    drawConnectingLine(currX, 45);
    drawCircle();
    drawWeight(weightPositionX, linePositionY2);
    drawLine(linePositionX1, linePositionY1, linePositionX2, linePositionY2); //Draw connecting line
    drawBase();
}

//Start the animation and determine which animation function needs to be triggered
function startAnim() {
    var newMass = document.getElementById('add_mass').valueAsNumber; //Get the new user defined mass
    var massLabel = document.getElementById('massLabel'); //Get the label for the mass to update it

    currentMass = newMass;//Set the current mass to the new mass
    //If the current mass is greater than or equal to critical mass than the box must start to move
    if (currentMass >= criticalMass) {
        //Since the initial positon of the simulation is upward start the box will move up the ramp
        activeUp = true;
        upRamp();
    }

    //If the user selects downard start then check if the mass is less than the critical mass
    if (!activeUp && currentMass < criticalMass) {
        //Trigger the function to move the box down the ramp
        activeDown = true;
        downRamp();
    }
    massLabel.innerHTML = currentMass.toFixed(2); //Update the label to show the new mass
}

//Function for moving the rectangle up the ramp
function upRamp() {
    if (activeUp) {
        //Clear the canvas every frame 
        c.clearRect(0, 0, 700, 700);
        //Draw the core components that won't change throughout the simulation
        drawImage();
        drawRamp(currAngle);
        drawBase();
        currX = currX - 5; //Decrement the x position of the rectangle to move up the ramp
        if (currX >= 120) {
            linePositionY2 += 5; //Increment the line position ot increase its length
            //Draw the rest of the components with the updated coordinates
            rectangle(currX, currY, currAngle);
            drawConnectingLine(currX, 45);
            drawCircle();
            drawWeight(weightPositionX, linePositionY2);
            drawLine(linePositionX1, linePositionY1, linePositionX2, linePositionY2);
        }
        else {
            //Once the rectanlge reaches the top of the ramp stop moving
            currX = 120;
            //Draw the rest of the components at a fixed point
            rectangle(currX, -58, currAngle);
            drawConnectingLine(currX, 45);
            drawCircle();
            drawWeight(weightPositionX, 480);
            drawLine(linePositionX1, linePositionY1, linePositionX2, 480);
            activeUp = false; //Turn the activeUp condition to false to stop requesting the animation frame
            //Stop calling the animation function to prevent a memory overload
        }
        requestAnimationFrame(upRamp);
    }
}

//Function for moving the rectangle down the ramp
function downRamp() {
    if (activeDown) {
        //Clear the canvas every frame 
        c.clearRect(0, 0, 700, 700);
        //Draw the core components that won't change throughout the simulation
        drawImage();
        drawRamp(currAngle);
        drawBase();
        currX += 5; //Increment the x position of the rectangle to move down the ramp
        if (currX < 400) {
            linePositionY2 -= 5;//Decrement the line position ot decrease its length
            //Draw the rest of the components with the updated coordinates
            rectangle(currX, currY, currAngle);
            drawConnectingLine(currX, 45);
            drawCircle();
            drawWeight(weightPositionX, linePositionY2);
            drawLine(linePositionX1, linePositionY1, linePositionX2, linePositionY2);
        }
        else {
            //Once the rectanlge reaches the middle of the ramp stop moving
            currX = 400
            rectangle(currX, -58, currAngle);
            drawConnectingLine(currX, 45);
            drawCircle();
            drawWeight(weightPositionX, 200);
            drawLine(linePositionX1, linePositionY1, linePositionX2, 200);
            activeDown = false;//Turn the activeDown condition to false to stop requesting the animation frame
            //Stop calling the animation function to prevent a memory overload
        }
        requestAnimationFrame(downRamp);
    }
}

//Function to reset the position of the simulation and return everything to the normal position
function resetPosition() {
    //Turn off both active conditions to prevent any animation functions from triggering
    activeUp = false;
    activeDown = false;
    currentMass = 0; //Current mass becomes zero
    massLabel.innerHTML = currentMass.toFixed(2); //Update the label to show the new mass
    //Reset the coordinates of all components that don't change with either position
    currY = -58;
    weightPositionX = 20;

    linePositionX1 = 60;
    linePositionY1 = 70;
    linePositionX2 = 60;

    //Change the box and line position with either up or down position
    if (isUpOrDown) {
        currX = 400;
        linePositionY2 =  200;
    } else {
        currX = 120;
        linePositionY2 =  480;
    }
    changeButtonColor();

    //Draw the new reset simualtion position
    c.clearRect(0, 0, 700, 700);
    drawImage();
    drawRamp(currAngle);
    rectangle(currX, currY, currAngle);

    drawConnectingLine(currX, 45);
    drawCircle();

    drawWeight(weightPositionX, linePositionY2);
    drawLine(linePositionX1, linePositionY1, linePositionX2, linePositionY2);
    drawBase();
    document.getElementById('add_mass').value = '';
}

//Start a new trial
function newTrial() {
    criticalMass = genRand(99.5, 100.5, 1); //Generate a new critical mass
    resetPosition(); //Reset the position of the simulation
}

//Function to change the colours of the upwardStart and downwardStart buttons
function changeButtonColor () {
    if (isUpOrDown) {
        document.getElementById("submit_button1").className = 'btn btn-danger';
        document.getElementById("submit_button2").className = 'btn btn-success';
    } else {
        document.getElementById("submit_button1").className = 'btn btn-success';
        document.getElementById("submit_button2").className = 'btn btn-danger';
    }
}
