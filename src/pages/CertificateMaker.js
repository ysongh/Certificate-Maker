import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Grid, Card, Image, Form, Button } from 'semantic-ui-react';

import Spinner from '../components/common/Spinner';

function CertificateMaker({ walletAddress, contract }) {
  const { cid } = useParams();

  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [recipient, setRecipient] = useState('');
  const [loadingCreate, setLoadingCreate] = useState(false);

  useEffect(() => {
    const loadDataFromNFT = async () => {
      const res = await contract.methods.certificateTemplateList(cid).call();
      console.log(res);
      setPrice(res.price);
    }
    
    if(contract) loadDataFromNFT();
  }, [contract, cid])

  const createCertificateTemplate = async () => {
    try{
      setLoadingCreate(true);
      const res = await contract.methods
        .mintCertificateNFT(cid, recipient)
        .send({ from: walletAddress });
      console.log('createCertificateTemplate', res);

      setLoadingCreate(false);
    }
    catch(err) {
      console.error(err);
      setLoadingCreate(false);
    }
  }
  return (
    <Container>
      <h1 style={{ textAlign: 'center' }}>Create your own certificate</h1>
      <Grid divided='vertically'>
        <Grid.Row>
          <Grid.Column width={9}>
            <Image className="certificatemaker" src={`https://slate.textile.io/ipfs/${cid}`} />
            <p className="certificatemaker__onTop certificatemaker__infor">
              {title}
            </p><p className="certificatemaker__onTop certificatemaker__name">
              {name}
            </p>\
          </Grid.Column>
          <Grid.Column width={7}>
            <Card centered style={{ width: '100%'}}>
              <Card.Content>
                <Form>
                  <Form.Field>
                    <label>Title</label>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} />
                  </Form.Field>
                  <Form.Field>
                    <label>Name</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} />
                  </Form.Field>
                  <Form.Field>
                    <label>Recipient's Address</label>
                    <input value={recipient} onChange={(e) => setRecipient(e.target.value)} />
                  </Form.Field>
                  
                  {contract 
                    ? <>
                        <p className="red-text">Price: {window.web3.utils.fromWei(price.toString(), 'Ether')} ETH</p>
                        <Button
                          type='submit'
                          color="black"
                          onClick={createCertificateTemplate}
                        >Mint NFT</Button>
                      </>
                      
                    : <p className="red-text">Connect to wallet</p>
                  }
                  {loadingCreate && <Spinner text="Creating..." />}
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
