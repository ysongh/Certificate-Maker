const CertificateMaker = artifacts.require("CertificateMaker");

module.exports = function(deployer){
  deployer.deploy(CertificateMaker);
}