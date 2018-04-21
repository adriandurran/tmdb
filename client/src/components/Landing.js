import React from 'react';
import { Container, Header } from 'semantic-ui-react';

const Landing = props => {
  return (
    <Container text>
      <Header
        as="h1"
        content="Training Manager"
        style={{ fontSize: '4em', marginTop: '3em' }}
        textAlign="center"
      />
    </Container>
  );
};

export default Landing;
