import React, { useEffect, useState } from 'react';
import { Container, List } from 'semantic-ui-react';

function UserCertificates({ walletAddress, contract }) {
  const [certificateURLs, setCertificateURLs] = useState([]); 

  useEffect(() => {
    const loadNFTs = async () => {
      const totalSupply = await contract.methods.totalSupply().call();

      for(let i = 1; i <= totalSupply; i++){
        const tokenOwner = await contract.methods.ownerOf(i).call();
        
        if(tokenOwner === walletAddress){
          let certificateCID = await contract.methods.tokenURI(i).call();
          console.log(certificateCID);
          const certificateURL = `https://ipfs.io/ipfs/${certificateCID}/certificate.pdf`
          setCertificateURLs([...certificateURLs, certificateURL])
        }
      }
      
    }
    if(contract) loadNFTs();
  }, [walletAddress, contract])
  console.log(certificateURLs)
  return (
    <Container>
      <h1>Your Certificates</h1>
      <List divided relaxed>
          {certificateURLs.map(certificate => (
            <List.Item>
              <List.Icon name='certificate' size='large' verticalAlign='middle' />
              <List.Content>
              <a href={certificate} target="_blank" rel="noopener noreferrer">
                {certificate}
              </a>
              </List.Content>
            </List.Item>
          ))}
      </List>
    </Container>
  )
}

export default UserCertificates;
