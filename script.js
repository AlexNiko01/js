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

auth()
    .then(()=>{
       console.log('ok');
    });


// VK.api('users.get',{fields:'photo_100'},(respon)=>{console.log(respon)});



