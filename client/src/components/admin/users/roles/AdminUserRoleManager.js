import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';
import { format, parseISO } from 'date-fns';

import { List, Icon, Button, Select, Header } from 'semantic-ui-react';

import { selectRolesForDropDown } from '../../../../reducers/selectors/roleSelectors';
import { selectUserManage } from '../../../../reducers/selectors/adminSelectors';

import { editUserRole } from '../../../../actions/user';
import { fetchRoles } from '../../../../actions/roles';

const AdminUserRoleManager = () => {
  const roles = useSelector(selectRolesForDropDown);
  const user = useSelector(selectUserManage);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRoles());
  }, []);

  const deleteUserRole = (e, { value }) => {
    dispatch(editUserRole(value, user._id, false));
  };

  const addUserRole = (e, { value }) => {
    const newRole = {
      _role: value,
      joinDate: Date.now()
    };
    dispatch(editUserRole(newRole, user._id, true));
  };

  return (
    <>
      {!isEmpty(user) && (
        <>
          <Header as="h3" textAlign="center">
            Roles
          </Header>
          <List divided verticalAlign="middle">
            {user.roles.map((role) => {
              const { _id, roleName } = role._role;
              return (
                <List.Item key={_id}>
                  <List.Content floated="right">
                    <Button icon onClick={deleteUserRole} value={_id}>
                      <Icon name="delete" />
                    </Button>
                  </List.Content>
                  <List.Header>{roleName}</List.Header>
                  <List.Description>
                    Assigned on {format(parseISO(role.joinDate), 'dd MMM yyyy')}
                  </List.Description>
                </List.Item>
              );
            })}
          </List>

          <Select
            placeholder="Select Roles"
            options={roles}
            onChange={addUserRole}
          />
        </>
      )}
    </>
  );
};

export default AdminUserRoleManager;
