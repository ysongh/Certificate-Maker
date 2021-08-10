pragma solidity ^0.6.12;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract CertificateMaker is ERC721 {
  mapping(uint => CertificateTemplate) public certificateTemplateList;

  struct CertificateTemplate {
    uint tokenId;
    string certificateURL;
    uint date;
    uint price;
    address payable from;
  }

  event CertificateTemplateCreated (
    uint tokenId,
    string certificateURL,
    uint date,
    uint price,
    address payable from
  );

  constructor() ERC721("Certificate Maker", "CMR")  public {}

  function mintCodeworkNFT(string memory _certificateURL, uint _price) external {
    uint _tokenId = totalSupply().add(1);
    _safeMint(msg.sender, _tokenId);
    _setTokenURI(_tokenId, _certificateURL);

    emit CertificateTemplateCreated(_tokenId, _certificateURL, now, _price, msg.sender);
  }
}