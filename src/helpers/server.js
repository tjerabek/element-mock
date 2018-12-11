const elementRouter = require('element-router');

module.exports.collectPostData = async req => new Promise((resolve, reject) => {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk.toString();
  });
  req.on('end', () => {
    resolve(body);
  });
  req.on('error', (err) => {
    reject(err);
  });
});

module.exports.runRouter = (url, method, data) => {
  const results = elementRouter.getResults(data, url, method);
  const [result] = results;

  if (result) {
    return {
      statusCode: 200,
      content: result.response.content,
      headers: result.response.headers,
    };
  }

  return {
    statusCode: 404,
    content: '',
  };
};
