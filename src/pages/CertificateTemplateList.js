import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Card, Image, Button } from 'semantic-ui-react';

import Spinner from '../components/common/Spinner';

function CertificateTemplateList({ contract }) {
  const [certificateTemplates, setCertificateTemplates] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadWorks();
  }, [])

  const loadWorks = async () => {
    try {
      setLoading(true);

      const templates = await contract.methods
        .getAllCertificateTemplates()
        .call();
      setCertificateTemplates(templates);

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  return (
    <Container>
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
          {loading && <Spinner text="Loading" />}
        </Grid.Row>
      </Grid>
    </Container>
  )
}

export default CertificateTemplateList;