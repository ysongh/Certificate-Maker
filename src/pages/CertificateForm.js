import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Container, Card, Form, Input, Image, Button } from 'semantic-ui-react';

import { SLATEAPIKEY, CERTIFICATETEMPLATE_COLLECTIONID } from '../config';
import Spinner from '../components/common/Spinner';
import PlaceholderImage from '../components/common/PlaceholderImage';

function CertificateForm({ walletAddress, contract }) {
  const history = useHistory();

  const [price, setPrice] = useState('');
  const [usdPrice, setusdPrice] = useState("0.00");
  const [imageURL, setImageURL] = useState('');
  const [cid, setcid] = useState('');
  const [loadingImage, setLoadingImage] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);

  const handleAmount = async e => {
    setPrice(e.target.value);
    const totalUSDValue = await getETHtoUSD(e.target.value);
    setusdPrice(totalUSDValue);
  }

  const getETHtoUSD = async ETHvalue => {
    if(walletAddress){
      const usdValue = await contract.methods
        .getThePrice()
        .call();

      let totalUSDValue = (usdValue * ETHvalue) / 100000000;
      totalUSDValue = Number.parseFloat(totalUSDValue).toFixed(2);
      return totalUSDValue;
    }
    
    return 0;
  }

  const uploadFileToSlate = async event => {
    try{
      setLoadingImage(true);
      const image = event.target.files[0];
      const url = `https://uploads.slate.host/api/public/${CERTIFICATETEMPLATE_COLLECTIONID}`;

      let data = new FormData();
      data.append("data", image);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: SLATEAPIKEY,
        },
        body: data
      });
      const json = await response.json();
      console.log(json);
      setImageURL(`https://slate.textile.io/ipfs/${json.data.cid}`);
      setcid(json.data.cid);
      setLoadingImage(false);
    }
    catch(err) {
      console.error(err);
      setLoadingImage(false);
    }
  }

  const createCertificateTemplate = async () => {
    try{
      setLoadingCreate(true);
      const res = await contract.methods
        .createCertificateTemplate(cid, window.web3.utils.toWei(price, 'Ether'))
        .send({ from: walletAddress });
      console.log('mintCertificateTemplateNFT', res);

      history.push('/');
      setLoadingCreate(false);
    }
    catch(err) {
      console.error(err);
      setLoadingCreate(false);
    }
  }

  return (
    <Container>
      <Card centered style={{ width: '100%'}}>
        <Card.Content>
          <Form>
            <Form.Group widths='equal'>
              <Form.Field>
                <label>Upload Certificate Border (PNG only)</label>
                <input type="file" onChange={uploadFileToSlate}/>
              </Form.Field>
              <Form.Field>
                <label>Price (ETH)</label>
                <Input
                  value={price}
                  onChange={handleAmount}
                  icon='ethereum'
                  iconPosition='left'
                  label={{ tag: true, content: `$${usdPrice}`}}
                  labelPosition='right' />
              </Form.Field>
            </Form.Group>

            {loadingImage
              ? <PlaceholderImage />
              : imageURL && <Image src={imageURL} alt="Certificate Template" fluid />}
            
            {walletAddress
              ? <Button
                  type='submit'
                  color="black"
                  onClick={createCertificateTemplate}
                >Submit</Button>
              : <p className="red-text">Connect to wallet</p>
            }
            {loadingCreate && <Spinner text="Creating..." />}
          </Form>
        </Card.Content>
      </Card>
    </Container>
  );
}

export default CertificateForm; 