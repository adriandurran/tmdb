import React from 'react';
import Grid from 'material-ui/Grid';

import UserCourses from './UserCourses';

const CoursesHome = () => {
  return (
    <div style={{ marginTop: '70px' }}>
      <Grid container>
        <Grid item xs={12}>
          <UserCourses />
        </Grid>
      </Grid>
    </div>
  );
};

export default CoursesHome;
