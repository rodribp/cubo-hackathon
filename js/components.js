//Component to manage logic of apis

//creating global variables for api requests
const DOMAIN_URL = 'https://legend.lnbits.com/';

const ADMIN_URL = DOMAIN_URL + 'api/v1/';
const ADMIN_KEY = 'eb8d3f250f0340feb18affd60baf4757';
const ADMIN_ID_FOR_USR_MNG = '031e0e39187846c5b4253b7c71ec8ed6';

const USR_MNG_URL = DOMAIN_URL + 'usermanager/api/v1/';
const USR_MNG_KEY = '4dfeea8d9ecf4611ace81e5cf929a6a9';

const LNURLP_URL = DOMAIN_URL + 'lnurlp/api/v1/links';

var formUser = document.getElementById('create-user-form');

//get data from lnbits api
const apiRequestGet = async (action, usr, paramKey) => {
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
            key = paramKey;
            url = LNURLP_URL;
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
const apiRequestPost = async (action, usr, body, paramKey) => {
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
        case 4:
            key = paramKey;
            url = LNURLP_URL;
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

const setQrCode = (idElement, paramText, paramWidth, paramHeight) => {
    new QRCode(idElement, {text: paramText, width: paramWidth, height: paramHeight});
}

//function to generate qrcode of the wallet
const createQrWallet = async (idElement, usrId, paramWidth, paramHeight) => {
    let data = await apiRequestGet('wallets', 2);
    let url = '';

    for (var i = 0; i < data.length; i++) {
        if (data[i].user == usrId) {
            url = DOMAIN_URL + 'wallet?usr=' + data[i].user + '&' + 'wal=' + data[i].id;
        }
    }

    setQrCode(idElement, url, paramWidth, paramHeight);
}


//function to get lnurl of user
const getLnurlp = async (idElement, invKey, paramWidth, paramHeight) => {
    let data = await apiRequestGet('', 3, invKey);

    setQrCode(idElement, data[0].lnurl, paramWidth, paramHeight);

    return data[0].lnurl;
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

//function to get data from an specific usr id
const getDataFromUsrId = async (usrId) => {
    let data = await apiRequestGet('wallets', 2);
    let json = '';

    for (var i = 0; i < data.length; i++) {
        if (data[i].user == usrId) {
            json = {
                admin: data[i].admin,
                adminkey: data[i].adminkey,
                id: data[i].id,
                inkey: data[i].inkey,
                name: data[i].name,
                user: data[i].user
            }
        }
    }

    return json;
}

//function that verifies login by usrId
const loginByUsrId = async (usrId) => {
    let data = await getDataFromUsrId(usrId);
    let check = false;

    if (data) {
        check = true;
    }

    return check;
}

//function to create a lnurl for a user
const addLnurlp = async (description, min, max, admKey) => {
    let response = await apiRequestPost('', 4, {'description': description, 'max': max, 'min': min, 'zaps': 'false', 'comment_chars': 0}, admKey);

    return response;
}

//final function to create a new user and enable lnurl extension on his wallet
const createNewUser = async (username, walletname, email, password) => {
    await apiRequestPost('users', 2, createBody(username, walletname, email, password));
    let data = await getLastUsrData();
    await apiRequestPost('extensions?extension=lnurlp&userid=' + data.usr + '&active=true', 3);
    addLnurlp('tips!', 10, 10000, data.admKey);

    return data.usr;
}

document.addEventListener('DOMContentLoaded', async (e) => {
    let usr = '4013aa086b87436584b9dfff0db85827';
    let data = await getDataFromUsrId(usr);

    getLnurlp('qr-code1', data.inkey);
});