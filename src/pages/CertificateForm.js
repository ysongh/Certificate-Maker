import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Container, Card, Form, Input, Image, Button } from 'semantic-ui-react';
import axios from "axios";

import { PINATA_APIKEY, PINATA_SECRETAPIKEY } from '../config';
import Spinner from '../components/common/Spinner';
import PlaceholderImage from '../components/common/PlaceholderImage';

function CertificateForm({ walletAddress, contract }) {
  const history = useHistory();

  const [imageURL, setImageURL] = useState('');
  const [loadingImage, setLoadingImage] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);

  const uploadFileToSlate = async event => {
    try{
      setLoadingImage(true);
      const image = event.target.files[0];

      let data = new FormData();
      data.append('file', image);
      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", data, {
        maxContentLength: "Infinity",
        headers: {
          "Content-Type": 'multipart/form-data',
          pinata_api_key: PINATA_APIKEY, 
          pinata_secret_api_key: PINATA_SECRETAPIKEY,
        }
      })
      let url = "https://gateway.pinata.cloud/ipfs/" + res.data.IpfsHash;
      console.log(url);
      setImageURL(url);
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
        .createCertificateTemplate(imageURL)
        .send({ from: walletAddress });
      console.log('mintCertificateTemplateNFT', res);

      history.push('/certificate-template-list');
      setLoadingCreate(false);
    }
    catch(err) {
      console.error(err);
      setLoadingCreate(false);
    }
  }

  return (
    <Container>
      <Card centered style={{ minWidth: '600px' }}>
        <Card.Content>
          <Form>
            <Form.Group widths='equal'>
              <Form.Field>
                <label>Upload Certificate Border (PNG only)</label>
                <input type="file" onChange={uploadFileToSlate}/>
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