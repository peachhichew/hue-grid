var hg; // hue grid object
var huGd; // global array of HueGrids
var chromUpBnd;
var chrom;
var totalNumBits = 16;
var gen; // declare object for the Genetics class

function setup() {
    // Initial window size when we built it
    createCanvas(940, 640);
    background(0);
    colorMode(HSB);
    noStroke();  

    huGd = new Array(9);
    chromUpBnd = 2 ** totalNumBits;
    // gen = new Array(9); // not sure
    gen = new Genetics(totalNumBits, 9);
    // gen[i] = new Genetics(totalNumBits, 9); // not sure if like this
    // one stores chrom and the other stores fitness for the corres huegrid


    for (let i = 0; i < huGd.length; i++) {
        chrom = Math.floor(random(chromUpBnd));
    
        if (i < 3) {
            huGd[i] = new HueGrid((i * 300) + (i * 10) + 10, 10, 300, 200, chrom);
            console.log("hueGd[" + i + "]: x: " + huGd[i].xCoord + ", y: " + huGd[i].yCoord);
        }

        else if (i > 2 && i < 6) {
            huGd[i] = new HueGrid(((i - 3) * 300) + ((i - 3) * 10) + 10, 220, 300, 200, chrom);
            console.log("hueGd[" + i + "]: x: " + huGd[i].xCoord + ", y: " + huGd[i].yCoord);
        }

        else if (i > 5) {
            huGd[i] = new HueGrid(((i - 6) * 300) + ((i - 6) * 10) + 10, 430, 300, 200, chrom);
            console.log("hueGd[" + i + "]: x: " + huGd[i].xCoord + ", y: " + huGd[i].yCoord);
        }
    }
}

function draw() {
    for (let j = 0; j < huGd.length; j++) {
        huGd[j].display();
    }
}

function keyTyped() {
    if (key == 'r') {
        // reset upper left corner of the canvas
        huGd[0].reset(gen.generateChrom());
    }

    else if (key == 'm') {
        // mutate and reset the HueGrid in the upper left corner of the canvas
        huGd[0].reset(gen.mutation(huGd[0].chrom));
    }

    else if (key == 'c') {
        // cross + reset huGd[0] with the last grid
        // double check to see if it's working
        huGd[0].reset(gen.crossover(huGd[0].chrom, huGd[8].chrom));
    }
}