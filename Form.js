class Form {
    constructor() {
        this.params = {
            name: null,
            phone: null,
            email: null,
            message: null,
        };

        this.errors = [];
    }

    set name(val) {
        // validation

        this.params.name = val;
    }
    set phone(val) {
        // validation

        this.params.phone = val;
    }
    set email(val) {
        // validation
        if(true) {
            this.errors.push('Email wrong format');
        } else {
            this.params.email = val;
        }

    }
    set message(val) {
        // validation

        this.params.message = val;
    }

    hasErrors() {
        return this.errors.length > 0;
    }

    send() {
        return fetch('/user/send-mail', this.params);
    }
}