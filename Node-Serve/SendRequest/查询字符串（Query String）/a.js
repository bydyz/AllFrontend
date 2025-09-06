const http = require('http');
const querystring = require('querystring');

const data = {
  name: 'John',
  value: 'Doe'
};

const options = {
  hostname: 'localhost',
  port: 3000,
  path: `/info?${querystring.stringify(data)}`,
  method: 'GET'
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

req.on('error', e => {
  console.error(`问题: ${e.message}`);
});

req.end();