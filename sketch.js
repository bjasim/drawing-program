/* 
* Filename: a2
* Project: Assignment 2 SENG3040
* Author: Bakr Jasim
* Date: Oct 20, 2023
* Description: THis is the second assignment of the SENG3040 course, which we have to draw vertices and pivot points and then rotate them and translate them, etc.
*/

//Name: Vertex
//Purpose: This is the vertex class
class Vertex {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  /*
  * Function: display
  * Description: This function will set the properties for the vertex display
  * Parameter: no parameter
  */
  display() {
    fill(255, 0, 0); // Set the fill color to red (255, 0, 0)
    noFill();
    ellipse(this.x, this.y, 6, 6);
  }
}

//Name: Button
//Purpose: THis is the button class for the tool bar buttons
class Button {
  constructor(label, x, y, onClick, img) {
    this.label = label;
    this.x = x;
    this.y = y;
    this.onClick = onClick;
    this.width = 120;
    this.height = 20;
    this.img = img;
  }

  /*
  * Function: display
  * Description: This function will set the properties for the button display
  * Parameter: no parameter
  */
  display() {
        fill(this.isToggled ? 'red' : 'grey');
        stroke(100);
        rectMode(CENTER);
        rect(this.x, this.y, this.width, this.height + 10);
        textAlign(CENTER, CENTER);
        textSize(16);
        fill(0);
        noStroke();
        text(this.label, this.x, this.y);
        image(this.img, this.x + this.width / 4, this.y - this.height / 1.25, 30, 30);
  }

  /*
  * Function: display
  * Description: This function will set logic for the button clicking
  * Parameter: no parameter
  */
  isClicked() {
    let withinX = mouseX >= this.x - this.width / 2 && mouseX <= this.x + this.width / 2;
    let withinY = mouseY >= this.y - this.height / 2 && mouseY <= this.y + this.height / 2;
    
    if (withinX && withinY) {
      if (mouseIsPressed) {
        if (!this.isAlreadyClicked) {
          this.isAlreadyClicked = true;
          return true;
        }
      } else {
        this.isAlreadyClicked = false;
      }
    } else {
      this.isAlreadyClicked = false;
    }
    return false;
  }
}


// Constants ------------------------------------------------------------------------------------------------------
let shape = []; // is the shape array
let drawingAreaWidth, drawingAreaHeight;
let ToolBarWidth = 150; //tool bar width
let vertices = []; // Array to store the vertices
let _btn_rotate_cw; // Rotate CW 45 degrees
let _btn_rotate_ccw; // Rotate CCW 45 degrees
let _btn_move_up; // Move by 10 pixels up
let _btn_move_down; // Move by 10 pixels down
let _btn_move_left; // Move by 10 pixels left
let _btn_move_right; // Move by 10 pixels down
let _btn_scale_up; // Scale by 5 pixels
let _btn_scale_down; // Scale by 5 pixels
let _btn_clear; // Clear the canvas
let _btn_toggle; // Toggle the pivot placement mode
let _img_rotate_cw = 'assets/img_CW_45_deg.png'; // Rotate CW 45 degrees
let _img_rotate_ccw = 'assets/img_CCW_45_deg.png'; // Rotate CCW 45 degrees
let _img_move_up = 'assets/DPAD_up.png'; // Move by 10 pixels up
let _img_move_down = 'assets/DPAD_down.png'; // Move by 10 pixels down
let _img_move_left = 'assets/DPAD_left.png'; // Move by 10 pixels left
let _img_move_right = 'assets/DPAD_right.png'; // Move by 10 pixels down
let _img_scale_up = 'assets/upload.png'; // Scale by 5 pixels
let _img_scale_down = 'assets/download.png'; // Scale by 5 pixels
let _img_clear = 'assets/toolEraser.png'; // Clear the canvas
let _img_toggle = 'assets/flag.png'; // Toggle the pivot placement mode
let isPivotMode; // A boolean variable to keep track of pivot placement mode
let toggleButton; // Reference to the toggle button element

/*
* Function: preload
* Description: This function loads the resources for this project (image)
* Parameter: no parameter
*/
function preload() {
  //load the image
  _img_rotate_cw = loadImage(_img_rotate_cw);
  _img_rotate_ccw = loadImage(_img_rotate_ccw);
  _img_move_up = loadImage(_img_move_up); // Move by 10 pixels up
  _img_move_down = loadImage(_img_move_down); // Move by 10 pixels down
  _img_move_left = loadImage(_img_move_left); // Move by 10 pixels left
  _img_move_right = loadImage(_img_move_right); // Move by 10 pixels down
  _img_scale_up = loadImage(_img_scale_up); // Scale by 5 pixels
  _img_scale_down = loadImage(_img_scale_down); // Scale by 5 pixels
  _img_clear = loadImage(_img_clear); // Clear the canvas
  _img_toggle = loadImage(_img_toggle);
}

