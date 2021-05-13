/***********************************************************************************
  by Beidi Han

***********************************************************************************/

// adventure manager global  
var adventureManager;

// p5.play
var playerSprite;
var playerAnimation;

// Clickables: the manager class
var clickablesManager;    // the manager class
var clickables;           // an array of clickable objects


// indexes into the clickable array (constants) 
const cl_Offline = 0;
const cl_Online = 1;
const cl_Consumer = 2;
const cl_Salesman = 3;
const cl_Hacker = 4;
const cl_Offline1 = 5;
const cl_Offline2 = 6;
const cl_Online1 = 7;
const cl_Online2 = 8;
const cl_Salesman1 = 9;
const cl_Salesman2 = 10;
const cl_Consumer1 = 11;
const cl_Consumer2 = 12;
const cl_Hacker1 = 13;
const cl_Hacker2 = 14;
const cl_Offline11 = 15;
const cl_Offline12 = 16;



// anger emojis
var angerImage;   // anger emoji
var maxAnger = 4;

// character arrays
var characterImages = [];   // array of character images, keep global for future expansion
var characters = [];        // array of charactes

// characters
const offline = 0;
const online = 1;
const salesman = 2;
const consumer = 3;
const hacker = 4;

// room indices - look at adventureManager
const Splash = 0;
const Instructions = 1;
const Characters = 2;
const Start = 3;
const Offline = 4;
const Offline1 = 5;
const Offline2 = 6;
const Online = 7;
const Online1 = 8;
const Online2 = 9;
const Salesman = 10;
const Salesman1 = 11;
const Salesman2 = 12;
const Consumer = 13;
const Consumer1 = 14;
const Consumer2 = 15;
const Hacker = 16;
const Hacker1 = 17;
const Hacker2 = 18;
const Ending1 = 19;
const Ending2 = 20;
const Ending3 = 21;
const Ending4 = 22;
const Ending5 = 23;

let headlineFont;
let bodyFont;


// Allocate Adventure Manager with states table and interaction tables
function preload() {

  headlineFont = loadFont('fonts/FogCityGothic-Wide.otf');
  bodyFont = loadFont('fonts/FogCityGothic-Regular.otf');

  // load all images
  anger = loadImage("assets/anger.png");

  allocateCharacters();

  clickablesManager = new ClickableManager('data/clickableLayout.csv');
  adventureManager = new AdventureManager('data/adventureStates.csv', 'data/interactionTable.csv', 'data/clickableLayout.csv');
}

// Setup the adventure manager
function setup() {
  createCanvas(1280, 720);

  // setup the clickables = this will allocate the array
  clickables = clickablesManager.setup();

  // this is optional but will manage turning visibility of buttons on/off
  // based on the state name in the clickableLayout
  adventureManager.setClickableManager(clickablesManager);

  // This will load the images, go through state and interation tables, etc
  adventureManager.setup();


  // call OUR function to setup additional information about the p5.clickables
  // that are not in the array 
  setupClickables(); 

  fs = fullscreen();
}

// Adventure manager handles it all!
function draw() {
  // draws background rooms and handles movement from one to another
  adventureManager.draw();

// don't draw them on first few screens
  if( adventureManager.getStateName() === "Splash" ||
      adventureManager.getStateName() === "Instructions" ||
      adventureManager.getStateName() === "Characters" ||
      adventureManager.getStateName() === "Ending1" ||
      adventureManager.getStateName() === "Ending2" ||
      adventureManager.getStateName() === "Ending3" ||
      adventureManager.getStateName() === "Ending4" ||
      adventureManager.getStateName() === "Ending5" ) {
    ;
  }
  else {
    drawCharacters();
  }
  
  // draw the p5.clickables, in front of the mazes but behind the sprites 
  clickablesManager.draw();
}


// pass to adventure manager, this do the draw / undraw events
function keyPressed() {
  // toggle fullscreen mode
  if( key === 'f') {
    fs = fullscreen();
    fullscreen(!fs);
    return;
  }

  // dispatch all keys to adventure manager
  adventureManager.keyPressed(key); 
}

function mouseReleased() {
  // dispatch all mouse events to adventure manager
  adventureManager.mouseReleased();
}

function drawCharacters() {
 for( let i = 0; i < characters.length; i++ ) {
    characters[i].draw();
  }
}

//-------------- CLICKABLE CODE  ---------------//

function setupClickables() {
  // All clickables to have same effects
  for( let i = 0; i < clickables.length; i++ ) {
    clickables[i].onHover = clickableButtonHover;
    clickables[i].onOutside = clickableButtonOnOutside;    
  }

  
  clickables[0].onPress = clickableButtonPressed;
  clickables[1].onPress = clickableButtonPressed;
  clickables[2].onPress = clickableButtonPressed;
  clickables[3].onPress = clickableButtonPressed;
  clickables[4].onPress = clickableButtonPressed;
  

  //add the characters
  clickables[5].onPress = OF_C1;
  clickables[6].onPress = OF_C2;
  clickables[7].onPress = ON_C1;
  clickables[8].onPress = ON_C2;
  clickables[9].onPress = SM_C1;
  clickables[10].onPress = SM_C2;
  clickables[11].onPress = CS_C1;
  clickables[12].onPress = CS_C2;
  clickables[13].onPress = HK_C1;
  clickables[14].onPress = HK_C2;

  //No need to add the anger
  clickables[15].onPress = clickableButtonPressed;
  clickables[16].onPress = clickableButtonPressed;
  clickables[17].onPress = clickableButtonPressed;
  clickables[18].onPress = clickableButtonPressed;
  clickables[19].onPress = clickableButtonPressed;
  clickables[20].onPress = clickableButtonPressed;
  clickables[21].onPress = clickableButtonPressed;
  clickables[22].onPress = clickableButtonPressed;
  clickables[23].onPress = clickableButtonPressed;
  clickables[24].onPress = clickableButtonPressed;

  //Ending
  clickables[25].onPress = clickableButtonPressed;
  clickables[26].onPress = clickableButtonPressed;
  clickables[27].onPress = clickableButtonPressed;
  clickables[28].onPress = clickableButtonPressed;
  clickables[29].onPress = clickableButtonPressed;
}

