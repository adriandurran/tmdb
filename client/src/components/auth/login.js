import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

import { Form, Button, Header, Grid, Message } from 'semantic-ui-react';

import semanticFormField from '../shared/semanticFormField';
import { required, email } from '../../utils/validation';

import { loginUser } from '../../actions/auth';

class LoginUser extends Component {
  state = {
    message: {
      visible: false
    }
  };
  userLogin(values) {
    const { history, loginUser } = this.props;
    loginUser(values).then(result => {
      let message = { ...this.state.message };
      if (result.status !== 200) {
        message.header = 'Ooops!';
        message.content = `Something went wrong. Incorrect User name or password.`;
        message.negative = true;
        message.visible = true;
        this.setState({ message });
        this.resetMessageState();
      } else {
        history.push(`/users/${result.userId}`);
      }
    });
  }

  resetMessageState() {
    let message = {};
    message.visible = false;
    setTimeout(() => {
      this.setState({ message });
    }, 3000);
  }

  render() {
    const { handleSubmit, submitting, pristine } = this.props;
    const { message } = this.state;

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
            <Message
              header={message.header}
              content={message.content}
              visible={message.visible}
              positive={message.positive}
              negative={message.negative}
            />
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
