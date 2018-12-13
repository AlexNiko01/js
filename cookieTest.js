let homeworkContainer = document.querySelector('#homework-container');
let heading = ['name', 'val', 'delete'];

class Helper {
    sortData(arr) {
        let result = {};

        if (arr) {
            result = arr.reduce((prev, cur) => {
                const [name, val] = cur.split('=');

                prev[name] = val;
                return prev;

            }, {})
        }

        return result;
    }

}

let helper = new Helper();

class Cookie {
    parseCookie() {
        let cookieArr = document.cookie.split('; ');

        return helper.sortData(cookieArr);

    }

    addCookie(data) {
        if (Object.getOwnPropertyNames(data).length !== 0) {
            document.cookie = (data.name + '=' + data.val).toString();
        }
    }

    filterCookie(existCookie, filterVal) {
        for (let prop in existCookie) {
            if ((prop.toLowerCase()).indexOf(filterVal.toLowerCase()) === -1
                && (existCookie[prop].toLowerCase()).indexOf(filterVal.toLowerCase()) === -1) {
                delete existCookie[prop];
            }

        }
        console.log(existCookie);
        return existCookie;

    }
}

let cookie = new Cookie();

class Markup {
    createForm() {
        let form = document.createElement('form');
        let name = document.createElement('input');
        let val = document.createElement('input');
        let add = document.createElement('input');
        let title = document.createElement('h1');

        title.innerText = 'ADD COOKIE:';
        name.setAttribute('name', 'name');
        name.setAttribute('type', 'text');
        name.setAttribute('placeholder', 'Name');
        val.setAttribute('name', 'val');
        val.setAttribute('type', 'text');
        val.setAttribute('placeholder', 'Value');
        add.setAttribute('type', 'submit');
        add.setAttribute('value', 'add cookie');

        form.setAttribute('id', 'cookieForm');
        form.appendChild(title);
        form.appendChild(name);
        form.appendChild(val);
        form.appendChild(add);
        homeworkContainer.appendChild(form);
    }

    generateTable(hadings, cookies) {

        let table = document.createElement('table');

        table.setAttribute('id', 'cookieTable');
        let tableHeader = document.createElement('tr');
        let title = document.createElement('caption');

        title.innerText = 'ALL COOKIEs';
        table.appendChild(title);

        hadings.forEach((el) => {
            let colName = document.createElement('th');

            colName.innerText = el;
            tableHeader.appendChild(colName);
        });
        table.appendChild(tableHeader);

        if (Object.getOwnPropertyNames(cookies).length !== 0) {
            for (let prop in cookies) {
                if (!cookies.hasOwnProperty(prop) || !cookies[prop]) {
                    continue;
                }
                this.createTableRow(prop, cookies[prop], table);
            }
        }

        table.setAttribute('border', '1px');
        homeworkContainer.appendChild(table);
    }

    createTableRow(prop, cookie, table) {
        let row = document.createElement('tr');
        let colName = document.createElement('td');
        let colVal = document.createElement('td');
        let btn = document.createElement('button');

        btn.setAttribute('class', 'rmCookie');
        btn.innerText = 'remove this cookie';

        colName.innerText = prop;
        colVal.innerText = cookie;

        row.appendChild(colName);
        row.appendChild(colVal);
        row.appendChild(btn);

        table.appendChild(row);
    }

    createFilterField() {
        let filterField = document.createElement('input');

        filterField.setAttribute('type', 'text');
        filterField.setAttribute('id', 'filterCookie');
        filterField.setAttribute('name', 'filterCookie');
        filterField.setAttribute('placeholder', 'Filter');
        filterField.setAttribute('style', 'margin-bottom:100px;margin-top:100px');

        homeworkContainer.appendChild(filterField);
    }

}

let markup = new Markup();

markup.createForm();
markup.createFilterField();
markup.generateTable(heading, cookie.parseCookie());
let form = document.getElementById('cookieForm');
let filter = document.getElementById('filterCookie');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let data = {};
    let formData = Object.values(form);
    let table = document.getElementById('cookieTable');

    formData.forEach((el) => {
        if (el.name === 'name') {
            data.name = el.value;
        }
        if (el.name === 'val') {
            data.val = el.value;
        }
    });
    console.log(1);
    let cookieObj = cookie.parseCookie();

    if (cookieObj.hasOwnProperty(data.name) && data.val !== filter.value) {
        console.log(2);
        cookie.addCookie(data);

        let filteredCookie = cookie.filterCookie(cookieObj, filter.value);
        if (table) {
            homeworkContainer.removeChild(table);
        }
        delete filteredCookie[data.name];
        markup.generateTable(heading, filteredCookie);
    }
    cookie.addCookie(data)
});

filter.addEventListener('keyup', function () {
    let cookieObj = cookie.parseCookie();
    let filteredCookie = cookie.filterCookie(cookieObj, filter.value);
    let table = document.getElementById('cookieTable');

    if (table) {
        homeworkContainer.removeChild(table);
    }

    markup.generateTable(heading, filteredCookie);
});

let removeButton = document.getElementsByClassName('rmCookie');
removeButton.addEventListener('click', () => {

});