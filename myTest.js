function createDiv() {
    let div = document.createElement('div');

    div.setAttribute('class', 'draggable-div');
    div.style.width = 20 + 'px';
    div.style.height = 20 + 'px';
    div.style.position = 'absolute';
    div.style.float = 'left';
    div.style.top = Math.random() + 'px';
    div.style.left = Math.random() + 'px';

    let letters = 'ABCDE'.split('');
    let color = '#';

    for (let i = 0; i < 3; i++) {
        color += letters[Math.floor(Math.random() * letters.length)];
    }

    div.style.backgroundColor = color;
    div.setAttribute('draggable', true);

    return div;
}

function handleDragStart(e) {
    this.style.opacity = '0.4';
    this.style.position = 'absolute';
}

function handleDragEnd(e) {
    let el = e.target;

    el.style.top = e.pageY - el.offsetHeight + 'px';
    el.style.left = e.pageX - el.offsetWidth / 2 + 'px';
    console.log(e);
}

function addListeners(targets) {
    [].forEach.call(targets, function (target) {
        target.addEventListener('dragstart', handleDragStart, false);
        target.addEventListener('dragend', handleDragEnd, false);
    })
}

let wrap = document.getElementById('homeworkContainer');
let button = document.getElementById('addDiv');

button.addEventListener('click', () => {
    let target = createDiv();
    wrap.appendChild(target);
    let targets = document.getElementsByClassName('draggable-div');

    addListeners(targets);
});

