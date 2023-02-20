import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Grid, Card, Image, Form, Button } from 'semantic-ui-react';

import Spinner from '../components/common/Spinner';

function CertificateMaker({ walletAddress, contract }) {
  const { id } = useParams();

  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [templateURL, setTemplateURL] = useState("");
  const [recipient, setRecipient] = useState('');
  const [statusText, setStatusText] = useState('');
  const [transactionHash, setTransactionHash] = useState('');
  const [certificateURL, setCertificateURL] = useState('');
  const [loadingCreate, setLoadingCreate] = useState(false);

  useEffect(() => {
    const loadDataFromNFT = async () => {
      const template = await contract.methods.certificateTemplateList(id - 1).call();
      console.log(template);
      setTemplateURL(template.cid);
      setPrice(template.price);
    }
    
    if(contract) loadDataFromNFT();
  }, [contract, id])

  const createCertificateTemplate = async () => {
    try{
      setLoadingCreate(true);
      setStatusText("Creating Certificate...");

      setStatusText("Minting NFT...");
      setCertificateURL(templateURL);

      const res = await contract.methods
        .mintCertificateNFT(templateURL, recipient)
        .send({ from: walletAddress });
      console.log('createCertificateTemplate', res);
      setTransactionHash(res.transactionHash);
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
          <Grid.Column mobile={16} tablet={9} computer={9}>
            <Image className="certificatemaker" src={templateURL} fluid />
            <p className="certificatemaker__onTop certificatemaker__infor">
              {title}
            </p><p className="certificatemaker__onTop certificatemaker__name">
              {name}
            </p>\
          </Grid.Column>
          <Grid.Column mobile={16} tablet={7} computer={7}>
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
                        <p className="red-text">
                          Price: {window.web3.utils.fromWei(price.toString(), 'Ether')} FIL
                        </p>
                        <Button
                          type='submit'
                          color="black"
                          onClick={createCertificateTemplate}
                        >Mint NFT</Button>
                      </>
                      
                    : <p className="red-text">Connect to wallet</p>
                  }
                  {loadingCreate && <Spinner text={statusText} />}
                </Form>
              </Card.Content>
            </Card>

            {certificateURL &&
              <p className="transactionHash">
                Certificate URL, {" "}
                <a href={certificateURL} target="_blank" rel="noopener noreferrer">
                  Link
                </a>
              </p>
            }

            {transactionHash &&
              <p className="transactionHash">
                Success, see transaction {" "}
                <a href={`https://mumbai.polygonscan.com/tx/${transactionHash}`} target="_blank" rel="noopener noreferrer">
                  {transactionHash.substring(0, 10) + '...' + transactionHash.substring(56, 66)}
                </a>
              </p>
            }
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  )
}

export default CertificateMaker;
