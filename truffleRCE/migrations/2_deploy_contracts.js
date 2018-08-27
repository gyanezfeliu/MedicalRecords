var TokenMinter = artifacts.require("TokenMinter");
// var TokenAdmin = artifacts.require("TokenAdmin");
// var RnetToken = artifacts.require("RnetToken");
// var ERC20 = artifacts.require("ERC20");
// var Ownable = artifacts.require("Ownable");
// var RBAC = artifacts.require("RBAC");
// var Roles = artifacts.require("Roles");
// var SafeMath = artifacts.require("SafeMath");
// var Whitelist = artifacts.require("Whitelist");

module.exports = function(deployer) {
  deployer.deploy(TokenMinter);
  // deployer.deploy(TokenAdmin);
  // deployer.deploy(RnetToken);
  // deployer.deploy(ERC20);
  // deployer.deploy(Ownable);
  // deployer.deploy(RBAC);
  // deployer.deploy(Roles);
  // deployer.deploy(SafeMath);
  // deployer.deploy(Whitelist);
};
