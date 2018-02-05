/* HueGrid class
  Contains the display() and reset() methods
 */

function HueGrid(x, y, w, h, chrom) {
  this.xCoord = x;
  this.yCoord = y;
  this.shapeW = w;
  this.shapeH = h;
  // this.newChrom = chrom;

  this.hueVal;       // Declare variable for 2D array of hue values
  // this.maxDev = 5;   // Maximum value for the hue deviations
  this.maxHue = 360;
  
  // CELL ATTRIBUTES
  this.cellSize; // size of the cells
  this.maxDev; // max value for hue deviations
  this.sat; // saturation
  this.initMeth; // initialzation method
  this.shape; // cell shape (circle or rectangle)

  // declare var for number of rows + chromosomes
  this.nRows;
  this.nCols;
  
  // 2D array is an array of arrays.
  // Length of the array is length of outer dimension (left subscript).
  // Length of each element of the array is length of the inner dimension
  // (second subscript) because each element of the array is an array.
  this.hueVal;

  // resets the cell attributes based on the chromosome that is being passed in 
  this.reset = function(c) {
    this.chrom = c;
    this.cellSize = ((this.chrom) & 7) + 3; // 3 bits
    this.maxDev = ((this.chrom >>> 3) & 15) + 3; // 4 bits
    this.sat = ((this.chrom >>> 7) & 63) + 37; // 6 bits
    // this.roll = ((this.chrom >>> 3) & 7) + 3;
    this.initMeth = ((this.chrom >>> 13) & 3); // 2 bits
    this.shape = ((this.chrom >>> 15) & 1); // 1 bit

    // declares the number of rows and columns in the array
    this.nRows = Math.floor(this.shapeW / this.cellSize);
    this.nCols = Math.floor(this.shapeH / this.cellSize);

    this.hueVal = Array(this.nRows);

    // Allocate storage for inner dimension and assign random values to each cell in the 2D array
    for (let r = 0; r < this.nRows; r++) {
      this.hueVal[r] = Array(this.nCols);         // First Allocate this row

      for (let c = 0; c < this.nCols; c++) {
        // Initialization method
        if (this.initMeth == 0) {
          this.hueVal[r][c] = r * c; 
        }

        else if (this.initMeth == 1) {
          this.hueVal[r][c] = (r + c) * 10; 
        }

        else if (this.initMeth == 2) {
          this.hueVal[r][c] = random(this.maxHue); 
        }

        else if (this.initMeth == 3) {
          this.hueVal[r][c] = ((r + c) + 10) * 10; 
        }
      }
    }
  }

  // call reset after its been defined as a part of the "constructor"
  this.reset(chrom);

  this.display = function() {
      push();
      translate(this.xCoord, this.yCoord);
      for (let r = 0; r < this.hueVal.length; r++) {
        // All elements of hueVal (hueVal[i]) have the same length
        for (let c = 0; c < this.hueVal[r].length; c++) {
          // The old tweak-the-hue-and-wrap-around-the-wheel trick
          this.hueVal[r][c] = this.hueVal[r][c] + random(-this.maxDev, this.maxDev);
          if (this.hueVal[r][c] > this.maxHue) {
            this.hueVal[r][c] = this.hueVal[r][c] - this.maxHue;
          }
          else if (this.hueVal[r][c] < 0) {
            this.hueVal[r][c] += this.maxHue;
          }
            
          fill(this.hueVal[r][c], this.sat, 100);   //color, saturation, and brightness
          // Scale row, column to window location by multiplying by cellSize
          if (this.shape == 0) {
              ellipseMode(CORNER);
              ellipse(r * this.cellSize, c * this.cellSize, this.cellSize, this.cellSize);
          }

          else {
              rect(r * this.cellSize , c * this.cellSize, this.cellSize, this.cellSize);
          }
        }
      }
      pop();
  }
}


