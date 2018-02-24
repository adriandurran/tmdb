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

// use redux form
// will mock the actuall login process until set up with a db
// so for dev only the submit button will just link to user 1

const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => <TextField required error={touched && error} {...input} {...custom} />;

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
              <Field
                name="email"
                label="Email address"
                type="email"
                component={renderTextField}
                className={classes.textField}
              />
              <Field
                name="password"
                label="Email address"
                type="password"
                component={renderTextField}
                className={classes.textField}
              />
              <div className="row">
                <Link
                  to={'/users/1'}
                  type="submit"
                  disabled={pristine || submitting}
                  className="waves-effect waves-light btn right blue-grey darken-1"
                >
                  Login
                </Link>
              </div>
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
