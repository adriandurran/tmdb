import React from 'react';
import Card, { CardContent } from 'material-ui/Card';

import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import withRoot from '../withRoot';
import rootStyles from '../styles/rootStyle';

const Landing = props => {
  const { classes } = props;
  return (
    <div>
      <Card raised>
        <CardContent className={classes.card}>
          <h2>Training Management Database</h2>
          Manage your Training Needs
        </CardContent>
      </Card>
    </div>
  );
};

export default withRoot(withStyles(rootStyles)(Landing));
