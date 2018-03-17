import React from 'react';
import Grid from 'material-ui/Grid';

import UserCourses from './UserCourses';
import CourseSelector from '../courses/CourseSelector';

const CoursesHome = () => {
  return (
    <div style={{ marginTop: '70px' }}>
      <Grid container>
        <Grid item xs={12}>
          <UserCourses />
        </Grid>
        <Grid item xs={12}>
          <CourseSelector />
        </Grid>
      </Grid>
    </div>
  );
};

export default CoursesHome;
