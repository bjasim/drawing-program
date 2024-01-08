# Simple Drawing Program README

## Project Description

In this project, I created a simple drawing program using p5.js. The program will allow users to draw polygons by placing vertices, set a pivot point for transformations, and perform basic transformations on the shapes. Users can interact with the program through a toolbar with various buttons and the drawing area.

## Application Layout

- The application fills the entire drawable area of the browser window.
- A 150-pixel-wide "toolbar" area is located on the left side of the browser window.
- A 10-pixel-wide border separates the toolbar and drawing areas.
- The background colors for the drawing area, toolbar, and border can be customized.

## Toolbar Features

The toolbar includes the following buttons with corresponding actions:

1. **Rotate CW 45 degrees**
   - Rotates all currently drawn vertices 45 degrees clockwise around the pivot point.
2. **Rotate CCW 45 degrees**
   - Rotates all currently drawn vertices 45 degrees counterclockwise around the pivot point.
3. **Move left, right, up, down by 10 pixels**
   - Four buttons (one for each direction) to translate all vertices by 10 pixels (excluding the pivot point).
4. **Scale up and scale down 5%**
   - Buttons to scale all vertices up by 5% (x 1.05) or down by 5% (x 0.95) relative to the pivot point.
5. **Clear the canvas**
   - Removes all vertices and resets the pivot point to the default location.
6. **Toggle pivot placement mode**
   - Changes the program's response to user clicks on the drawing board.
   - Provides a visual indication of the current mode.
   - Features images on each button to indicate their functions.

## Custom Button Class

- The program utilizes a custom button class to create buttons with images and click functionality.
- Images for buttons can be obtained from free assets (e.g., [Kenney.nl](https://kenney.nl/assets/game-icons)).
- The button class can detect when a button has been clicked.

## Drawing Board

- The drawing board area responds to clicks by either adding a vertex to the shape or setting the pivot point (depending on the mode).
- All vertices added by the user are displayed as red circles with a diameter of 6 pixels.
- Vertices are connected by blue lines (3 pixels wide) in the following ways:
   - If there is one vertex, only the vertex is drawn.
   - If there are two vertices, they are connected by a line.
   - If there are three or more vertices, they form a closed shape with lines connecting them.
- The shape is unfilled, and vertices are drawn on top of the lines.
- The current pivot point location is shown as a green circle with a diameter of 6 pixels.
- The pivot point is initially placed at the center of the drawing board area.

## Transformation Functions

- Custom transformation functions are implemented for this project, rather than using p5.js functions.
- Functions for matrix multiplication, translation, rotation, and scaling are provided.
- Pivot points are considered when applying rotations and scaling.

## Other Considerations

- The program does not include an "undo" feature for transformations.
- Vertices added after transformations do not consider previous transformations.
- Buttons can have any color but must include images and be visible against the toolbar background.
- The layout of buttons in the toolbar is flexible and can be arranged as desired.

## Usage

1. Clone or download this repository to your local machine.
2. Or open the link to preview it: https://bjasim.github.io/drawing-program/

