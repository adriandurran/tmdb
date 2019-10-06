import React, { useEffect } from 'react';
import { Header, Card, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectDepts } from '../../../reducers/selectors/deptSelectors';
import { selectAllUsersActiveNoDept } from '../../../reducers/selectors/adminSelectors';

import { fetchDepts } from '../../../actions/dept';

const AdminDeptTools = () => {
  const depts = useSelector(selectDepts);
  const noDepts = useSelector(selectAllUsersActiveNoDept);
  const disptach = useDispatch();

  useEffect(() => {
    disptach(fetchDepts());
  }, [disptach]);

  return (
    <>
      <Header as="h2" textAlign="center">
        Departments
      </Header>
      <Card.Group itemsPerRow={3} style={{ marginTop: '2em' }}>
        <Card as={Link} to="/admin/dept-manager" raised>
          <Card.Content>
            <Header as="h2">Department Manager</Header>
          </Card.Content>
          <Card.Content description="Add & Manage Departments" />
          <Card.Content extra>
            <Icon name="factory" />
            {depts.length} &nbsp; Departments Listed
          </Card.Content>
        </Card>
        <Card as={Link} to="/admin/dept-views" raised>
          <Card.Content>
            <Header as="h2">Department Views</Header>
          </Card.Content>
          <Card.Content description="View Departments" />
          <Card.Content extra />
        </Card>
        <Card as={Link} to="/admin/users-no-dept" raised>
          <Card.Content>
            <Header as="h2">Department Allocator</Header>
          </Card.Content>
          <Card.Content description="Users with no Department assigned" />
          <Card.Content extra>
            <Icon name="hand paper" />
            {noDepts.length}&nbsp;Orphaned users
          </Card.Content>
        </Card>
      </Card.Group>
    </>
  );
};

export default AdminDeptTools;
