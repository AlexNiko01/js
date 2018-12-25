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
        return  super.diff(a, b) ** 2;

    }
}

// const calc = new Calc();
// console.log(calc.sum(2, 3));
//
// const sqrCalc = new SqrCalc();
// console.log(sqrCalc.sum(2, 3));

function CreateObj() {
    this.name = 'test';
};
let obj = new CreateObj;
CreateObj.prototype = obj;
let obj3 = new obj.constructor();
let obj4 = new CreateObj;
console.log(obj3, obj4);


function CreateObj2() {
    this.name = 'test';
    // this.__proto__ = {};
};
CreateObj2.prototype = {};
let obj6 = new CreateObj2;
let obj5 = new obj6.constructor();

console.log(obj6, obj5);
// let obj2 = new CreateObj;
// console.log(obj2);