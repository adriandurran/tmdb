import React from 'react';
import Card, { CardContent } from 'material-ui/Card';

import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import withRoot from '../withRoot';

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20
  },
  card: {
    marginTop: theme.spacing.unit * 10,
    textAlign: 'center',
    color: theme.palette.primary.light
  }
});

const Landing = props => {
  const { classes } = props;
  return (
    <div>
      <Card>
        <CardContent className={classes.card}>
          <h2>Training Management Database</h2>
          Manage your Training Needs
        </CardContent>
      </Card>
    </div>
  );
};

export default withRoot(withStyles(styles)(Landing));
