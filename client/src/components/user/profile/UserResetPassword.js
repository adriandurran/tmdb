import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

import { Header, Form, Button, Segment } from 'semantic-ui-react';
import semanticFormField from '../../shared/semanticFormField';

import { selectCurrentUser } from '../../../reducers/selectors/userSelectors';
import { resetUserPassword } from '../../../actions/auth';
import { required } from '../../../utils/validation';

class UserResetPassword extends Component {
  resetPWD(newP) {
    const { user, resetUserPassword } = this.props;
    // reset here and log out?
    resetUserPassword(user._id, newP);
  }

  render() {
    const { handleSubmit, submitting, pristine } = this.props;

    return (
      <div>
        <Segment>
          <Header as="h3" textAlign="center">
            Reset Password
          </Header>
          <Form onSubmit={handleSubmit(values => this.resetPWD(values))}>
            <Field
              name="password"
              type="password"
              iconPosition="left"
              icon="lock"
              placeholder="Enter new password"
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
              Change Password
            </Button>
          </Form>
        </Segment>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: selectCurrentUser(state)
  };
};

const mapDispatchToProps = {
  resetUserPassword
};

UserResetPassword = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserResetPassword);

export default reduxForm({
  form: 'resetPwd'
})(UserResetPassword);
