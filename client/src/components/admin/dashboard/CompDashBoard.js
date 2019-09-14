import React from 'react';
import { useDispatch } from 'react-redux';
import { Card, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { fetchComps, fetchCompTypes } from '../../../actions/comps';

const CompDashBoard = () => {
  const dispatch = useDispatch();

  dispatch(fetchComps());
  dispatch(fetchCompTypes());

  return (
    <Card as={Link} to="/admin/comp-tools" raised>
      <Card.Content>
        <Header as="h2">Competencies</Header>
      </Card.Content>
      <Card.Content description="Add & Manage & View Competencies" />
      <Card.Content extra />
    </Card>
  );
};

export default CompDashBoard;
