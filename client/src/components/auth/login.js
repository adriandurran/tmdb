import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';

import rootStyles from '../../styles/rootStyle';
import withRoot from '../../withRoot';
import { withStyles } from 'material-ui/styles';

import Card, { CardContent, CardHeader } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';

// use redux form
// will mock the actuall login process until set up with a db
// so for dev only the submit button will just link to user 1

const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <TextField required placeholder={label} error={touched && error} {...input} />
);

class LoginUser extends Component {
  render() {
    const { handleSubmit, submitting, pristine, classes } = this.props;
    return (
      <div>
        <Card raised className={classes.card}>
          <CardContent>
            <CardHeader>
              <Typography className={classes.title}>Login</Typography>
            </CardHeader>
            <form onSubmit={handleSubmit(values => console.log(values))}>
              <Grid container spacing={24}>
                <Grid item xs={5}>
                  <Field
                    name="email"
                    label="Email address"
                    type="email"
                    component={renderTextField}
                  />
                </Grid>
                <Grid item xs={5}>
                  <Field
                    name="password"
                    label="Password"
                    type="password"
                    component={renderTextField}
                  />
                </Grid>
                <Grid item xs={2}>
                  <Link
                    to={'/users/1'}
                    type="submit"
                    disabled={pristine || submitting}
                    className="waves-effect waves-light btn right blue-grey darken-1"
                  >
                    Login
                  </Link>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.email) {
    errors.email = `You must provide and email address`;
  }

  if (!values.pwd) {
    errors.pwd = 'You must enter a password';
  }

  return errors;
}

LoginUser = withStyles(rootStyles)(LoginUser);

export default withRoot(
  reduxForm({
    validate,
    form: 'loginForm'
  })(LoginUser)
);
