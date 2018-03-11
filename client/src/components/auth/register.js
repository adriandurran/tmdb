import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

import rootStyles from '../../styles/rootStyle';
import withRoot from '../../withRoot';
import { withStyles } from 'material-ui/styles';

import Card, { CardContent, CardHeader } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

import { submitUser } from '../../actions/auth';
import RegisterField from './registerField';

class RegisterUser extends Component {
  renderRegFields() {
    const { classes } = this.props;
    return (
      <div>
        <Field
          required
          component={RegisterField}
          type="text"
          name="firstname"
          label="First name"
          className={classes.formFields}
        />
        <Field
          required
          component={RegisterField}
          type="text"
          label="Last name"
          name="lastname"
          className={classes.formFields}
        />

        <Field
          required
          component={RegisterField}
          type="text"
          label="Email address"
          name="email"
          className={classes.formFields}
        />

        <Field
          required
          component={RegisterField}
          type="text"
          label="Employee number"
          name="empId"
          className={classes.formFields}
        />

        <Field
          component={RegisterField}
          type="password"
          label="Password"
          name="pwd"
          className={classes.formFields}
        />
      </div>
    );
  }

  submitNewUser(values, dispatch) {
    const { submitUser, history } = this.props;

    submitUser(values).then(result => {
      // console.log(result);
      history.push(`/users/${result.id}`);
    });
  }

  render() {
    const { handleSubmit, submitting, classes } = this.props;
    return (
      <div>
        <Card raised className={classes.card}>
          <CardContent>
            <CardHeader>
              <Typography className={classes.title}>Register</Typography>
            </CardHeader>
            <form
              className={classes.formContainer}
              onSubmit={handleSubmit(values => this.submitNewUser(values))}
            >
              {this.renderRegFields()}
              <div style={{ flex: 1, textAlign: 'center' }} />
              <Button variant="raised" disabled={submitting} type="submit">
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.firstname) {
    errors.firstname = 'Required';
  }
  if (!values.lastname) {
    errors.lastname = 'Required';
  }

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.empId) {
    errors.empId = 'Required';
  }

  // if (!values.pwd) {
  //   errors.pwd = 'Required';
  // } else if (values.pwd.length < 8) {
  //   errors.pwd = 'Password must be 8 to 25 characters';
  // } else if (values.pwd.length > 25) {
  //   errors.pwd = 'Password must be more 8 to 25 characters';
  // }

  return errors;
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = {
  submitUser
};

RegisterUser = withStyles(rootStyles)(RegisterUser);

RegisterUser = connect(mapStateToProps, mapDispatchToProps)(RegisterUser);

export default withRoot(
  reduxForm({
    form: 'registerForm',
    validate
  })(RegisterUser)
);