/*
* Function: drawToolBar
* Description: This function will draw the section for the tool bar
* Parameter: no parameter
*/
function drawToolBar() {
  fill(240);
  stroke(200);
  rect(0, 0, ToolBarWidth, height);
}

/*
* Function: drawToolBorder
* Description: This will draw the border for the tool border
* Parameter: no parameter
*/
function drawToolBorder() {
  stroke(200);
  strokeWeight(10);
  line(150, 0, 150, height);
}

/*
* Function: addVertex
* Description: This function will add the vertex on the drawing board based on x nd y
* Parameter: no parameter
*/
function addVertex(x, y) {

  let v = new Vertex(x, y);
  if(x > 150)
  {
      vertices.push(v);
  }
}

/*
* Function: drawShape
* Description: This function will draw the shape on the drawing board
* Parameter: no parameter
*/
function drawShape() {
  strokeWeight(3);
  stroke(0, 0, 255);
  // noFill();

  if (vertices.length === 1) {

    vertices[0].display();
  } else if (vertices.length === 2) {

    line(vertices[0].x, vertices[0].y, vertices[1].x, vertices[1].y);
    vertices[0].display();
    vertices[1].display();
  } else if (vertices.length >= 3) {

    beginShape();
    for (let i = 0; i < vertices.length; i++) {
      vertex(vertices[i].x, vertices[i].y);
      vertices[i].display();
    }
    endShape(CLOSE);
  }
}

/*
* Function: drawPivot
* Description: This will draw the pivot point on the screen
* Parameter: no parameter
*/
function drawPivot() {
  // fill(0, 255, 0);
  // noFill();
  ellipse(width / 2 + 77.5, height / 2, 6, 6);
}

/*
* Function: mouseClicked
* Description: this check if the mouse is clicked and will draw the pivot
* Parameter: no parameter
*/
function mouseClicked() {
  if (mouseX > 160 && mouseX < width && mouseY > 0 && mouseY < height) {
    addVertex(mouseX, mouseY);
  } else {
    // Set pivot point
    pivot.x = mouseX;
    pivot.y = mouseY;
  }

}

/*
* Function: setup
* Description: This function gets called first, we can use this to do the
* configuration we want for the project such as the height and the width of the canvas
* Parameter: no parameter
*/
function setup() {
  createCanvas(windowWidth, windowHeight);
  isPivotMode = true;
  _btn_rotate_cw = new Button(
    "Rotate CW      ",
    ToolBarWidth / 2,
    height / 10,
    rotate_cw_45_deg,
    _img_rotate_cw
  );

  _btn_rotate_ccw = new Button(
    "Rotate CCW    ",
    ToolBarWidth / 2,
    (height / 10) + (height / 11),
    rotate_ccw_45_deg,
    _img_rotate_ccw
    );

  _btn_move_up = new Button(
    "Move Up         ",
    ToolBarWidth / 2,
    (height / 10) + (height / 11) * 2,
    move_up,
    _img_move_up
  );

  _btn_move_down = new Button(
    "Move Down     ",
    ToolBarWidth / 2,
    (height / 10) + (height / 11) * 3,
    move_down,
    _img_move_down
  );

  _btn_move_left = new Button(
    "Move Left        ",
    ToolBarWidth / 2,
    (height / 10) + (height / 11) * 4,
    move_left,
    _img_move_left
  );

  _btn_move_right = new Button(
    "Move Right      ",
    ToolBarWidth / 2,
    (height / 10) + (height / 11) * 5,
    move_right,
    _img_move_right
  );

  _btn_scale_up = new Button(
    "Scale up    ",
    ToolBarWidth / 2,
    (height / 10) + (height / 11) * 6,
    scale_up,
    _img_scale_up
  );

  _btn_scale_down = new Button(
    "Scale down    ",
    ToolBarWidth / 2,
    (height / 10) + (height / 11) * 7,
    scale_down,
    _img_scale_down
  );

  _btn_clear = new Button(
    "Clear Canvas    ",
    ToolBarWidth / 2,
    (height / 10) + (height / 11) * 8,
    clear_canvas,
    _img_clear
  );

  _btn_toggle = new Button(
    "Toggle    ",
    ToolBarWidth / 2,
    (height / 10) + (height / 11) * 9,
    toggle,
    _img_toggle
  );

  isPivotMode = true;

  background(220);

  drawToolBar();
  drawToolBorder();
  pivot = new Vertex(width / 2, height / 2);
}

