import React from 'react';

import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';

import { withStyles } from 'material-ui/styles';
import rootStyles from '../../styles/rootStyle';
import withRoot from '../../withRoot';

import UserCourses from './UserCourses';
import CourseAdder from '../courses/CourseAdder';

const CoursesHome = props => {
  const { classes } = props;
  return (
    <div style={{ marginTop: '70px' }}>
      <Grid container>
        <Grid item xs={12}>
          <UserCourses />
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.adderPaper}>
            <CourseAdder />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default withRoot(withStyles(rootStyles)(CoursesHome));
