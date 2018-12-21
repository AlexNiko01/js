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
        params.version = '5.92';
        VK.api(method, params, (data) => {
            if (data.error) {
                reject(data.error);
            }
            resolve(data.response);
        });
    })
}

// auth()
//     .then(() => {
//         return callAPI('users.get', {
//             name_case: 'gen',
//             version: '5.92'
//         })
//     })
//     .then((response) => {
//         const headerInfo = document.querySelector('#headerInfo');
//         headerInfo.textContent = `friends on page ${response[0].first_name} ${response[0].last_name}`;
//         console.log(response);
//     });
(async () => {
    await auth();
    const [me] = await callAPI('users.get', {
        name_case: 'gen',

    });
    const headerInfo = document.querySelector('#headerInfo');
    headerInfo.textContent = `friends on page ${me.first_name} ${me.last_name}`;
    const friends = await callAPI('friends.get', {
        fields: 'city,country,photo_100'
    });
    console.log(friends);
    const template = document.querySelector('#userTemplate').textContent;
    console.log(Handlebars);
    const templateCompiled = Handlebars.compile(template);
    const results = document.getElementById('results');
    console.log(results.innerHTML = templateCompiled({friends:friends}));

})();



