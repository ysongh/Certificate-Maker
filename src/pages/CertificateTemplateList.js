import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Card, Image, Message, Button } from 'semantic-ui-react';

function CertificateTemplateList({ contract }) {
  const [certificateTemplates, setCertificateTemplates] = useState([]);
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
                  <Card.Header>{certificate.price / 10 ** 18} FIL</Card.Header>
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