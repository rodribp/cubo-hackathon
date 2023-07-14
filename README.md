# cubo-hackathon

--to create a new user we need to call the next functions and send the credentials as

createNewUser(username <string required>, walletname <string required>, email <string optional>, password <string optional>)

--to access the wallet we need to save the data of the user logged as the following code

let data = await getDataFromUsrId('userId');

--once the data is settled configure you can call the next to functions

getLnurlp('elementId', data.inkey);
createQrWallet('elementId', data.user);