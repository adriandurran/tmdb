import React from 'react';

import { withStyles } from 'material-ui/styles';
import withRoot from '../../withRoot';
import rootStyles from '../../styles/rootStyle';

import Paper from 'material-ui/Paper';

import CourseBuilder from './CourseBuilder';
import Courses from '../courses/Courses';

const AdminCourseManager = props => {
  const { classes } = props;
  return (
    <Paper className={classes.adminPaper}>
      <CourseBuilder />
      <Courses />
    </Paper>
  );
};

export default withRoot(withStyles(rootStyles)(AdminCourseManager));
