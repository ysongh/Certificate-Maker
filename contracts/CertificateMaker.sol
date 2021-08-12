pragma solidity ^0.6.12;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract CertificateMaker is ERC721 {
  mapping(string => CertificateTemplate) public certificateTemplateList;

  struct CertificateTemplate {
    string cid;
    uint tokenId;
    string certificateURL;
    uint date;
    uint price;
    address payable from;
  }

  event CertificateTemplateCreated (
    string cid,
    uint tokenId,
    string certificateURL,
    uint date,
    uint price,
    address payable from
  );

  constructor() ERC721("Certificate Maker", "CMR")  public {}

  function mintCertificateTemplateNFT(string memory cid, string memory _certificateURL, uint _price) external {
    uint _tokenId = totalSupply().add(1);
    _safeMint(msg.sender, _tokenId);
    _setTokenURI(_tokenId, _certificateURL);

    certificateTemplateList[cid] = CertificateTemplate(cid, _tokenId, _certificateURL, now, _price, msg.sender);

    emit CertificateTemplateCreated(cid, _tokenId, _certificateURL, now, _price, msg.sender);
  }
}