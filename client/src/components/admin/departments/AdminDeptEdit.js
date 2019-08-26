import React, { useState, useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { isEmpty } from 'lodash';
import { withRouter } from 'react-router-dom';

import {
  Header,
  Form,
  Button,
  Message,
  Segment,
  Dropdown
} from 'semantic-ui-react';
import semanticFormField from '../../shared/semanticFormField';
import { required } from '../../../utils/validation';

import {
  clearDept,
  adminUpdateDept,
  adminDeleteDept
} from '../../../actions/dept';
import { selectDept } from '../../../reducers/selectors/deptSelectors';
import { selectAllUsersAdminsForDropdown } from '../../../reducers/selectors/adminSelectors';

let AdminDeptEdit = ({
  submitting,
  handleSubmit,
  users,
  initialValues,
  history
}) => {
  const [message, setMessage] = useState({ visible: true });
  const [deptManagers, setDeptManagers] = useState([]);

  const dispatch = useDispatch();
  const usersAdmin = useSelector(selectAllUsersAdminsForDropdown);
  const dept = useSelector(selectDept);

  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) {
      if (!isEmpty(dept)) {
        setMessage({
          visible: true,
          header: `Edit ${dept.departmentName}`
        });
        setDeptManagers(dept.managers.map((manager) => manager._id));
      }
    }
    return () => (isSubscribed = false);
  }, [dept]);

  const handleSelectChange = (e, item) => {
    setDeptManagers(item.value);
  };

  const resetMessageState = () => {
    let header = `Edit ${dept.departmentName}`;
    setTimeout(() => {
      setMessage({ ...message, header });
    }, 3000);
  };

  const updateDept = (values) => {
    const newDept = { ...values, managers: deptManagers };
    dispatch(adminUpdateDept(dept._id, newDept)).then((res) => {
      let header, content, positive, negative;
      if (res.status === 200) {
        header = 'Success!';
        content = `${res.data.departmentName} was successfully updated`;
        positive = true;
      } else {
        header = 'Ooops!';
        content = `Something went wrong updating this Dept. Error: ${res}`;
        negative = true;
      }
      setMessage({
        ...message,
        header,
        content,
        positive,
        negative
      });
      resetMessageState();
    });
  };

  const deleteDept = () => {
    dispatch(adminDeleteDept(dept._id)).then((res) => {
      let header, content, positive, negative;
      if (res.status === 200) {
        header = 'Success!';
        content = `Successfully deleted`;
        positive = true;
      } else {
        header = 'Ooops!';
        content = `Something went wrong deleting this Dept. Error: ${res}`;
        negative = true;
      }
      setMessage({
        ...message,
        header,
        content,
        positive,
        negative
      });
      setTimeout(() => {
        history.push('/admin/dept-manager');
      }, 3000);
      resetMessageState();
    });
  };

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
        <Form onSubmit={handleSubmit((values) => updateDept(values))}>
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
          <Header as="h4" textAlign="center">
            Managers
          </Header>
          <Form.Group>
            <Dropdown
              fluid
              selection
              multiple
              name="departmentManagers"
              options={usersAdmin}
              placeholder="Select a Manager"
              onChange={handleSelectChange}
              value={deptManagers}
            />
          </Form.Group>
          <Form.Group inline>
            <Button
              fluid
              disabled={submitting}
              loading={submitting}
              type="submit"
              size="large"
            >
              Update Department
            </Button>
          </Form.Group>
        </Form>
        {users.length === 0 && (
          <Form.Group inline>
            <Button fluid negative size="large" onClick={() => deleteDept()}>
              Delete Department
            </Button>
          </Form.Group>
        )}
      </Segment>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
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
