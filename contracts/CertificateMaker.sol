// SPDX-License-Identifier: MIT
pragma solidity ^0.8.5;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract CertificateMaker is ERC721URIStorage {
  using Counters for Counters.Counter;
  Counters.Counter public _nftsid;
  Counters.Counter public _templateCount;

  CertificateTemplate[] public certificateTemplateList;
  mapping(uint => UserCertificate) public userCertificateList;

  address public owner;

  struct CertificateTemplate {
    uint id;
    string cid;
    uint date;
    bool isShow;
    address from;
  }

  struct UserCertificate {
    uint id;
    string cid;
    address owner;
  }

  event CertificateTemplateCreated (
    uint id,
    string cid,
    uint date,
    address from
  );

  event CertificateNFTCreated (
    uint tokenId,
    string cid,
    uint date,
    address from,
    address to
  );

  constructor(address _owner) ERC721("Certificate Maker", "CMR") {
    owner = _owner;
  }

  modifier onlyOwner() {
    require(msg.sender == owner, "Only Owner to perfrom this action");
    _;
  }

  function createCertificateTemplate(string memory _cid) external {
    _templateCount.increment();
    uint _templateId = _templateCount.current();

    certificateTemplateList.push(CertificateTemplate(_templateId, _cid, block.timestamp, false, msg.sender));

    emit CertificateTemplateCreated(_templateId, _cid, block.timestamp, msg.sender);
  }

  function mintCertificateNFT(string memory _cid, address _to) external {
    _nftsid.increment();
    uint _tokenId = _nftsid.current();
    _mint(_to, _tokenId);
    _setTokenURI(_tokenId, _cid);
    
    userCertificateList[_tokenId] = UserCertificate(_tokenId, _cid, _to);

    emit CertificateNFTCreated(_tokenId, _cid, block.timestamp, msg.sender, _to);
  }

  function hideCertificateTemplate(uint _id) external onlyOwner {
    certificateTemplateList[_id].isShow = true;
  }

  function showCertificateTemplate(uint _id) external onlyOwner {
    certificateTemplateList[_id].isShow = false;
  }

  function getAllCertificateTemplates() external view returns (CertificateTemplate[] memory) {
    return certificateTemplateList;
  }

  function getMyNFTs() public view returns (UserCertificate[] memory) {
    uint totalItemCount = _nftsid.current();
    uint itemCount = 0;
    uint currentIndex = 0;

    for(uint i = 0; i < totalItemCount; i++) {
      if(userCertificateList[i + 1].owner == msg.sender) {
        itemCount += 1;
      }
    }

    UserCertificate[] memory certificates = new UserCertificate[](itemCount);
    
    for(uint i = 0; i < totalItemCount; i++) {
      if(userCertificateList[i + 1].owner == msg.sender) {
        uint currentId = i + 1;
        UserCertificate storage currentCertificate = userCertificateList[currentId];
        certificates[currentIndex] = currentCertificate;
        currentIndex += 1;
      }
    }
    return certificates;
  }
}