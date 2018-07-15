import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

import {
  Form,
  Button,
  Header,
  Grid,
  Message,
  Segment,
  Dimmer,
  Loader
} from 'semantic-ui-react';

import { submitNewUser } from '../../actions/auth';
import semanticFormField from '../shared/semanticFormField';
import { required, email } from '../../utils/validation';

class RegisterUser extends Component {
  state = {
    message: {
      visible: false
    },
    loader: {
      active: false
    }
  };
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

  resetMessageState() {
    let message = {};
    message.visible = false;
    setTimeout(() => {
      this.setState({ message });
    }, 3000);
  }

  submitUser(values) {
    const { submitNewUser, history } = this.props;
    // loader
    let loader = { ...this.state.loader };
    loader.active = true;
    this.setState({ loader });

    submitNewUser(values).then(result => {
      let message = { ...this.state.message };
      // loader
      loader.active = false;
      this.setState({ loader });
      // message
      if (result.status !== 200) {
        message.header = 'Ooops!';
        message.content = `Something went wrong. Unable to create your account.`;
        message.negative = true;
        message.visible = true;
        this.setState({ message });
        this.resetMessageState();
      } else {
        message.header = 'Registration Successful';
        message.content = `Thank you for registering as soon as you account is verified you will be able to use the system.`;
        message.positive = true;
        message.visible = true;
        this.setState({ message });
        this.resetMessageState();
        setTimeout(() => {
          history.push(`/`);
        }, 3000);
      }
    });
  }

  render() {
    const { handleSubmit, submitting, pristine } = this.props;
    const { message, loader } = this.state;

    return (
      <div>
        <Grid textAlign="center" verticalAlign="middle">
          <Grid.Column width={8}>
            <Header>Register</Header>
            <Segment attached>
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
              <Dimmer inverted active={loader.active}>
                <Loader indeterminate size="big">
                  Creating your user account......
                </Loader>
              </Dimmer>
            </Segment>
            <Message
              attached="bottom"
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
