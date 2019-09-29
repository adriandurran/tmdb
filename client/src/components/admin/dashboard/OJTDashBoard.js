import React from 'react';
import { useDispatch } from 'react-redux';
import { Card, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { fetchOJTS } from '../../../actions/ojt';

const OJTDashBoard = () => {
  const dispatch = useDispatch();

  dispatch(fetchOJTS());

  return (
    <Card as={Link} to="/admin/ojt-tools" raised>
      <Card.Content>
        <Header as="h2">On the Job Training</Header>
      </Card.Content>
      <Card.Content description="Add & Manage On the Job Training" />
      <Card.Content extra />
    </Card>
  );
};

export default OJTDashBoard;
