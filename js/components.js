//Component to manage logic of apis

//creating global variables for api requests
const DOMAIN_URL = 'https://legend.lnbits.com/';

const ADMIN_URL = DOMAIN_URL + 'api/v1/';
const ADMIN_KEY = 'eb8d3f250f0340feb18affd60baf4757';
const ADMIN_ID = '031e0e39187846c5b4253b7c71ec8ed6';

const LNURLP_URL = DOMAIN_URL + 'lnurlp/api/v1/links';


var invoiceHash = '';
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
            key = ADMIN_KEY;
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
const apiRequestPost = async (action, body) => {
    let key = ADMIN_KEY;
    let url = ADMIN_URL;

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


const setQrCode = (idElement, paramText, paramWidth, paramHeight) => {
    new QRCode(idElement, {text: paramText, width: paramWidth, height: paramHeight});
}


//function to get lnurl of user
const getLnurlp = async (idElement, paramWidth, paramHeight) => {
    let data = await apiRequestGet('', 2);

    setQrCode(idElement, data[0].lnurl, paramWidth, paramHeight);

    return data[0].lnurl;
}

const createInvoice = async (amt, msg) => {
    let response = await apiRequestPost('payments', {amount: amt, lnurl_callback: null, memo: msg, out: false, unit: 'sat'});

    return response;
}

document.addEventListener('DOMContentLoaded', async (e) => {
    //let lnurl = await getLnurlp('qr-code1', 100, 100);
    let invoice = await createInvoice(1, 'Pay for content');
    setQrCode('qr-code1', invoice.payment_request, 200, 200);

    invoiceHash = invoice.payment_hash;
    const interval = setInterval(verifyInvoice, 1000);
});

const verifyInvoice = async (interval) => {
    let data = await apiRequestGet('payments/' + invoiceHash, 1);

    if (data.paid == true) {
        document.getElementById('content').innerHTML = 'UNLOCKED';
        //clearInterval(interval);
    }

    return data.paid;
}