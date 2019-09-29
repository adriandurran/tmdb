import React from 'react';
import { Card, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const ReportsDashBoard = () => {
  return (
    <Card as={Link} to="/admin/dept-tools" raised>
      <Card.Content>
        <Header as="h2">Unit</Header>
      </Card.Content>
      <Card.Content description="Unit Views & Reports" />
      <Card.Content extra />
    </Card>
  );
};

export default ReportsDashBoard;
