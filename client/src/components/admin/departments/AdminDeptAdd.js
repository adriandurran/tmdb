import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { Header, Form, Button } from 'semantic-ui-react';

import semanticFormField from '../../shared/semanticFormField';
import { required } from '../../../utils/validation';

import { adminAddDept } from '../../../actions/dept';

class AdminDeptAdd extends Component {
  addNewDept(values) {
    const { adminAddDept } = this.props;
    adminAddDept(values);
  }

  render() {
    const { handleSubmit, submitting, pristine } = this.props;

    return (
      <div>
        <Header as="h3" textAlign="center">
          Add a Department
        </Header>
        <Form onSubmit={handleSubmit(values => this.addNewDept(values))}>
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
          <Button
            fluid
            disabled={pristine || submitting}
            loading={submitting}
            type="submit"
            size="large"
          >
            Add Department
          </Button>
        </Form>
      </div>
    );
  }
}

const mapDispatchToProps = { adminAddDept };

AdminDeptAdd = connect(
  null,
  mapDispatchToProps
)(AdminDeptAdd);

AdminDeptAdd = reduxForm({
  form: 'addDept',
  enableReinitialize: true
})(AdminDeptAdd);

export default AdminDeptAdd;
