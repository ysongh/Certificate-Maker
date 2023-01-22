// SPDX-License-Identifier: MIT
pragma solidity ^0.6.12;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract CertificateMaker is ERC721 {
  mapping(string => CertificateTemplate) public certificateTemplateList;

  struct CertificateTemplate {
    string cid;
    uint date;
    uint price;
    address payable from;
  }

  event CertificateTemplateCreated (
    string cid,
    uint date,
    uint price,
    address payable from
  );

  event CertificateNFTCreated (
    uint tokenId,
    string cid,
    uint date,
    address payable from,
    address payable to
  );

  constructor() ERC721("Certificate Maker", "CMR")  public {}

  function createCertificateTemplate(string memory _cid, uint _price) external {
    certificateTemplateList[_cid] = CertificateTemplate(_cid, now, _price, msg.sender);

    emit CertificateTemplateCreated(_cid, now, _price, msg.sender);
  }

  function mintCertificateNFT(string memory _cid, address payable _to) external {
    uint _tokenId = totalSupply().add(1);
    _safeMint(_to, _tokenId);
    _setTokenURI(_tokenId, _cid);

    emit CertificateNFTCreated(_tokenId, _cid, now, msg.sender, _to);
  }
}