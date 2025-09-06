const http = require('http');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const formData = new FormData();
formData.append('file', fs.createReadStream(path.resolve('local-file-path')));

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/upload',
  method: 'POST'
};

const req = http.request(options, res => {
  console.log(`状态码: ${res.statusCode}`);
  // ...
});

formData.pipe(req);