import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

import { Form, Button, Header, Grid } from 'semantic-ui-react';

import semanticFormField from '../shared/semanticFormField';
import { required, email } from '../../utils/validation';

import { loginUser } from '../../actions/auth';

class LoginUser extends Component {
  userLogin(values) {
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
                type="email"
                placeholder="Enter an email address"
                component={semanticFormField}
                as={Form.Input}
                validate={[required, email]}
                icon="user"
                iconPosition="left"
                type="email"
              />

              <Field
                name="password"
                type="password"
                iconPosition="left"
                icon="lock"
                placeholder="Enter your password"
                component={semanticFormField}
                as={Form.Input}
                validate={required}
              />

              <Button
                fluid
                disabled={pristine || submitting}
                loading={submitting}
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

const mapDispatchToProps = {
  loginUser
};

LoginUser = connect(
  null,
  mapDispatchToProps
)(LoginUser);

export default reduxForm({
  form: 'loginForm',
  enableReinitialize: true
})(LoginUser);
