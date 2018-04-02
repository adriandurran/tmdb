import React from 'react';

import { withStyles } from 'material-ui/styles';
import withRoot from '../../../withRoot';
import rootStyles from '../../../styles/rootStyle';

import Paper from 'material-ui/Paper';

import RoleBuilder from './RoleBuilder';

const AdminRoleManager = props => {
  const { classes } = props;
  return (
    <Paper className={classes.adminPaper}>
      <RoleBuilder />
    </Paper>
  );
};

export default withRoot(withStyles(rootStyles)(AdminRoleManager));
