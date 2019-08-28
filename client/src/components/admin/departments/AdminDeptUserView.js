import React from 'react';
import { useSelector } from 'react-redux';
import { Header, Grid, Card } from 'semantic-ui-react';

import { noRoleUsers } from '../../../utils/roleHelpers';

import {
  selectUsersInDept,
  selectUniqueRolesInDept
} from '../../../reducers/selectors/adminSelectors';
import { selectDept } from '../../../reducers/selectors/deptSelectors';

import AdminDeptNoRoleUsers from './AdminDeptNoRoleUsers';
import AdminDeptManagers from './AdminDeptManagers';
import AdminDeptRoles from './AdminDeptRoles';
import AdminDeptBreadCrumb from './AdminDeptBreadCrumb';

const AdminDeptUserView = () => {
  const dept = useSelector(selectDept);
  const deptUsers = useSelector(selectUsersInDept);
  const roles = useSelector(selectUniqueRolesInDept);

  return (
    <>
      <Header as="h2" textAlign="center">
        {dept.departmentName}
      </Header>
      <AdminDeptBreadCrumb dept={dept} />

      {dept.managers.length > 0 ? (
        <Grid centered>
          <Header as="h3" textAlign="center" style={{ marginTop: '0.5em' }}>
            Managers
          </Header>
          <Grid.Row>
            <AdminDeptManagers dept={dept} />
          </Grid.Row>
        </Grid>
      ) : (
        <Header as="h5" textAlign="center">
          No managers for this department
        </Header>
      )}

      {deptUsers.length > 0 ? (
        <Grid centered>
          <Header as="h3" textAlign="center" style={{ marginTop: '0.5em' }}>
            Roles
          </Header>
          {roles.length > 0 && <AdminDeptRoles roles={roles} />}
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
