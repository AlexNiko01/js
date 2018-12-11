let homeworkContainer = document.querySelector('#homework-container');

function loadTowns() {
    return new Promise((resolve) => {
        let xhr = new XMLHttpRequest();

        xhr.open('GET', 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json');
        xhr.send();
        xhr.addEventListener('load', () => {
            if (xhr.response === 404) {
                console.log('error');
            } else {
                let rez = JSON.parse(xhr.responseText).sort((a, b) => {
                    if (a.name > b.name) {
                        return -1;
                    } else if (a.name < b.name) {
                        return 1;
                    } else {
                        return 0;
                    }
                });

                resolve(rez);
            }
        });

    });
}

function isMatching(full, chunk) {
    if (full.toLowerCase().indexOf(chunk) === -1) {
        return false;
    } else {
        return true;
    }
}

let loadingBlock = homeworkContainer.querySelector('#loading-block');
let filterBlock = homeworkContainer.querySelector('#filter-block');
let filterInput = homeworkContainer.querySelector('#filter-input');
let filterResult = homeworkContainer.querySelector('#filter-result');
let townsPromise;
let ul = document.createElement('ul');

loadTowns()
    .then((value) => {
        townsPromise = value;
        townsPromise.forEach((el) => {
            let li = document.createElement('li');

            li.textContent = el.name;
            ul.appendChild(li);
        });
        filterBlock.appendChild(ul);
    })
    .catch(() => {
        let errBlock = document.createElement('span');

        errBlock.textContent = 'Не удалось загрузить города';
        homeworkContainer.appendChild(errBlock);
        let button = document.createElement('button');

        homeworkContainer.appendChild(button);
        button.addEventListener('click', () => {
            loadTowns();
        })
    });

filterInput.addEventListener('keyup', function () {
    ul.innerText = '';
    loadingBlock.textContent = 'Загрузка...';
    townsPromise.forEach((el) => {
        if (isMatching(el.name, filterInput.value)) {
            let li = document.createElement('li');
            li.textContent = el.name;
            ul.appendChild(li);
            filterResult.appendChild(ul);
            console.log(ul);
        } else {
            console.log('error');
        }
    });

});

