VK.init({
    apiId: 6792486
});

function auth() {
    return new Promise((resolve, reject) => {
        VK.Auth.login((response) => {
            if (response.session) {
                resolve();

            } else {
                reject(new Error('auth failed'));
            }
        }, 8 | 2);
    })
}

function callAPI(method, params) {
    return new Promise((resolve, reject) => {
        VK.api(method, params, (data) => {
            if (data.error) {
                reject(data.error);
            }
            resolve(data.response);
        });
    })
}

auth()
    .then(() => {
        return callAPI('users.get', {
            fields: 'photo_100',
            version: '5.92'
        })
    })
    .then((response) => {
        console.log(response);
    });




