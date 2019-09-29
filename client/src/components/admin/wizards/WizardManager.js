import React from 'react';
import { Card, Header, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const WizardManager = () => {
  return (
    <>
      <Header as="h1" textAlign="center">
        <Icon name="wizard" />
        Account Wizards
      </Header>
      <Card.Group itemsPerRow={4} style={{ marginTop: '2rem' }}>
        <Card as={Link} to="/admin/wizards/user" raised>
          <Card.Content>
            <Header as="h2">New User</Header>
          </Card.Content>
          <Card.Content description="Add a new user" />
        </Card>
        <Card as={Link} to="/admin/wizards/role" raised>
          <Card.Content>
            <Header as="h2">New Role</Header>
          </Card.Content>
          <Card.Content description="Add a new Role" />
        </Card>
      </Card.Group>
    </>
  );
};

export default WizardManager;
