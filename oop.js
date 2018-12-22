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

function Test() {
    let t = () => {
        console.log(123)
    };

    return {
        getP(){
            return Test.prototype;
        }
    };

};

let test = new Test();
test.__proto__ = Object.prototype;
console.log(test.getP());
