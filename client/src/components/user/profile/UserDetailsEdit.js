import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import _ from 'lodash';

import { Header, Message, Segment, Form, Button } from 'semantic-ui-react';

import { selectCurrentUser } from '../../../reducers/selectors/userSelectors';
import { required, email } from '../../../utils/validation';

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
      this.setState({
        message
      });
    }
  }

  updateUser(values) {
    //   update the user
    // need to think about this
  }

  render() {
    const { message } = this.state;
    const { submitting, handleSubmit, pristine, user } = this.props;
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
              <Button
                fluid
                disabled={pristine || submitting}
                loading={submitting}
              >
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

UserDetailsEdit = reduxForm({
  form: 'editUser',
  enableReinitialize: true
})(UserDetailsEdit);

UserDetailsEdit = connect(mapStateToProps)(UserDetailsEdit);

export default UserDetailsEdit;
