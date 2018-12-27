function Counter(test) {
    let counter = 0;

    return {
        inc() {
            counter++;
        },
        get() {
            return counter;
        }
    };
}

const counter = Counter(9);
const counter2 = Counter(9);

counter.inc();
counter.inc();
counter.inc();
counter2.inc();

class Calc {
    sum(a, b) {
        return a + b;
    }

    diff(a, b) {
        return a - b;
    }

    mul(a, b) {
        return a * b
    }

    div(a, b) {
        return a / b;
    }
}

class SqrCalc extends Calc {
    sum(a, b) {
        return super.sum(a, b) ** 2;

    }

    diff(a, b) {
        return super.diff(a, b) ** 2;

    }
}

// const calc = new Calc();
// console.log(calc.sum(2, 3));
//
// const sqrCalc = new SqrCalc();
// console.log(sqrCalc.sum(2, 3));

function CoffeeMachine(power) {
    this._power = power;
    this._waterAmount = 0;
    this.WATER_HEAT_CAPACITY = 4200;
}

// CoffeeMachine.prototype.WATER_HEAT_CAPACITY = 4200;
CoffeeMachine.prototype.getTimeToBoil = function () {
    return this._waterAmount * this.WATER_HEAT_CAPACITY * 80 / this._power;
};
CoffeeMachine.prototype.run = function () {
    setTimeout(function () {
        // alert('Кофе готов!');
    }, this.getTimeToBoil());
};
CoffeeMachine.prototype.setWaterAmount = function (amount) {
    this._waterAmount = amount;
};
let obj = new CreateObj;
CreateObj.prototype = obj;
let obj3 = new obj.constructor();
let obj4 = new CreateObj;

// console.log(obj3, obj4);

function Hamster() {
    this.food = [];
}

Hamster.prototype.found = function (something) {
    this.food.push(something);
};
CreateObj2.prototype = {};
let obj6 = new CreateObj2;
let obj5 = new obj6.constructor();

// console.log(obj6, obj5);
// let obj2 = new CreateObj;
// console.log(obj2);
function Animal(name) {
    this.name = name;

}

Animal.prototype.walk = function () {
    console.log("ходит " + this.name);
};

function Rabbit(name) {
    Animal.apply(this, arguments);
}

Rabbit.prototype = Object.create(Animal.prototype);

Rabbit.prototype.walk = function () {
    console.log("прыгает " + this.name);
};

var rabbit = new Rabbit("Кроль");
rabbit.walk();


function Clock(options) {
    this.template = options.template;
    this.timer = 0;
    this.render = function () {
        var date = new Date();

        var hours = date.getHours();
        if (hours < 10) hours = '0' + hours;

        var min = date.getMinutes();
        if (min < 10) min = '0' + min;

        var sec = date.getSeconds();
        if (sec < 10) sec = '0' + sec;

        var output = this.template.replace('h', hours).replace('m', min).replace('s', sec);

        console.log(output);
    };
}

Clock.prototype.stop = function () {
    clearInterval(this.timer);
};
Clock.prototype.start = function () {
    this.render();
    this.timer = setInterval(this.render, 1000);
};
let clock = new Clock({
    template: 'h:m:s'
});
clock.start();