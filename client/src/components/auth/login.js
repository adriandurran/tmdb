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
  type,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    required
    placeholder={label}
    error={touched && error}
    {...input}
    type={type}
  />
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
              <Grid container spacing={16}>
                <Grid item xs={5}>
                  <Field
                    // required
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
                  <Button
                    variant="raised"
                    disabled={pristine || submitting}
                    component={Link}
                    to={'/users/1'}
                  >
                    Login
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }
}

const validate = values => {
  const errors = {};
  const requiredFields = ['email', 'password'];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address';
  }
  return errors;
};

LoginUser = withStyles(rootStyles)(LoginUser);

export default withRoot(
  reduxForm({
    // validate,
    form: 'loginForm'
  })(LoginUser)
);
