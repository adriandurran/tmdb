import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { Header, Form, Button, Dropdown } from 'semantic-ui-react';

import semanticFormField from '../../shared/semanticFormField';
import { required } from '../../../utils/validation';

import { selectAllUsersAdminsForDropdown } from '../../../reducers/selectors/adminSelectors';
import { adminAddDept } from '../../../actions/dept';

let AdminDeptAdd = ({ handleSubmit, submitting, pristine }) => {
  const [deptManagers, setDeptManagers] = useState([]);
  const dispatch = useDispatch();
  const usersAdmin = useSelector(selectAllUsersAdminsForDropdown);

  const addNewDept = (values) => {
    const newDept = { ...values, managers: deptManagers };
    dispatch(adminAddDept(newDept));
    // add messaging?
  };

  const handleSelectChange = (e, item) => {
    setDeptManagers(item.value);
  };

  return (
    <div>
      <Header as="h3" textAlign="center">
        Add a Department
      </Header>
      <Form onSubmit={handleSubmit((values) => addNewDept(values))}>
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
        <Form.Group>
          <Dropdown
            fluid
            selection
            multiple
            name="departmentManagers"
            options={usersAdmin}
            placeholder="Select a Manager"
            onChange={handleSelectChange}
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
};

AdminDeptAdd = reduxForm({
  form: 'addDept',
  enableReinitialize: true
})(AdminDeptAdd);

export default AdminDeptAdd;
