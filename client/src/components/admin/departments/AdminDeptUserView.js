import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Header, Grid, Breadcrumb, Card } from 'semantic-ui-react';
import { isEmpty } from 'lodash';

import { noRoleUsers } from '../../../utils/roleHelpers';

import {
  selectUsersInDept,
  selectUniqueRolesInDept
} from '../../../reducers/selectors/adminSelectors';
import { selectDept } from '../../../reducers/selectors/deptSelectors';

import AdminDeptRoleUsers from './AdminDeptRoleUsers';
import AdminDeptNoRoleUsers from './AdminDeptNoRoleUsers';

const AdminDeptUserView = () => {
  const dept = useSelector(selectDept);
  const deptUsers = useSelector(selectUsersInDept);
  const roles = useSelector(selectUniqueRolesInDept);

  const renderRoleColumns = () => {
    return roles.map((role) => {
      // if (!isEmpty(role._role)) {
      return (
        <Grid.Column key={role._id}>
          <Header as="h5" textAlign="center">
            {role._role.roleName}
          </Header>
          <Card.Group itemsPerRow={2} centered>
            <AdminDeptRoleUsers roleId={role._role._id} />
          </Card.Group>
        </Grid.Column>
      );
      // } else {
      //   return <div />;
      // }
    });
  };

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
        <Breadcrumb.Section link as={Link} to="/admin/dept-views">
          Department Views
        </Breadcrumb.Section>
        <Breadcrumb.Divider icon="right arrow" />
        <Breadcrumb.Section active>
          {isEmpty(dept)
            ? 'No Department found'
            : `Details for ${dept.departmentName}`}
        </Breadcrumb.Section>
      </Breadcrumb>
      {deptUsers.length > 0 ? (
        <Grid centered>
          <Header as="h3" textAlign="center" style={{ marginTop: '0.5em' }}>
            Roles
          </Header>
          {roles.length > 0 && (
            <Grid.Row columns={roles.length}>{renderRoleColumns()}</Grid.Row>
          )}
        </Grid>
      ) : (
        <Header as="h5" textAlign="center">
          No users in this department
        </Header>
      )}
      {noRoleUsers(deptUsers).length > 0 && (
        <Grid celled centered>
          <Grid.Column>
            <Header as="h5" textAlign="center">
              Users with no Roles
            </Header>
            <Card.Group itemsPerRow={4} centered>
              <AdminDeptNoRoleUsers />
            </Card.Group>
          </Grid.Column>
        </Grid>
      )}
    </>
  );
};

export default AdminDeptUserView;
