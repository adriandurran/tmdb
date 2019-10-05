import React from 'react';
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import { Grid } from 'semantic-ui-react';

import { selectUserManage } from '../../../../reducers/selectors/adminSelectors';

import AdminUserDetails from '../AdminUserDetails';
import AdminUserRoleManager from './AdminUserRoleManager';
import AdminUserComps from '../comps/AdminUserComps';
import AdminUserCourseTable from '../courses/AdminUserCoursesTable';
import AdminUserAddDept from '../dept/AdminUserAddDept';
import AdminUserAnalysis from '../analysis/AdminUserAnalysis';

const AdminUserRCTools = () => {
  const user = useSelector(selectUserManage);

  return (
    <>
      {!isEmpty(user) && (
        <Grid celled>
          <Grid.Row columns={2} centered divided>
            <Grid.Column>
              <AdminUserAddDept />
            </Grid.Column>

            <Grid.Column>
              <AdminUserDetails />
            </Grid.Column>
          </Grid.Row>
          {/* roles */}
          <Grid.Row columns={2}>
            <Grid.Column>
              <AdminUserRoleManager />
            </Grid.Column>
            <Grid.Column>
              <AdminUserComps />
            </Grid.Column>
          </Grid.Row>
          {/* User analysis */}
          <Grid.Row>
            <Grid.Column>
              <AdminUserAnalysis user={user} />
            </Grid.Column>
          </Grid.Row>
          {/* courses */}
          <Grid.Row>
            <Grid.Column>
              <AdminUserCourseTable />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      )}
    </>
  );
};

export default AdminUserRCTools;
