var locomotive = require('locomotive')
  , Controller = locomotive.Controller;

var pagesController = new Controller();

pagesController.main = function() {
  this.title = 'Locomotive';
  this.render();
}

pagesController.index = function() {
  this.title = 'Locomotive';
  this.render();
}

pagesController.dashboard = function() {
  this.title = 'Locomotive';
  this.render();
}

module.exports = pagesController;
