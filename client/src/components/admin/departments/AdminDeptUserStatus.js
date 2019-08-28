import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Icon, Card } from 'semantic-ui-react';

import { selectAllUsersActive } from '../../../reducers/selectors/adminSelectors';
import { deptUsers, deptRoles } from '../../../utils/deptHelpers';

const AdminDeptUserStatus = ({ dept }) => {
  const users = useSelector(selectAllUsersActive);
  const [departmentUsers, setDepartmentUsers] = useState([]);
  const [departmentRoles, setDepartmentRoles] = useState();

  useEffect(() => {
    const deptUserState = deptUsers(users, dept);
    if (deptUserState.length > 0) {
      setDepartmentUsers(deptUserState);
    }
    const deptRolers = deptRoles(departmentUsers);
    if (deptRolers.length > 0) {
      setDepartmentRoles(deptRolers.length);
    } else {
      setDepartmentRoles(0);
    }
  }, [users, dept]);

  return (
    <>
      <Card.Content extra>
        <span>
          <Icon name="users" />
          &nbsp;
          {departmentUsers.length}&nbsp; Users
        </span>
        <br />
        <span>
          <Icon name="users" />
          &nbsp;
          {departmentRoles}&nbsp; Roles
        </span>
      </Card.Content>
    </>
  );
};

export default AdminDeptUserStatus;
