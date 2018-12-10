const fs = require('fs');
const http = require('http');

const { runRouter } = require('./helpers/server');

const server = http.createServer((req, res) => {
  const data = process.env.ELEMENTS || JSON.parse(fs.readFileSync('./source/elements.json', 'utf8'));
  runRouter(req, data)
    .then((result) => {
      res.statusCode = result.statusCode;
      if (result.headers) {
        result.headers.forEach((header) => {
          res.setHeader(header.key, header.value);
        });
      }
      res.end(result.content);
    });
});

module.exports.server = server;
