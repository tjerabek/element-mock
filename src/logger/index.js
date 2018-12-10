const HAR = require('har');

const creator = new HAR.Creator({
  name: 'Element Mock',
  version: '1.0',
});

const log = new HAR.Log({
  version: 1.2,
  creator,
});

const getContentType = (headers) => {
  const contentType = Object.keys(headers).find((item) => {
    if (item.toLocaleLowerCase() === 'content-type') {
      return item;
    }
    return null;
  });

  return headers[contentType];
};

module.exports.log = (request, response) => {
  const harRequest = new HAR.Request({
    url: request.url,
    method: request.method,
    headers: Object.keys(request.headers).map(item => new HAR.Header(item, request.headers[item])),
    postData: new HAR.PostData({
      mimeType: getContentType(request.headers),
      text: request.body,
    }),
  });

  const harResponse = new HAR.Response({
    status: 200,
    statusText: 'OK',
    headers: Object.keys(response.headers).map(item => new HAR.Header(item, request.headers[item])),
    content: new HAR.PostData({
      mimeType: getContentType(request.headers),
      text: response.body,
    }),
  });

  const entry = new HAR.Entry({
    startedDateTime: new Date(),
    request: harRequest,
    response: harResponse,
  });

  log.addEntry(entry);
};