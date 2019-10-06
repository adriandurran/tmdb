import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';

import AdminUserMenu from '../AdminUserMenu';
import AdminUserSearch from '../AdminUserSearch';

import { selectUserManage } from '../../../../reducers/selectors/adminSelectors';

import AdminUserDetails from '../AdminUserDetails';
import AdminUserRoleManager from './AdminUserRoleManager';
import AdminUserComps from '../comps/AdminUserComps';
import AdminCurrentComps from '../comps/AdminCurrentComps';
import AdminUserCoursesCurrent from '../courses/AdminUserCoursesCurrent';
import AdminUserCoursesVerify from '../courses/AdminUserCoursesVerify';
import AdminUserAddDept from '../dept/AdminUserAddDept';
import AdminUserRoleState from '../analysis/AdminUserRoleState';

const AdminUserManager = () => {
  const user = useSelector(selectUserManage);

  return (
    <>
      <Header as="h2" textAlign="center">
        User Manager
      </Header>
      <AdminUserMenu />
      <Grid celled centered style={{ marginTop: '0.5em' }} attached="bottom">
        <Grid.Row>
          <Grid.Column>
            <AdminUserSearch />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      {!isEmpty(user) && (
        <Grid celled>
          <Grid.Row columns={2} centered divided>
            <Grid.Column verticalAlign="top">
              <AdminUserAddDept />
            </Grid.Column>

            <Grid.Column verticalAlign="top">
              <AdminUserDetails />
            </Grid.Column>
          </Grid.Row>
          {/* roles */}
          <Grid.Row columns={2} divided>
            <Grid.Column verticalAlign="top">
              <AdminUserRoleManager />
            </Grid.Column>

            <Grid.Column verticalAlign="top">
              <AdminUserRoleState user={user} />
            </Grid.Column>
          </Grid.Row>
          {/* User analysis */}
          <Grid.Row columns={2} centered divided>
            <Grid.Column verticalAlign="top">
              <AdminUserComps />
            </Grid.Column>
            <Grid.Column verticalAlign="top">
              <AdminCurrentComps />
            </Grid.Column>
          </Grid.Row>
          {/* courses */}
          <Grid.Row centered>
            <Grid.Column verticalAlign="top">
              <AdminUserCoursesCurrent />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered>
            <Grid.Column verticalAlign="top">
              <AdminUserCoursesVerify />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      )}
    </>
  );
};

export default AdminUserManager;
