import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

import { Form, Button, Header, Grid } from 'semantic-ui-react';

import { submitNewUser } from '../../actions/auth';
import semanticFormField from '../shared/semanticFormField';
import { required, email } from '../../utils/validation';

class RegisterUser extends Component {
  renderRegFields() {
    return (
      <div>
        <Field
          component={semanticFormField}
          as={Form.Input}
          type="text"
          name="firstName"
          placeholder="First name"
          icon="user"
          iconPosition="left"
          validate={required}
        />
        <Field
          validate={required}
          component={semanticFormField}
          as={Form.Input}
          type="text"
          placeholder="Last name"
          name="lastName"
          icon="user"
          iconPosition="left"
        />

        <Field
          validate={[required, email]}
          component={semanticFormField}
          as={Form.Input}
          type="email"
          placeholder="Email address"
          name="email"
          icon="envelope"
          iconPosition="left"
        />

        <Field
          validate={required}
          component={semanticFormField}
          as={Form.Input}
          type="text"
          placeholder="Employee number"
          name="userId"
        />

        <Field
          validate={required}
          component={semanticFormField}
          as={Form.Input}
          type="password"
          placeholder="Password"
          name="password"
          icon="key"
          iconPosition="left"
        />
      </div>
    );
  }

  submitUser(values) {
    const { submitNewUser, history } = this.props;

    submitNewUser(values).then(result => {
      // need to clear out the auth user in redux here....
      // logout perhaps?
      history.push(`/api/tmdb/auth/logout`);
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
                loading={submitting}
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

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = {
  submitNewUser
};

RegisterUser = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterUser);

export default reduxForm({
  form: 'registerForm',
  enableReinitialize: true
})(RegisterUser);
