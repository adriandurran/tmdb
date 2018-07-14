import React from 'react';
import { Link } from 'react-router-dom';

import { Header, Card } from 'semantic-ui-react';

const AdminApplicationTools = () => {
  return (
    <div>
      <Card.Group itemsPerRow={2}>
        <Card raised as={Link} to="/application/feedback">
          <Card.Content>
            <Header as="h5">Feedback Manager</Header>
          </Card.Content>
          <Card.Content description="Manage User feedback" />
        </Card>
        <Card raised as={Link} to="/application/version">
          <Card.Content>
            <Header as="h5">Version Manager</Header>
          </Card.Content>
          <Card.Content description="Manage application versions" />
        </Card>
      </Card.Group>
    </div>
  );
};

export default AdminApplicationTools;