/*
* Function: draw
* Description: This is where we can add the drawing for our program, or in our case will call all the
* other function to create the shapes and the drawings, its like the "main" function.
* Parameter: no parameter
*/
function draw() {
  // Display the buttons
  _btn_rotate_cw.display();
  _btn_rotate_ccw.display();
  _btn_move_up.display();
  _btn_move_down.display();
  _btn_move_left.display();
  _btn_move_right.display();
  _btn_scale_up.display();
  _btn_scale_down.display();
  _btn_clear.display();
  _btn_toggle.display();

  // image(img_new, height / 2, width / 2)
  drawShape();
  drawPivot();  

  if (!isPivotMode) {
    // You are in Drawing Mode
    // Allow drawing functionality, such as adding vertices and drawing shapes
    if (mouseIsPressed) {
      // Add a vertex when the mouse is pressed
      addVertex(mouseX, mouseY);
    }
    

    // Drawing logic: Connect the vertices to draw shapes (lines, polygons, etc.)
    stroke(0, 0, 255); // Set stroke color
    strokeWeight(3); // Set stroke thickness
    noFill(); // No fill for shapes

    if (vertices.length >= 2) {
      beginShape();
      for (let i = 0; i < vertices.length; i++) {
        vertex(vertices[i].x, vertices[i].y);
      }
      endShape();
    }
  }

  // Handle button clicks
  if (_btn_rotate_cw.isClicked()) {
    _btn_rotate_cw.onClick();
  } else if (_btn_rotate_ccw.isClicked()) {
    _btn_rotate_ccw.onClick();
  } else if (_btn_move_up.isClicked()) {
    _btn_move_up.onClick();
  } else if (_btn_move_down.isClicked()) {
    _btn_move_down.onClick();
  } else if (_btn_move_left.isClicked()) {
    _btn_move_left.onClick();
  } else if (_btn_move_right.isClicked()) {
    _btn_move_right.onClick();
  } else if (_btn_scale_up.isClicked()) {
    _btn_scale_up.onClick();
  }    else if (_btn_scale_down.isClicked()) {
    _btn_scale_down.onClick();
  }else if (_btn_clear.isClicked()) {
    _btn_clear.onClick();
  } else if (_btn_toggle.isClicked()) {
    _btn_toggle.onClick();
  }
}

/*
* Function: rotateVertices
* Description: This function rotates the vertices on the board after they've been drawn
* Parameter: no parameter
*/
function rotateVertices(pivotX, pivotY, angle) {
  for (let i = 0; i < vertices.length; i++) {
    let vertex = vertices[i];

    // Translate to origin based on the pivot point
    let dx = vertex.x - pivotX;
    let dy = vertex.y - pivotY;

    // Rotate the point around the origin
    let rotatedX = dx * cos(angle) - dy * sin(angle);
    let rotatedY = dx * sin(angle) + dy * cos(angle);

    // Translate the point back based on the pivot point
    vertex.x = rotatedX + pivotX;
    vertex.y = rotatedY + pivotY;
  }
}

/*
* Function: rotate_cw_45_deg
* Description: This function will rotate clockwise
* Parameter: no parameter
*/
function rotate_cw_45_deg() {
  const angle = PI / 4; // -45 degrees in radians
  const pivotX = width / 2 + 77.5;
  const pivotY = height / 2;

  rotateVertices(pivotX, pivotY, angle);
  // background(220);
  if (!isPivotMode) {
    background(0);
    drawToolBorder();  
  } else {
    background(220);
    drawToolBorder();
  }

  drawToolBorder();
}

/*
* Function: rotate_ccw_45_deg
* Description: This function will rotate the vertices counter clockwise
* Parameter: no parameter
*/
function rotate_ccw_45_deg() {
  const angle = -PI / 4; // -45 degrees in radians
  const pivotX = width / 2 + 77.5;
  const pivotY = height / 2;
  rotateVertices(pivotX, pivotY, angle);
  // background(220);
  if (!isPivotMode) {
    background(0);
    drawToolBorder();  
  } else {
    background(220);
    drawToolBorder();
  }

  drawToolBorder();
  drawShape();
}

