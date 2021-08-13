import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Grid, Card, Image, Form, Button } from 'semantic-ui-react';

function CertificateMaker({ contract }) {
  const { cid } = useParams();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const loadDataFromNFT = async () => {
      const res = await contract.methods.certificateTemplateList(cid).call();
      console.log(res);
      setPrice(res.price);
    }
    
    if(contract) loadDataFromNFT();
  }, [contract])

  return (
    <Container>
      <Grid divided='vertically'>
        <Grid.Row>
          <Grid.Column width={9}>
            <Image src={`https://slate.textile.io/ipfs/${cid}`} />
          </Grid.Column>
          <Grid.Column width={7}>
            <Card centered style={{ width: '100%'}}>
              <Card.Content>
                <Form>
                  <Form.Field>
                    <label>Name</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} />
                  </Form.Field>
                  
                  

                  {contract 
                    ? <>
                        <p className="red-text">Price: {window.web3.utils.fromWei(price.toString(), 'Ether')} ETH</p>
                        <Button
                          type='submit'
                          color="black"
                        >Mint NFT</Button>
                      </>
                      
                    : <p className="red-text">Connect to wallet</p>
                  }
                </Form>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  )
}

export default CertificateMaker;
