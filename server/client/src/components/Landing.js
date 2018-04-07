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
          <Typography variant="display3" gutterBottom align="center">
            Training Management Database
          </Typography>
          <Typography variant="subheading" gutterBottom align="center">
            Manage your Training Needs
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default withRoot(withStyles(rootStyles)(Landing));