// tint when mouse is over
clickableButtonHover = function () {
  this.color = "#F4E8F5";
  this.noTint = true;
  this.tint = "#C8C8C8";
}

// color a light gray if off
clickableButtonOnOutside = function () {
  // backto our gray color
  this.color = (255, 255, 255);
  this.textWeight = 20;
  this.textSize = 25;
}

clickableButtonPressed = function() {
  adventureManager.clickablePressed(this.name);
} 


// -----------------Different Choice -----------------//

OF_C1 = function() { 
  characters[salesman].addAnger(2);
  adventureManager.clickablePressed(this.name);
}

OF_C2 = function() { 
  characters[consumer].addAnger(2);
  characters[online].subAnger(1);
  adventureManager.clickablePressed(this.name);
}

ON_C1 = function() {
  characters[offline].addAnger(2);
  characters[hacker].subAnger(1);
  adventureManager.clickablePressed(this.name);
}


ON_C2 = function() {
  characters[offline].addAnger(1);
  characters[consumer].subAnger(2);
  adventureManager.clickablePressed(this.name);
}
SM_C1 = function() {
  characters[hacker].addAnger(2);
  characters[offline].subAnger(1);
  adventureManager.clickablePressed(this.name);
}

SM_C2 = function() {
  characters[hacker].subAnger(2);
  characters[offline].addAnger(2);
  adventureManager.clickablePressed(this.name);
}
CS_C1 = function() {
  characters[offline].subAnger(1);
  characters[online].addAnger(1);
  adventureManager.clickablePressed(this.name);
}
CS_C2 = function() {
  characters[online].subAnger(1);
  characters[offline].addAnger(1);
  adventureManager.clickablePressed(this.name);
}

HK_C1 = function() {
  characters[offline].subAnger(1);
  characters[consumer].subAnger(1);
  characters[online].addAnger(2);
  adventureManager.clickablePressed(this.name);
}
HK_C2 = function() {
  characters[offline].addAnger(2);
  characters[consumer].addAnger(2);
  characters[offline].subAnger(1);
  adventureManager.clickablePressed(this.name);
}



//-- specific button callbacks: these will add or subtrack anger, then
//-- pass the clickable pressed to the adventure manager, which changes the
//-- state. A more elegant solution would be to use a table for all of these values

function allocateCharacters() {
  // load the images first
  characterImages[offline] = loadImage("assets/offline00.png");
  characterImages[online] = loadImage("assets/online00.png");
  characterImages[salesman] = loadImage("assets/salesman00.png");
  characterImages[consumer] = loadImage("assets/consumer00.png");
  characterImages[hacker] = loadImage("assets/hacker00.png");

  for( let i = 0; i < characterImages.length; i++ ) {
    characters[i] = new Character();
    characters[i].setup(characterImages[i], 50 + (i*250), 45);
  }

  // default anger is zero, set up some anger values
  characters[online].addAnger(2);
  characters[salesman].addAnger(1); // test
}

class Character {
  constructor() {
    this.image = null;
    this.x = width/2;
    this.y = width/2;
  }

  setup(img, x, y) {
    this.image = img;
    this.x = x;
    this.y = y;
    this.anger = 0;
  }

  draw() {
    if( this.image ) {
      push();
      // draw the character icon
      imageMode(CENTER);
      image( this.image, this.x, this.y, 55, 60 );

      // draw anger emojis
      for( let i = 0; i < this.anger; i++ ) {
        image(anger, this.x + 70 + (i*40), this.y +10 );
      }

      pop();
    }
  }

  getAnger() {
    return this.anger;
  }

  // add, check for max overflow
  addAnger(amt) {
    this.anger += amt;
    if( this.anger > maxAnger ) {
      this.anger = maxAnger;
    }

  }

  // sub, check for below zero
  subAnger(amt) {
    this.anger -= amt;
    if( this.anger < 0 ) {
      this.anger = 0;
    }
  }
}
//-------------- SUBCLASSES / YOUR DRAW CODE CAN GO HERE ---------------//

// Instructions screen has a backgrounnd image, loaded from the adventureStates table
// It is sublcassed from PNGRoom, which means all the loading, unloading and drawing of that
// class can be used. We call super() to call the super class's function as needed
class ScenarioRoom extends PNGRoom {
  // Constructor gets calle with the new keyword, when upon constructor for the adventure manager in preload()
   draw() {
    super.draw();

   // drawSprite(logoSprite2);
  }
}

