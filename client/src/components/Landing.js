import React from 'react';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
// import withRoot from '../withRoot';

// const styles = theme => ({
//   root: {
//     textAlign: 'center',
//     paddingTop: theme.spacing.unit * 20
//   },
//   card: {
//     textAlign: 'center'
//   }
// });

const Landing = props => {
  // const { classes } = props;
  return (
    <div className="row">
      <div className="col s12 m8 offset-m2">
        <Card>
          <CardContent>
            <h2>Training Management Database</h2>
            Manage your Training Needs
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Landing;
