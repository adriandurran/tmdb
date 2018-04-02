import React from 'react';

import { withStyles } from 'material-ui/styles';
import withRoot from '../../../withRoot';
import rootStyles from '../../../styles/rootStyle';

import Paper from 'material-ui/Paper';

import Competencies from '../../competencies/competencies';
import CompBuilder from './CompBuilder';

const AdminCompManager = props => {
  const { classes } = props;
  return (
    <Paper className={classes.adminPaper}>
      <CompBuilder />
      <Competencies />
    </Paper>
  );
};

export default withRoot(withStyles(rootStyles)(AdminCompManager));
