import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Container, Card, Form, Button } from 'semantic-ui-react';

import { SLATEAPIKEY, CERTIFICATETEMPLATE_COLLECTIONID } from '../config';
import Spinner from '../components/common/Spinner';

function CertificateForm() {
  const history = useHistory();

  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [detail, setDetail] = useState('');
  const [loading, setLoading] = useState(false);

  const getFile = async event => {
    const file = event.target.files[0];
    console.log(file);
    setImage(file);
  }

  const uploadFileToSlate = async () => {
    try{
      setLoading(true);
      const url = `https://uploads.slate.host/api/public/${CERTIFICATETEMPLATE_COLLECTIONID}`;

      let data = new FormData();
      data.append("data", image);
      data.append("filename", name);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: SLATEAPIKEY,
        },
        body: data
      });
      const json = await response.json();
      console.log(json);
      setLoading(false);
      history.push('/');
    }
    catch(err) {
      console.error(err);
      setLoading(false);
    }
  }

  return (
    <Container>
      <Card centered style={{ width: '100%'}}>
        <Card.Content>
          <Form>
            <Form.Field>
              <label>Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Field>
            <Form.Field>
              <label>Image</label>
              <input type="file" onChange={getFile}/>
            </Form.Field>
            <Form.TextArea label='Detail' value={detail} onChange={(e) => setDetail(e.target.value)} />
            <Button
              type='submit'
              color="black"
              onClick={uploadFileToSlate}
            >Submit</Button>
            {loading && <Spinner text="Creating..." />}
          </Form>
        </Card.Content>
      </Card>
    </Container>
  );
}

export default CertificateForm; 