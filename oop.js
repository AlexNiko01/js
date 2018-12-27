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
    // console.log("прыгает " + this.name);
};

var rabbit = new Rabbit("Кроль");
rabbit.walk();


function Clock(options) {
    this._template = options.template;
}

Clock.prototype._render = function () {
    var date = new Date();
    var hours = date.getHours();
    if (hours < 10) hours = '0' + hours;
    var min = date.getMinutes();
    if (min < 10) min = '0' + min;
    var sec = date.getSeconds();
    if (sec < 10) sec = '0' + sec;
    var output = this._template.replace('h', hours).replace('m', min).replace('s', sec);
    console.log(output);
};

Clock.prototype.stop = function () {
    clearInterval(this._timer);
};

Clock.prototype.start = function () {
    this._render();
    var self = this;
    this._timer = setInterval(function () {
        self._render();
    }, 1000);
};


function ExtendedClock(options) {
    Clock.apply(this, arguments);
    this._precision = options.precision ? options.precision : 1000;
}

ExtendedClock.prototype = Object.create(Clock.prototype);

ExtendedClock.prototype.start = function () {
    this._render();
    var self = this;
    this._timer = setInterval(function () {
        self._render();
    }, this._precision);
};


function Menu(state) {
    this._state = state || Menu.STATE_CLOSED;
};

Menu.STATE_OPEN = 1;
Menu.STATE_CLOSED = 0;

Menu.prototype.open = function () {
    this._state = Menu.STATE_OPEN;
};

Menu.prototype.close = function () {
    this._state = Menu.STATE_CLOSED;
};

Menu.prototype._stateAsString = function () {

    switch (this._state) {
        case Menu.STATE_OPEN:
            return 'открыто';

        case Menu.STATE_CLOSED:
            return 'закрыто';
    }
};

Menu.prototype.showState = function () {
    alert(this._stateAsString());
};

function AnimatingMenu() {
    Menu.apply(this, arguments);
}

AnimatingMenu.prototype = Object.create(Menu);
AnimatingMenu.STATE_ANIMATING = 2;

AnimatingMenu.prototype.open = function () {
    this._state = AnimatingMenu.STATE_ANIMATING;
    setTimeout(function () {
        this.prototype.open()
    }.bind(this), 1000)
};

AnimatingMenu.prototype.close = function () {
    if (this._state === AnimatingMenu.STATE_ANIMATING) {
        clearTimeout(function () {
            this.prototype.open()
        }.bind(this), 1000);
        this.prototype.close();
    }
};
AnimatingMenu.prototype.showState = function () {
    console.log(this._state);
    switch (this._state) {
        case AnimatingMenu.STATE_ANIMATING:
            alert('анимация');
            break;
        default:
            this.prototype._stateAsString();
    }
}
;
var menu = new AnimatingMenu();
console.dir(menu);