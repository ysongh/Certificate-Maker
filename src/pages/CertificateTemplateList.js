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

function CertificateTemplateList({ contract }) {
  const [certificateTemplates, setCertificateTemplates] = useState(FREECERTIFICATETEMPLATES);
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    loadWorks();
  }, [])

  const loadWorks = async () => {
    const templates = await contract.methods
      .getAllCertificateTemplates()
      .call();
    setCertificateTemplates(templates);
  }

  return (
    <Container>
      {showMessage && <Message
        onDismiss={() => setShowMessage(false)}
        header='Contract is deployed on Filecoin Hyperspace Test Network'
      />}
      <h1>Choose Certificate Border</h1>
      <Grid columns={3} doubling>
        <Grid.Row>
          {certificateTemplates.map(certificate => (
            <Grid.Column key={certificate.id} style={{marginBottom: '1rem'}}>
              <Card color='purple'>
                <Image src={certificate.cid} wrapped ui={false} />
                <Card.Content>
                  {/* <Card.Header>{certificate.filename}</Card.Header> */}
                  <div style={{marginTop: '.7rem'}}>
                    <Button basic color='green' as={Link} to={`/certificate-maker/${certificate.id}`}>
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