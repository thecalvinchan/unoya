var locomotive = require('locomotive')
  , Controller = locomotive.Controller;

var accountController = new Controller();

accountController.userinfo = function() {
  this.title = 'Locomotive';
  this.render();
}

module.exports = accountController;
