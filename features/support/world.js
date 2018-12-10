const { defineSupportCode } = require('cucumber');

function CustomWorld() {
  this.setResult = function (result) {
    this.result = result;
  };
  this.setDocument = function (document) {
    this.document = document;
  }
  this.getDocument = function () {
    return this.document;
  }
  this.getResult = function () {
    return this.result;
  }
};

defineSupportCode(function ({ setWorldConstructor }) {
  setWorldConstructor(CustomWorld)
});
