const fs = require('fs');

const base64 = fs.readFileSync('../Config/luxe-stay-fbKey.json');


const base64String = Buffer.from(base64).toString('base64');
console.log(base64String)