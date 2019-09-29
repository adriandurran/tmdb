import React from 'react';
import { useDispatch } from 'react-redux';
import { Card, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { fetchDepts } from '../../../actions/dept';

const DeptDashBoard = () => {
  const dispatch = useDispatch();

  dispatch(fetchDepts());

  return (
    <Card as={Link} to="/admin/dept-tools" raised>
      <Card.Content>
        <Header as="h2">Departments</Header>
      </Card.Content>
      <Card.Content description="Add & Manage & View Departments" />
      <Card.Content extra />
    </Card>
  );
};

export default DeptDashBoard;
