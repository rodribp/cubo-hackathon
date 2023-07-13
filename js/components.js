//Component to manage logic of apis

//creating global variables for api requests
const DOMAIN_URL = 'https://legend.lnbits.com/';

const ADMIN_URL = DOMAIN_URL + 'api/v1/';
const ADMIN_KEY = 'eb8d3f250f0340feb18affd60baf4757';
const ADMIN_ID_FOR_USR_MNG = '031e0e39187846c5b4253b7c71ec8ed6';

const USR_MNG_URL = DOMAIN_URL + 'usermanager/api/v1/';
const USR_MNG_KEY = '4dfeea8d9ecf4611ace81e5cf929a6a9';

const LNURLP_URL = 'lnurl/api/v1/links';

var formUser = document.getElementById('create-user-form');

//get data from lnbits api
const apiRequestGet = async (action, usr) => {
    let key = '';
    let url = '';

    switch (usr) {
        case 1:
            key = ADMIN_KEY;
            url = ADMIN_URL;
            break;
        case 2:
            key = USR_MNG_KEY;
            url = USR_MNG_URL;
            break;
        default: 
            console.log('Specify an announced kind of user')
            break;
    }

    let options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-Api-Key': key
        }
    }

    const response = await fetch(url + action, options);
    const json = await response.json();

    if (json.error) {
        console.log(json.error);
    }

    return json;
}

//post requests for lnbits api
const apiRequestPost = async (action, usr, body) => {
    let key = '';
    let url = '';

    switch (usr) {
        case 1:
            key = ADMIN_KEY;
            url = ADMIN_URL;
            break;
        case 2:
            key = USR_MNG_KEY;
            url = USR_MNG_URL;
            break;
        case 3:
            key = ADMIN_KEY;
            url = USR_MNG_URL;
            break;
        default: 
            console.log('Specify an announced kind of user')
            break;
    }

    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Api-Key': key
        },
        body: JSON.stringify(body)
    }

    const response = await fetch(url + action, options);
    const json = await response.json();

    if (json.error) {
        console.log(json.error);
    }

    return json;
}

//structure to create user
const createBody = (username, walletname, email, password) => {
    let body = {
        'admin_id': ADMIN_ID_FOR_USR_MNG,
        'user_name': username,
        'wallet_name': walletname,
        'email': email,
        'password': password
    }
    return body;
}

//function to generate qrcode of the wallet
const createQrWallet = async (usrId) => {
    let data = await apiRequestGet('wallets', 2);
    let url = '';

    for (var i = 0; i < data.length; i++) {
        if (data[i].user == usrId) {
            url = DOMAIN_URL + 'wallet?usr=' + data[i].user + '&' + 'wal=' + data[i].id;
        }
    }

    new QRCode(document.getElementById('qr-code'), url);
}

//function to get the last user created
const getLastUsrData = async () => {
    let data = await apiRequestGet('wallets', 2);
    let json = '';

    for (var i = 0; i < data.length; i++) {
        if (i == data.length - 1) {
            json = {
                usr: data[i].user,
                invKey: data[i].inkey,
                admKey: data[i].adminkey
            }
            
        }
    }

    return json;
}

document.addEventListener("DOMContentLoaded", async (e) => {
    createQrWallet(await getLastUsrData());

    console.log(await getLastUsrData());
});

//final function to create a new user and enable lnurl extension on his wallet
const createNewUser = async (username, walletname, email, password) => {
    await apiRequestPost('users', 2, createBody(username, walletname, email, password));
    apiRequestPost('extensions?extension=lnurlp&userid=' + await getLastUsr() + '&active=true', 3);
}

formUser.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    createNewUser(formUser['user-name'].value, formUser['wallet-name'].value, 'email@email.com', 'passwordxd');
}); 