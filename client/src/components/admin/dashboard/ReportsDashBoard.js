import React from 'react';
import { Card, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const ReportsDashBoard = () => {
  return (
    <Card raised>
      <Card.Content>
        <Header as="h2">Reports</Header>
      </Card.Content>
      <Card.Content description="Views & Reports" />
      <Card.Content extra />
    </Card>
  );
};

export default ReportsDashBoard;
