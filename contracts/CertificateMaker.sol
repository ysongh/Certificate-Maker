// SPDX-License-Identifier: MIT
pragma solidity ^0.8.5;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract CertificateMaker is ERC721URIStorage {
  using Counters for Counters.Counter;
  Counters.Counter public _nftsid;

  mapping(string => CertificateTemplate) public certificateTemplateList;

  struct CertificateTemplate {
    string cid;
    uint date;
    uint price;
    address from;
  }

  event CertificateTemplateCreated (
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
    certificateTemplateList[_cid] = CertificateTemplate(_cid, block.timestamp, _price, msg.sender);

    emit CertificateTemplateCreated(_cid, block.timestamp, _price, msg.sender);
  }

  function mintCertificateNFT(string memory _cid, address _to) external {
    _nftsid.increment();
    uint _tokenId = _nftsid.current();
    _mint(_to, _tokenId);
    _setTokenURI(_tokenId, _cid);

    emit CertificateNFTCreated(_tokenId, _cid, block.timestamp, msg.sender, _to);
  }
}