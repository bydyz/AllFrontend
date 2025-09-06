const http = require('http');
const data = JSON.stringify({
  username: 'johndoe',
  password: 'secret'
});

const options = {
  hostname: 'www.example.com',
  port: 80,
  path: '/api/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
};

const req = http.request(options, res => {
  console.log(`状态码: ${res.statusCode}`);
  res.setEncoding('utf8');
  let rawData = '';
  res.on('data', (chunk) => { rawData += chunk; });
  res.on('end', () => {
    console.log(rawData);
  });
});

req.write(data);
req.on('error', e => {
  console.error(`问题: ${e.message}`);
});

req.end();