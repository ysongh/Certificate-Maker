// SPDX-License-Identifier: MIT
pragma solidity ^0.8.5;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract CertificateMaker is ERC721URIStorage {
  using Counters for Counters.Counter;
  Counters.Counter public _nftsid;
  Counters.Counter public _templateCount;

  mapping(uint => CertificateTemplate) public certificateTemplateList;

  struct CertificateTemplate {
    uint id;
    string cid;
    uint date;
    uint price;
    address from;
  }

  event CertificateTemplateCreated (
    uint id,
    string cid,
    uint date,
    uint price,
    address from
  );

  event CertificateNFTCreated (
    uint tokenId,
    string cid,
    uint date,
    address from,
    address to
  );

  constructor() ERC721("Certificate Maker", "CMR") {}

  function createCertificateTemplate(string memory _cid, uint _price) external {
    _templateCount.increment();
    uint _templateId = _templateCount.current();

    certificateTemplateList[_templateId] = CertificateTemplate(_templateId, _cid, block.timestamp, _price, msg.sender);

    emit CertificateTemplateCreated(_templateId, _cid, block.timestamp, _price, msg.sender);
  }

  function mintCertificateNFT(string memory _cid, address _to) external {
    _nftsid.increment();
    uint _tokenId = _nftsid.current();
    _mint(_to, _tokenId);
    _setTokenURI(_tokenId, _cid);

    emit CertificateNFTCreated(_tokenId, _cid, block.timestamp, msg.sender, _to);
  }
}