import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Card, Image, Message, Button } from 'semantic-ui-react';

import { SLATEAPIKEY, CERTIFICATETEMPLATE_COLLECTIONID } from '../config';

const FREECERTIFICATETEMPLATES = [
  {
    id: "3140e32a-ac7a-4456-ab5e-f09012a117b1",
    filename: "Border1.png",
    cid: "bafkreiflkoahwmhdc5finxpotxcrl74oyd6otl3qriefv3ysh7p2dph5yi"
  },
  {
    id: "80bf1651-de4e-4db5-9792-8b0f92a3f449",
    filename: "Border2.png",
    cid: "bafkreibpztlnlwueyh3s7gd5wypuiwz7z7lrl2rlkuwvptyrejaysiygeu"
  },
]

function CertificateTemplateList() {
  const [certificateTemplates, setCertificateTemplates] = useState(FREECERTIFICATETEMPLATES);
  const [showUnlockBtn, setShowUnlockBtn] = useState(true);
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    window.addEventListener('unlockProtocol.status', function(event) {
      if(event.detail.state === "unlocked"){
        loadWorks();
        setShowUnlockBtn(false);
      }
    })
    
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
        setCertificateTemplates([...FREECERTIFICATETEMPLATES, ...collection.objects]);
        console.log(collection)
      }
    }
  }, [])

  const unlock = () => {
    window.unlockProtocol && window.unlockProtocol.loadCheckoutModal();
  }

  return (
    <Container>
      {showMessage && <Message
        onDismiss={() => setShowMessage(false)}
        header='Contract is deployed on Polygon Test Network'
      />}
      <h1>Choose Certificate Border</h1>
      <Grid columns={3} doubling>
        <Grid.Row>
          {certificateTemplates.map(certificate => (
            <Grid.Column key={certificate.id} style={{marginBottom: '1rem'}}>
              <Card color='purple'>
                <Image src={`https://slate.textile.io/ipfs/${certificate.cid}`} wrapped ui={false} />
                <Card.Content>
                  <Card.Header>{certificate.filename}</Card.Header>
                  <div style={{marginTop: '.7rem'}}>
                    <Button basic color='green' as={Link} to={`/certificate-maker/${certificate.cid}`}>
                      View
                    </Button>
                  </div>
                </Card.Content>
              </Card>
            </Grid.Column>
          ))}
          {showUnlockBtn && 
            <Card color='purple'>
              <Card.Content>
                <Card.Header>See More Certificate Border?</Card.Header>
                <Card.Description style={{ marginBottom: '1.5rem' }}>
                  You will need to purchase a membership to see more Certificate Border
                </Card.Description>
                <Button color="purple" onClick={unlock} size="large">
                  Unlock Template
                </Button>
              </Card.Content>
            </Card>
          }
        </Grid.Row>
      </Grid>
    </Container>
  )
}

export default CertificateTemplateList;