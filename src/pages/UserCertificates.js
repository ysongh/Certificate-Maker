import React, { useEffect, useState } from 'react';
import { Container, List } from 'semantic-ui-react';

import Spinner from '../components/common/Spinner';

function UserCertificates({ walletAddress, contract }) {
  const [certificateURLs, setCertificateURLs] = useState([]); 
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadNFTs = async () => {
      try{
        setLoading(true);
        const totalSupply = await contract.methods._nftsid().call();

        for(let i = 1; i <= totalSupply; i++){
          const tokenOwner = await contract.methods.ownerOf(i).call();
          
          if(tokenOwner === walletAddress){
            let certificateCID = await contract.methods.tokenURI(i).call();
            console.log(certificateCID);
            const certificateURL = `https://ipfs.io/ipfs/${certificateCID}/certificate.pdf`
            setCertificateURLs([...certificateURLs, certificateURL])
          }
        }
        setLoading(false);
      } catch(error) {
        console.error(error);
        setLoading(false);
      }
    }
    if(contract) loadNFTs();
  }, [walletAddress, contract])
  console.log(certificateURLs)
  return (
    <Container>
      <h1>Your Certificates</h1>
      <List divided relaxed>
          {certificateURLs.map((certificate, index) => (
            <List.Item key={index}>
              <List.Icon name='certificate' size='large' verticalAlign='middle' />
              <List.Content>
              <a href={certificate} target="_blank" rel="noopener noreferrer">
                {certificate}
              </a>
              </List.Content>
            </List.Item>
          ))}
      </List>
      {loading && <Spinner text="Loading" />}
    </Container>
  )
}

export default UserCertificates;
