import React from 'react';
import { Card, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const WizardDashBoard = () => {
  return (
    <Card as={Link} to="/admin/wizards" raised>
      <Card.Content>
        <Header as="h2">Account Wizards</Header>
      </Card.Content>
      <Card.Content description="Role and User Wizards" />
      <Card.Content extra />
    </Card>
  );
};

export default WizardDashBoard;