/*
* Function: move_up
* Description: This will move the vertices up by 10 pixels
* Parameter: no parameter
*/
function move_up() {
  for (let i = 0; i < vertices.length; i++) {
    vertices[i].y -= 10;
  }
  if (!isPivotMode) {
    background(0);
    drawToolBorder();  
  } else {
    background(220);
    drawToolBorder();
  }
}

/*
* Function: move_down
* Description: This function will move the vertices down by 10 pixels
* Parameter: no parameter
*/
function move_down() {
  for (let i = 0; i < vertices.length; i++) {
    vertices[i].y += 10;
  }
  if (!isPivotMode) {
    background(0);
    drawToolBorder();  
  } else {
    background(220);
    drawToolBorder();
  }
}

/*
* Function: move_left
* Description: This function will move the vertices left by 10 pixels
* Parameter: no parameter
*/
function move_left() {
    for (let i = 0; i < vertices.length; i++) {
      vertices[i].x -= 10;
    }
    if (!isPivotMode) {
      background(0);
      drawToolBorder();  
    } else {
      background(220);
      drawToolBorder();
    }
    }

/*
* Function: move_right
* Description: This function will move the vertices right by 10 pixles
* Parameter: no parameter
*/

function move_right() {
  for (let i = 0; i < vertices.length; i++) {
    vertices[i].x += 10;
  }
  if (!isPivotMode) {
    background(0);
    drawToolBorder();  
  } else {
    background(220);
    drawToolBorder();
  }
}

/*
* Function: scale_up
* Description: This will scale up the vertices by 5%
* Parameter: no parameter
*/
function scale_up() {
  // Get the pivot point coordinates
  let pivotX = pivot.x;
  let pivotY = pivot.y;

  // Loop through all vertices and scale them up by a factor of 1.05
  for (let i = 0; i < vertices.length; i++) {
    let vertex = vertices[i];

    // Calculate the distance from the pivot point to the current vertex
    let dx = vertex.x - pivotX;
    let dy = vertex.y - pivotY;

    // Calculate new position after scaling
    let newX = pivotX + dx * 1.05;
    let newY = pivotY + dy * 1.05;

    // Update the vertex position
    vertex.x = newX;
    vertex.y = newY;
  }
  if (!isPivotMode) {
    background(0);
    drawToolBorder();  
  } else {
    background(220);
    drawToolBorder();
  }

}

/*
* Function: scale_down
* Description: This will scale down the vertices by 5%
* Parameter: no parameter
*/
function scale_down() {
  // Get the pivot point coordinates
  let pivotX = pivot.x;
  let pivotY = pivot.y;

  // Loop through all vertices and scale them down by a factor of 0.95
  for (let i = 0; i < vertices.length; i++) {
    let vertex = vertices[i];

    // Calculate the distance from the pivot point to the current vertex
    let dx = vertex.x - pivotX;
    let dy = vertex.y - pivotY;

    // Calculate new position after scaling
    let newX = pivotX + dx * 0.95;
    let newY = pivotY + dy * 0.95;

    // Update the vertex position
    vertex.x = newX;
    vertex.y = newY;
  }
  if (!isPivotMode) {
    background(0);
    drawToolBorder();  
  } else {
    background(220);
    drawToolBorder();
  }
}

/*
* Function: clear_canvas
* Description: This will clear the canvas
* Parameter: no parameter
*/  
function clear_canvas() {
  clear(); // Clears the canvas
  drawToolBorder();

  if(isPivotMode)
  {
    background(220);
    drawToolBorder();  
  }
  else
  {
    background(0);
    drawToolBorder();  
  }
  vertices = []; // Array to store the vertices
}

/*
* Function: toggle
* Description: This will change mode between pivot placement mode and the drawing mode
* Parameter: no parameter
*/
function toggle() {
  preventVertexAddition = true; // Prevent vertex addition during button click

  isPivotMode = !isPivotMode; // Toggle the isPivotMode variable

  if (!isPivotMode) {
    background(0);
    drawToolBorder();  
  } else {
    background(220);
    drawToolBorder();
  }

  if (isPivotMode) {
    // You are in Drawing Mode
    // Allow drawing functionality, such as adding vertices and drawing shapes
    if (mouseIsPressed) {
      // Add a vertex when the mouse is pressed
      addVertex(mouseX, mouseY);
    }
      // Use setTimeout to reset the flag after 500 milliseconds (adjust the delay if needed)
  setTimeout(function () {
    preventVertexAddition = false;
  }, 500);
  }
}