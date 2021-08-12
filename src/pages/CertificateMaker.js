import React, { useState } from 'react';
import { Container, Grid, Card, Form, Button } from 'semantic-ui-react';

import PlaceholderImage from '../components/common/PlaceholderImage';

function CertificateMaker() {
  const [name, setName] = useState('');

  return (
    <Container>
      <Grid divided='vertically'>
        <Grid.Row>
          <Grid.Column width={9}>
            <PlaceholderImage />
          </Grid.Column>
          <Grid.Column width={7}>
            <Card centered style={{ width: '100%'}}>
              <Card.Content>
                <Form>
                  <Form.Field>
                    <label>Name</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} />
                  </Form.Field>
                  
                  <p>Price: 0.005 ETH</p>

                  <Button
                    type='submit'
                    color="black"
                  >Mint NFT</Button>
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
