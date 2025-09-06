const http = require('http');
const querystring = require('querystring');

const data = {
  username: 'johndoe',
  password: 'secret'
};

const options = {
  hostname: 'www.example.com',
  port: 80,
  path: '/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(querystring.stringify(data))
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

req.write(querystring.stringify(data));
req.on('error', e => {
  console.error(`问题: ${e.message}`);
});

req.end();