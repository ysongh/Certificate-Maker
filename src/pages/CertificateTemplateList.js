import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Card, Image, Button } from 'semantic-ui-react';

import { SLATEAPIKEY, CERTIFICATETEMPLATE_COLLECTIONID } from '../config';

function CertificateTemplateList() {
  const [certificateTemplates, setCertificateTemplates] = useState([]);

  useEffect(() => {
    const loadWorks = async () => {
      const response = await fetch('https://slate.host/api/v2/get-collection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: SLATEAPIKEY,
        },
        body: JSON.stringify({ data: {
          id: CERTIFICATETEMPLATE_COLLECTIONID // collection ID
        }})
      });

      if (!response) {
        console.log("No response");
        return;
      }

      const json = await response.json();
      if (json.error) {
        console.log(json);
      } else {
        const collection = json.collection;
        setCertificateTemplates(collection.objects);
        console.log(collection)
      }
    }

    loadWorks();
  }, [])

  return (
    <Container>
      <Grid columns={3} doubling>
        <Grid.Row>
          {certificateTemplates.map(certificate => (
            <Grid.Column key={certificate.id} style={{marginBottom: '1rem'}}>
              <Card color='purple'>
                <Image src={`https://slate.textile.io/ipfs/${certificate.cid}`} wrapped ui={false} />
                <Card.Content>
                  <Card.Header>{certificate.filename}</Card.Header>
                  <div style={{marginTop: '.7rem'}}>
                    <Button basic color='green' as={Link}>
                      View
                    </Button>
                  </div>
                </Card.Content>
              </Card>
            </Grid.Column>
          ))}
        </Grid.Row>
      </Grid>
    </Container>
  )
}

export default CertificateTemplateList;