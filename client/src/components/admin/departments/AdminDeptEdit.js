import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { isEmpty } from 'lodash';
import { withRouter } from 'react-router-dom';

import { Header, Form, Button, Message, Segment } from 'semantic-ui-react';
import semanticFormField from '../../shared/semanticFormField';
import { required } from '../../../utils/validation';

import {
  clearDept,
  adminUpdateDept,
  adminDeleteDept
} from '../../../actions/dept';
import { selectDept } from '../../../reducers/selectors/deptSelectors';

class AdminDeptEdit extends Component {
  state = {
    message: {
      visible: true
    }
  };

  componentDidMount() {
    const { dept } = this.props;

    if (!isEmpty(dept)) {
      let message = { ...this.state.message };
      message.header = `Edit ${dept.departmentName}`;
      this.setState({
        message
      });
    }
  }

  componentWillUnmount() {
    const { dept } = this.props;
    if (!isEmpty(dept)) {
      this.props.clearDept();
    }
  }

  resetMessageState() {
    const { dept } = this.props;
    let message = {};
    message.header = `Edit ${dept.departmentName}`;
    setTimeout(() => {
      this.setState({ message });
    }, 3000);
  }

  updateDept(values) {
    const { adminUpdateDept, dept } = this.props;

    adminUpdateDept(dept._id, values).then((res) => {
      let message = { ...this.state.message };
      if (res.status === 200) {
        message.header = 'Success!';
        message.content = `${res.data.departmentName} was successfully updated`;
        message.positive = true;
      } else {
        message.header = 'Ooops!';
        message.content = `Something went wrong updating this Dept. Error: ${res}`;
        message.negative = true;
      }
      this.setState({
        message
      });
      this.resetMessageState();
    });
  }

  deleteDept() {
    const { dept, adminDeleteDept, history } = this.props;
    adminDeleteDept(dept._id).then((res) => {
      let message = { ...this.state.message };
      if (res.status === 200) {
        message.header = 'Success!';
        message.content = `Successfully deleted`;
        message.positive = true;
        // history.push('/admin/dept-manager');
      } else {
        message.header = 'Ooops!';
        message.content = `Something went wrong deleting this Dept. Error: ${res}`;
        message.negative = true;
      }
      this.setState({
        message
      });
      this.resetMessageState();
    });
  }

  render() {
    const { message } = this.state;
    const { submitting, handleSubmit, pristine } = this.props;
    return (
      <>
        <Header as="h3" textAlign="center">
          Edit Department
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
          <Form onSubmit={handleSubmit((values) => this.updateDept(values))}>
            <Form.Group widths="equal">
              <Field
                name="departmentCode"
                type="text"
                placeholder="Add a Dept Identifier"
                component={semanticFormField}
                as={Form.Input}
                validate={required}
              />

              <Field
                name="departmentName"
                type="text"
                placeholder="Add a Department Name"
                component={semanticFormField}
                as={Form.Input}
                validate={required}
              />
            </Form.Group>
            <Form.Group inline>
              <Button
                fluid
                disabled={pristine || submitting}
                loading={submitting}
                type="submit"
                size="large"
              >
                Update Department
              </Button>
            </Form.Group>
          </Form>
          {this.props.users.length === 0 && (
            <Form.Group inline>
              <Button
                fluid
                negative
                size="large"
                onClick={() => this.deleteDept()}
              >
                Delete Department
              </Button>
            </Form.Group>
          )}
        </Segment>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dept: selectDept(state),
    initialValues: selectDept(state)
  };
};

const mapDispatchToProps = {
  clearDept,
  adminUpdateDept,
  adminDeleteDept
};

AdminDeptEdit = reduxForm({
  form: 'editDept',
  enableReinitialize: true
})(AdminDeptEdit);

AdminDeptEdit = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminDeptEdit);

export default withRouter(AdminDeptEdit);
