const http = require('http');
const fs = require('fs');
const data = fs.readFileSync('file-to-upload.bin');

const options = {
  hostname: 'www.example.com',
  port: 80,
  path: '/upload',
  method: 'POST',
  headers: {
    'Content-Type': 'application/octet-stream',
    'Content-Length': data.length
  }
};

const req = http.request(options, res => {
  console.log(`状态码: ${res.statusCode}`);
  // ...
});

req.write(data);
// ...