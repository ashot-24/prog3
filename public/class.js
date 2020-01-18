//խոտի կլասը
class Grass {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        // this.energy = 5;
        this.multiply = 0; //բազմացման գործակից
        this.directions = [];

    }
    //շրջապատի հետազոտության մատրիցը
    newDirections() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    //հետազոտում է շրջապատը, որոնում է հետաքրքրող կերպարներին
    //կերպարը որոշվում է t արգումենտով
    getDirections(t) {
        this.newDirections();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == t) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    //mul() Բազմացում
    mul() {
        this.multiply++;
        if (this.multiply == 5) {
            //Հետազոտում է շրջապատը, որոնում դատարկ տարածքներ
            var fundCords = this.getDirections(0);
            var cord = random(fundCords);
            if (cord) {
                var x = cord[0];
                var y = cord[1];

                //Ավելացնում է նոր խոտ խոտերի զանգվածում
                var norXot = new Grass(x, y);
                grassArr.push(norXot);

                //Ավելացնում է նոր խոտի մասին գրառում հիմնական matrix-ում 
                matrix[y][x] = 1;
                this.multiply = 0;
            }
        }
    }

}

//խոտակերի կլասը
class Eatgrass {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.energy = 3;
        this.directions = [];
    }

    //շրջապատի հետազոտության մատրիցը
    newDirections() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    //հետազոտում է շրջապատը, որոնում է հետաքրքրող կերպարներին
    //կերպարը որոշվում է t արգումենտով
    getDirections(t) {
        this.newDirections();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == t) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }



    //move() շարժվել
    move() {
        //որոնում է դատարկ տարածքներ
        var fundCords = this.getDirections(0);
        var cord = random(fundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            //կատարում է տեղափոխություն հիմնական matrix-ում 
            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;

            //թարմացնում է սեփական կորդինատները
            this.x = x;
            this.y = y;
        }
    }


    //eat()-ուտել
    eat() {
        //հետազոտում է շրջակայքը, որոնում է սնունդ
        var fundCords = this.getDirections(1);
        var cord = random(fundCords);

        //եթե կա հարմար սնունդ
        if (cord) {
            var x = cord[0];
            var y = cord[1];

            //հիմնական մատրիցայում տեղափոխվում է կերած սննդի տեղը
            //իր հին տեղը դնում է դատարկ վանդակ
            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;

            //փոխում է սեփական կորդինատները օբյեկտի մեջ
            this.x = x;
            this.y = y;

            //բազմացման գործակիցը մեծացնում է
            this.multiply++;

            //մեծացնում է էներգիան
            this.energy++;

            //!!! ԿԱՐԵՎՈՐ !!! սննդի զանգվածից ջնջում է կերված սնունդը
            //խոտակերի համար դա խոտն է, խոտերի զանգվածի մեջ xotArr
            for (var i in grassArr) {
                if (x == grassArr[i].x && y == grassArr[i].y) {
                    grassArr.splice(i, 1);
                }
            }

            //եթե պատրաստ է բազմացմանը, բազմանում է 
            if (this.multiply == 10) {
                this.mul()
                this.multiply = 0;
            }


        } else {
            //եթե չկա հարմար սնունդ 
            this.move();
            this.energy--;
            if (this.energy <= 0) { //մահանում է, եթե էներգիան 3֊ից ցածր է
                this.die();
            }
        }
    }

    //mul() բազմանալ
    mul() {
        //փնտրում է դատարկ տարածք
        var fundCords = this.getDirections(0);
        var cord = random(fundCords);

        //եթե կա բազմանում է
        if (cord) {
            var x = cord[0];
            var y = cord[1];
            // this.multiply++;
            //ստեղծում է նոր օբյեկտ (այստեղ խոտակեր) 
            //և տեղադրում է այն խոտակերների զանգվածի մեջ
            var norXotaker = new Eatgrass(x, y);
            eatArr.push(norXotaker);

            //հիմնական matrix-ում կատարում է գրառում նոր խոտի մասին
            matrix[y][x] = 2;
            // this.multiply = 0; //????????
        }
    }

    //die() մահանալ
    die() {
        //Հիմնական մատրիցում իր դիրքում դնում է դատարկություն
        matrix[this.y][this.x] = 0;

        //!!! ԿԱՐԵՎՈՐ !!! ջնջում է ինքն իրեն խոտակերների զանգվածից
        for (var i in eatArr) {
            if (this.x == eatArr[i].x && this.y == eatArr[i].y) {
                eatArr.splice(i, 1);
            }
        }
    }

}
class Gishatich {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 5;
        this.multiply = 0;
    }
    newDirections() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(t) {
        this.newDirections();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == t) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    move() {
        let qaylel = this.chooseCell(0)
        let sharjvel = random(qaylel)
        if (sharjvel) {
            let x = sharjvel[0]
            let y = sharjvel[1]
            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0
            this.x = x;
            this.y = y;
        }
    }
    mul() {
        let findCords = this.chooseCell(0)
        let cord = random(findCords)
        if (cord) {
            let x = cord[0]
            let y = cord[1]
            matrix[y][x] = 5
            let norGishatich = new Gishatich(x, y)
            gishArr.push(norGishatich)
        }
    }
    die() {
        matrix[this.y][this.x] = 0
        for (let i in gishArr) {
            if (this.x == gishArr[i].x && this.y == gishArr[i].y) {
                gishArr.splice(i, 1)
            }
        }
    }
    eat() {
        console.log("Gihs utuma xotaker")
        let findCords = this.chooseCell(2)
        let cord = random(findCords)
        if (cord) {
            let x = cord[0];
            let y = cord[1];
            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
            this.energy++;
            this.multiply++;
            for (let i in eatArr) {
                if (this.x == eatArr[i].x && this.y == eatArr[i].y) {
                    eatArr.splice(i, 1)
                }
            }
            if (this.multiply == 5) {
                this.mul()
                this.multiply = 0;
            }
        }
        else {
            this.move()
            this.energy--
            if (this.energy == 0) {
                this.die()
            }
        }
    }
}
class Gish {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.energy = 10
        this.multiply = 0
    }
    newDirections() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(t) {
        this.newDirections()
        let found = [];
        for (let i in this.directions) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == t) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    move() {
        let azat = this.chooseCell(0)
        let azat1 = this.chooseCell(1)
        let found = azat.concat(azat1)
        let datark = random(found)
        if (datark) {
            let x = datark[0]
            let y = datark[1]
            matrix[y][x] = 4;
            matrix[this.y][this.x] = 1;
            let g = new Grass(this.y, this.x)
            grassArr.push(g)
            this.y = y;
            this.x = x;
        }

    }
    eat() {
        let utel = this.chooseCell(2)
        let utel1 = this.chooseCell(3)
        let found1 = utel.concat(utel1)
        let uteluTex = random(found1)
        if (uteluTex) {
            let x = uteluTex[0]
            let y = uteluTex[1]
            if (matrix[y][x] == 3) {
                matrix[y][x] = 4
                matrix[this.y][this.x] = 0;
                this.x = x;
                this.y = y;
                this.multiply++
                this.energy++

                for (let i in gishArr) {
                    if (x == gishArr[i].x && y == gishArr[i].y) {
                        gishArr.splice(i, 1)
                    }
                }
                if (this.multiply == 5) {
                    this.mul()
                    this.multiply = 0;
                }

            }
            else if (matrix[y][x] == 2) {
                matrix[y][x] = 4
                matrix[this.y][this.x] = 0;
                this.x = x;
                this.y = y;
                this.multiply++
                this.energy++

                for (let i in eatArr) {
                    if (x == eatArr[i].x && y == eatArr[i].y) {
                        eatArr.splice(i, 1)
                    }
                }
                if (this.multiply == 5) {
                    this.mul()
                    this.multiply = 0;
                }

            }
        }
        else
            this.move()
        this.energy--
        if (this.energy <= 0) {
            this.die()
        }
    }
    mul() {
        let azat = this.chooseCell(0)
        let kord = random(azat)
        if (kord) {
            let x = kord[0]
            let y = kord[1]
            matrix[y][x] = 4;
            let gish1 = new Gish(x, y)
            gish1Arr.push(gish1)
        }
    }
    die() {
        matrix[this.y][this.x] = 0
        for (let i in gish1Arr) {
            if (this.x == gish1Arr[i].x && this.y == gish1Arr[i].y) {
                gish1Arr.splice(i, 1)
            }
        }

    }

}
class  Vedma {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.kyanq = 5;
    }
    Directions() {
        this.directions = [
            [this.x - 2, this.y - 2],
            [this.x - 1, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x + 2, this.y - 1],
            [this.x + 2, this.y],
            [this.x + 2, this.y + 1],
            [this.x + 2, this.y + 2],
            [this.x + 1, this.y + 2],
            [this.x, this.y + 2],
            [this.x - 1, this.y + 2],
            [this.x - 2, this.y + 2],
            [this.x - 2, this.y + 1],
            [this.x - 2, this.y],
            [this.x - 2, this.y - 1],
            [this.x - 2, this.y - 2],
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x - 3, this.y - 3],
            [this.x - 3, this.y - 2],
            [this.x - 3, this.y - 1],
            [this.x - 3, this.y],
            [this.x - 3, this.y + 1],
            [this.x - 3, this.y + 2],
            [this.x - 3, this.y + 3],
            [this.x - 2, this.y + 3],
            [this.x - 1, this.y + 3],
            [this.x, this.y + 3],
            [this.x + 1, this.y + 3],
            [this.x + 2, this.y + 3],
            [this.x + 3, this.y + 3],
            [this.x + 3, this.y + 2],
            [this.x + 3, this.y + 1],
            [this.x + 3, this.y],
            [this.x + 3, this.y - 1],
            [this.x + 3, this.y - 2],
            [this.x + 3, this.y - 3],
            [this.x + 2, this.y - 3],
            [this.x + 1, this.y - 3],
            [this.x, this.y - 3],
            [this.x - 1, this.y - 3],
            [this.x - 2, this.y - 3],
        ]
    }
    chooseCell(t) {
        this.Directions()
        let found = []
        for (let i in this.directions) {
            let x = this.directions[i][0]
            let y = this.directions[i][1]
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == t) {
                    found.push(this.directions[i])
                }
            }
        }
        return found;
    }
    stexcel() {
        this.jamanak = Math.floor(random(0, 10))
        this.jamanak--;
        if (this.jamanak == 0) {
            let azat = this.chooseCell(0)
            let stexcelXotaker = random(azat)
            if (stexcelXotaker) {
                let x = stexcelXotaker[0]
                let y = stexcelXotaker[1]
                matrix[y][x] = 2;
                let xotaker = new Eatgrass(x, y)
                eatArr.push(xotaker)
                this.kyanq--
                if (this.kyanq == 0) {
                    matrix[this.y][this.x] = 0
                    for (let i in  vedmaArr) {
                        if (this.x ==  vedmaArr[i].x && this.y ==  vedmaArr[i].y) {
                            vedmaArr.splice(i, 1)
                        }
                    }
                    
                }
            }
        }
    }
}