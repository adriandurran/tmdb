import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import _ from 'lodash';

import { Header, Message, Segment, Form, Button } from 'semantic-ui-react';

import { selectCurrentUser } from '../../../reducers/selectors/userSelectors';
import { required, email } from '../../../utils/validation';

import { updateUserProfile } from '../../../actions/user';

import semanticFormField from '../../shared/semanticFormField';

class UserDetailsEdit extends Component {
  state = {
    message: {
      visible: true
    }
  };

  componentDidMount() {
    const { user } = this.props;
    if (!_.isEmpty(user)) {
      let message = { ...this.state.message };
      message.header = `Edit ${user.firstName} ${user.lastName}`;
      this.setState({ message });
    }
  }

  resetMessageState() {
    const { user } = this.props;
    let message = {};
    message.header = `Edit ${user.firstName}`;
    setTimeout(() => {
      this.setState({ message });
    }, 3000);
  }

  updateUser(values) {
    const { user, updateUserProfile } = this.props;
    //   update the user
    const profile = {
      firstName: values.firstName,
      lastName: values.lastName,
      username: values.username,
      userId: values.userId
    };
    updateUserProfile(user._id, profile).then(res => {
      let message = { ...this.state.message };

      if (res.status === 200) {
        message.header = 'Success!';
        message.content = `${res.data.firstName} was successfully updated`;
        message.positive = true;
      } else {
        message.header = 'Ooops!';
        message.content = `Something went wrong updating this Course. Error: ${res}`;
        message.negative = true;
      }
      this.setState({ message });
      this.resetMessageState();
    });
  }

  render() {
    const { message } = this.state;
    const { submitting, handleSubmit, pristine, reset } = this.props;
    return (
      <div>
        <Header as="h3" textAlign="center">
          Edit User Details
        </Header>
        <Message
          attached="top"
          header={message.header}
          content={message.content}
          visible={message.visible}
          positive={message.positive}
          negative={message.negative}
        />
        <Segment attached>
          <Form onSubmit={handleSubmit(values => this.updateUser(values))}>
            <Form.Group inline width="equal">
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
            </Form.Group>
            <Field
              validate={[required, email]}
              component={semanticFormField}
              as={Form.Input}
              type="email"
              placeholder="Email address"
              name="username"
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
            <Form.Group inline width="equal">
              <Button
                fluid
                disabled={pristine || submitting}
                loading={submitting}
                type="submit"
              >
                Update
              </Button>
              <Button fluid disabled={pristine || submitting} onClick={reset}>
                Reset
              </Button>
            </Form.Group>
          </Form>
        </Segment>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: selectCurrentUser(state),
    initialValues: selectCurrentUser(state)
  };
};

const mapDispatchToProps = {
  updateUserProfile
};

UserDetailsEdit = reduxForm({
  form: 'editUser',
  enableReinitialize: true
})(UserDetailsEdit);

UserDetailsEdit = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserDetailsEdit);

export default UserDetailsEdit;
