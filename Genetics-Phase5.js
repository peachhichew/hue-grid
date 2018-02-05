function Genetics(numBits, pop) {
    // total number of bits for the chromosome/length
    this.numberOfBits = numBits;

    // population size, which is 9 (number of HueGrids)
    this.popSize = pop;
    // array to hold the chromosomes
    this.chroms = [];
    // array to hold the fitness values
    this.fitVals = [];
    this.chromLength;

    // creates entirely new chromosome from scratch
    this.generateChrom = function() {
        this.chromLength = numBits;
        this.chromVals = Math.floor(random(2 ** this.chromLength));

        return this.chromVals;
    }

    this.mutation = function(chromToMut) {
        // choose a random chromosome to flip
        let mutPoint = Math.floor(random(this.numberOfBits));
        // create a "mask" or the mutation
        let mutMask = 2 ** mutPoint;
        // do an XOR between the chromosome and mask to mutate
        let mutChrom = mutMask ^ chromToMut;

        return mutChrom;
    }

    this.crossover = function(parent1, parent2) {
        // randomly generate a crossover point which could range from 1 to the chromLength - 1
        let crossPoint = Math.floor(random(1, this.chromLength - 1));

        // get bits to the left of that point from one parent and the buts to the 
        // right from the other parent
        // from parent 1
        let p1Bits = (parent1 >>> crossPoint) << crossPoint;

        // from parent 2
        let right = (2 ** crossPoint) - 1;

        // the mask for the right variable
        let p2Bits = right & parent2;

        // OR the two contributions together to yield a new chromosome
        let newChild = p1Bits | p2Bits;

        // return the newly bred child chromosome
        return newChild;
    }
}