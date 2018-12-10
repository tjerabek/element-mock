const elementRouter = require('element-router');

const collectPostData = async (req) => {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      resolve(body);
    });
    req.on('error', (err) => {
      reject(err);
    });
  });
};

module.exports.runRouter = async (req, data) => {
  const { url, method } = req;
  let body;
  if (method === 'POST') {
    body = await collectPostData(req);
  }

  const results = elementRouter.getResults(data, url, method);
  const [ result ] = results;

  if (result) {
    return {
      statusCode: 200,
      content: result.response.content,
      headers: result.response.headers,
    }
  }

  return {
    statusCode: 404,
    content: '',
  };
};
