import React from 'react';
import { Link } from 'react-router-dom';

import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';

import { withStyles } from 'material-ui/styles';
import withRoot from '../../withRoot';
import rootStyles from '../../styles/rootStyle';

const AdminDashboard = props => {
  const { classes } = props;
  return (
    <div>
      <Card raised>
        <CardContent className={classes.card}>
          <Typography variant="display3" gutterBottom align="center">
            Admin Dashboard
          </Typography>
          <hr />
          <Grid container spacing={8}>
            <Grid item xs={6}>
              <Button
                size="large"
                variant="raised"
                className={classes.dashboardButton}
                component={Link}
                to={'/admin/course-builder'}
              >
                Course Builder
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default withRoot(withStyles(rootStyles)(AdminDashboard));
