
class Bootstrap {
    run() {
        this.cookie = new Cookie();

        let homeworkContainer = document.querySelector('#homework-container');
        let form;
        let filter;
        let table;

        let page = new Pager(this.cookie, homeworkContainer);
        page.init();

        form = document.getElementById('cookieForm');
        filter = document.getElementById('filterCookie');
        table = document.getElementById('cookieTable');
    }
}

class Cookie {
    constructor() {
        this._cookies = {};
        this._parse()
    }

    _parse() {
        let cookieArr = document.cookie.split('; ');
        this._cookies = cookieArr.reduce((prev, cur) => {
            const [name, val] = cur.split('=');
            prev[name] = val;

            return prev;
        }, {})
    }

    add(data) {
        if (Object.getOwnPropertyNames(data).length !== 0) {
            this._cookies[data.name] = data.val;
            document.cookie = (data.name + '=' + data.val).toString();
        }
    }

    remove(data) {
        if (Object.getOwnPropertyNames(data).length !== 0) {
            delete this._cookies[data.name];
            document.cookie = (data.name + '=' + data.val).toString()
                + '; expires=' + (new Date(0)).toUTCString();
        }
    }

    filter(filterVal) {
        if (!filterVal) return this._cookies;
        let result = {};
        for (let prop in this._cookies) {
            if ((prop.toLowerCase()).indexOf(filterVal.toLowerCase()) >= 0
                && (this._cookies[prop].toLowerCase()).indexOf(filterVal.toLowerCase()) >= 0) {
                result[prop] = this._cookies[prop];
            }
        }

        return result;
    }
}


class Pager {
    constructor(cookie, container) {
        this.cookie = cookie;
        this.container = container;
        this.table = null;
        this.filterVal = null;
    }

    init() {
        this._createForm();
        this._createFilterField();
        this._generateTable();
    }

    _createForm() {
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


        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let data = {};
            let formData = Object.values(form);

            formData.forEach((el) => {
                if (el.name === 'name') {
                    data.name = el.value;
                }
                if (el.name === 'val') {
                    data.val = el.value;
                }
            });

            this.cookie.add(data);
            this._fillTable();
        });

        this.container.appendChild(form);
    }

    _createFilterField() {
        let filterField = document.createElement('input');

        filterField.setAttribute('type', 'text');
        filterField.setAttribute('id', 'filterCookie');
        filterField.setAttribute('name', 'filterCookie');
        filterField.setAttribute('placeholder', 'Filter');
        filterField.setAttribute('style', 'margin-bottom:100px;margin-top:100px');

        filterField.addEventListener('keyup', () => {
            this.filterVal = filterField.value;
            this._fillTable();
        });

        this.container.appendChild(filterField);
    }

    _generateTable() {
        this.table = document.createElement('table');

        this.table.setAttribute('id', 'cookieTable');
        let tableHeader = document.createElement('tr');
        let title = document.createElement('caption');

        title.innerText = 'ALL COOKIEs';
        this.table.appendChild(title);

        ['name', 'val', 'delete'].forEach((el) => {
            let colName = document.createElement('th');

            colName.innerText = el;
            tableHeader.appendChild(colName);
        });

        this.table.appendChild(tableHeader);
        this.table.setAttribute('border', '1px');
        this.container.appendChild(this.table);
        this._fillTable();
    }

    _fillTable() {
        document.querySelectorAll('#cookieTable .ck').forEach(el => el.remove());

        let cookies = this.cookie.filter(this.filterVal);
        if (Object.getOwnPropertyNames(cookies).length !== 0) {
            for (let prop in cookies) {
                this._createTableRow(prop, cookies[prop]);
            }
        }
    }

    _createTableRow(prop, cookie) {
        let row = document.createElement('tr');
        let colName = document.createElement('td');
        let colVal = document.createElement('td');
        let btn = document.createElement('button');

        row.setAttribute('class', 'ck');
        btn.setAttribute('class', 'rmCookie');
        btn.innerText = 'remove this cookie';

        colName.innerText = prop;
        colVal.innerText = cookie;

        row.appendChild(colName);
        row.appendChild(colVal);
        row.appendChild(btn);

        this._initRemoveButton(btn);

        this.table.appendChild(row);
    }

    _initRemoveButton(btn) {
        btn.addEventListener('click', (e) => {
            let value = e.target.previousSibling;
            let name = value.previousSibling;
            let removeCookie = {
                name: name.innerText,
                val: value.innerText
            };
            this.cookie.remove(removeCookie);
            this._fillTable();
        });
    }
}


(new Bootstrap).run();

