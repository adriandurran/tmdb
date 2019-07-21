import React from 'react';
import { Link } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { useSelector } from 'react-redux';

import { Header, Grid, Breadcrumb } from 'semantic-ui-react';

import { selectDept } from '../../../reducers/selectors/deptSelectors';
import { selectUsersInDept } from '../../../reducers/selectors/adminSelectors';

import AdminDeptEdit from './AdminDeptEdit';
import AdminDeptHolders from './AdminDeptHolders';

const AdminDeptView = () => {
  const users = useSelector(selectUsersInDept);
  const dept = useSelector(selectDept);

  return (
    <>
      <Header as="h2" textAlign="center">
        {dept.departmentName}
      </Header>
      <Breadcrumb style={{ marginBottom: '2em' }}>
        <Breadcrumb.Section link as={Link} to="/admin/dept-tools">
          Department Tools
        </Breadcrumb.Section>
        <Breadcrumb.Divider icon="right chevron" />
        <Breadcrumb.Section link as={Link} to="/admin/dept-manager">
          Department Manager
        </Breadcrumb.Section>
        <Breadcrumb.Divider icon="right arrow" />
        <Breadcrumb.Section active>
          {isEmpty(dept)
            ? 'No Department found'
            : `Details for ${dept.departmentName}`}
        </Breadcrumb.Section>
      </Breadcrumb>
      <Grid columns={2} centered>
        <Grid.Column>
          <Grid.Column>
            <AdminDeptEdit users={users} />
          </Grid.Column>
        </Grid.Column>
        <Grid.Column>
          <AdminDeptHolders users={users} />
        </Grid.Column>
      </Grid>
    </>
  );
};

export default AdminDeptView;
