import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

import { Form, Button, Header, Grid } from 'semantic-ui-react';

import { loginUser } from '../../actions/auth';

const renderTextField = ({
  input,
  label,
  className,
  type,
  icon,
  iconPosition,
  meta: { touched, error }
  // ...custom
}) => (
  <Form.Input
    required
    fluid
    icon={icon}
    iconPosition={iconPosition}
    placeholder={label}
    error={touched && error}
    type={type}
    {...input}
  />
);

class LoginUser extends Component {
  userLogin(values, dispatch) {
    const { history, loginUser } = this.props;
    loginUser(values).then(result => {
      history.push(`/users/${result.userId}`);
    });
  }

  render() {
    const { handleSubmit, submitting, pristine } = this.props;
    return (
      <div>
        <Grid textAlign="center" verticalAlign="middle">
          <Grid.Column width={8}>
            <Header as="h3" textAlign="center">
              Login to Training Manager
            </Header>
            <Form onSubmit={handleSubmit(values => this.userLogin(values))}>
              <Field
                name="email"
                label="Email address"
                type="email"
                icon="user"
                iconPosition="left"
                component={
                  renderTextField // required
                }
              />
              <Field
                name="password"
                label="Password"
                type="password"
                iconPosition="left"
                icon="lock"
                component={renderTextField}
              />

              <Button
                fluid
                disabled={pristine || submitting}
                type="submit"
                size="large"
              >
                Login
              </Button>
            </Form>
          </Grid.Column>
        </Grid>
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

const mapDispatchToProps = {
  loginUser
};

LoginUser = connect(null, mapDispatchToProps)(LoginUser);

export default reduxForm({
  validate,
  form: 'loginForm'
})(LoginUser);
