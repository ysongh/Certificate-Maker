import React from 'react';
import { Container, Button } from 'semantic-ui-react';

function Home() {
  return <div className="hero-img">
    <Container>
      <h1>Create your own digital certificate</h1>
      <p>Send your  digital certificate as NFT</p>
      <Button
        type='submit'
        color="black"
      >Get Started</Button>
    </Container>
  </div>;
}

export default Home;
