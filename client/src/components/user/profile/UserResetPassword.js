import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

import { Header, Form, Button, Segment, Message } from 'semantic-ui-react';
import semanticFormField from '../../shared/semanticFormField';

import { selectCurrentUser } from '../../../reducers/selectors/userSelectors';
import { resetUserPassword } from '../../../actions/auth';
import { required } from '../../../utils/validation';

class UserResetPassword extends Component {
  state = {
    message: {
      visible: true
    }
  };

  resetMessageState() {
    let message = {};
    message.visible = false;
    setTimeout(() => {
      this.setState({ message });
    }, 3000);
  }

  resetPWD(newP) {
    const { user, resetUserPassword } = this.props;
    // reset here and log out?
    resetUserPassword(user._id, newP).then(res => {
      let message = { ...this.state.message };

      if (res.status === 200) {
        message.header = 'Success!';
        message.content = `Your password has been changed`;
        message.positive = true;
      } else {
        message.header = 'Ooops!';
        message.content = `Something went wrong updating your password. Error: ${res}`;
        message.negative = true;
      }
      this.setState({ message });
      this.resetMessageState();
    });
  }

  render() {
    const { handleSubmit, submitting, pristine } = this.props;
    const { message } = this.state;

    return (
      <div>
        <Segment attached>
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
        <Message
          attached="bottom"
          header={message.header}
          content={message.content}
          visible={message.visible}
          positive={message.positive}
          negative={message.negative}
        />
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
