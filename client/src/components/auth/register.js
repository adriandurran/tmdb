import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

import { Form, Button, Header, Grid } from 'semantic-ui-react';

import { submitNewUser } from '../../actions/auth';
import RegisterField from './registerField';

class RegisterUser extends Component {
  renderRegFields() {
    return (
      <div>
        <Field
          required
          component={RegisterField}
          type="text"
          name="firstName"
          label="First name"
          icon="user"
          iconPosition="left"
        />
        <Field
          required
          component={RegisterField}
          type="text"
          label="Last name"
          name="lastName"
          icon="user"
          iconPosition="left"
        />

        <Field
          required
          component={RegisterField}
          type="text"
          label="Email address"
          name="email"
        />

        <Field
          required
          component={RegisterField}
          type="text"
          label="Employee number"
          name="userId"
        />

        <Field
          component={RegisterField}
          type="password"
          label="Password"
          name="password"
          icon="key"
          iconPosition="left"
        />
      </div>
    );
  }

  submitUser(values, dispatch) {
    const { submitNewUser, history } = this.props;

    submitNewUser(values).then(result => {
      history.push(`/auth/login`);
    });
  }

  render() {
    const { handleSubmit, submitting, pristine } = this.props;
    return (
      <div>
        <Grid textAlign="center" verticalAlign="middle">
          <Grid.Column width={8}>
            <Header>Register</Header>
            <Form
              size="large"
              onSubmit={handleSubmit(values => this.submitUser(values))}
            >
              {this.renderRegFields()}
              <Button
                fluid
                disabled={pristine || submitting}
                type="submit"
                style={{ marginTop: '15px' }}
              >
                Submit
              </Button>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.firstName) {
    errors.firstName = 'Required';
  }
  if (!values.lastName) {
    errors.lastName = 'Required';
  }

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.userId) {
    errors.userId = 'Required';
  }

  if (!values.passwordd) {
    errors.pwd = 'Required';
  } else if (values.pwd.length < 8) {
    errors.pwd = 'Password must be 8 to 25 characters';
  } else if (values.pwd.length > 25) {
    errors.pwd = 'Password must be more 8 to 25 characters';
  }

  return errors;
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = {
  submitNewUser
};

RegisterUser = connect(mapStateToProps, mapDispatchToProps)(RegisterUser);

export default reduxForm({
  form: 'registerForm',
  validate
})(RegisterUser);
