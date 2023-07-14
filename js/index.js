document.addEventListener('DOMContentLoaded', async (e) => {
    if (POSTS[0].usr == '') {
        console.log('holaxd');
    } else {
        console.log('dxaloh');
    }

    if (USR_ID == '') {
        Navbar = '';
    }

    let usr = '8d06edefb8b74f898a222f1076057429';
    let data = await getDataFromUsrId(usr);

    createQrWallet('qr-code2', usr, 300, 300);
    getLnurlp('qr-code1', data.inkey, 100, 100);
});