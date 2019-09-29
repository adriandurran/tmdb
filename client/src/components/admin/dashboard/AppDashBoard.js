import React from 'react';
import { Card, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const AppDashBoard = () => {
  return (
    <Card as={Link} to="/admin/app-tools" raised>
      <Card.Content>
        <Header as="h2">Application</Header>
      </Card.Content>
      <Card.Content description="Manage & View Application Settings" />
      <Card.Content extra />
    </Card>
  );
};

export default AppDashBoard;
