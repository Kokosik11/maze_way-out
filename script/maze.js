class Maze {
    isWin = false;
    checkpoints = [];
    steps = [];

    findPosition = mark => {
        for(let i = 0; i < this.field.length; i++)
            for(let k = 0; k < this.field[0].length; k++)
                if(this.field[i][k] === mark) return [i,k];
    }

    findWay = pos => {
        let ways = [];
        
        if(this.field[pos[0]+1][pos[1]] === '+') ways.push([pos[0] + 1, pos[1], "bottom"]);
        if(this.field[pos[0]-1][pos[1]] === '+') ways.push([pos[0] - 1, pos[1], "top"]);
        if(this.field[pos[0]][pos[1]+1] === '+') ways.push([pos[0], pos[1] + 1, "right"]);
        if(this.field[pos[0]][pos[1]-1] === '+') ways.push([pos[0], pos[1] - 1, "left"]);
    
        return ways;
    }

    nextStep = pos => {
        this.steps = [];
        while(pos) {
            this.field[pos[0]][pos[1]] = '-';

            if(this.findWay(pos).length > 1) {
                let stepsToCheckpoint = this.steps.slice(0);
                this.field[pos[0]][pos[1]] = '*';
                this.checkpoints.push([pos[0], pos[1], stepsToCheckpoint]);
            }

            if(pos[0] === 0 || pos[0] === this.field.length - 1 || 
               pos[1] === 0 || pos[1] === this.field[0].length - 1) this.isWin = true;
                        
            this.steps.push(pos[2]);
            pos = this.findWay(pos)[0];
        }

    }

    constructor(field) {
        this.field = field;
        let startPos = this.findPosition('0');

        if(this.findWay(startPos) == false) throw Error("No way from starting point");

        while(!this.isWin) {
            if(this.findWay(this.findPosition('0')).length >= 1)
                this.nextStep(this.findWay(this.findPosition('0'))[0]);
            else
                this.checkpoints.forEach(chkp => {
                    this.field[chkp[0]][chkp[1]] = '+';
                    chkp[2].forEach(c => {
                        this.field[c[0]][c[1]] = '+';
                    })
                })

        }
        console.log(this.field);
        console.log(this.steps);
        
    }
}

let field = [
    ['#','#','#','#','#','#','#','#','#'],
    ['#','+','+','+','#','+','+','+','#'],
    ['#','+','#','+','#','+','#','+','#'],
    ['+','+','#','+','0','+','#','+','#'],
    ['#','#','#','+','#','#','#','#','#'],
    ['#','#','+','+','#','#','#','#','#'],
    ['#','#','+','#','#','#','#','#','#'],
    ['#','#','#','#','#','#','#','#','#'],
];

const maze = new Maze(field);