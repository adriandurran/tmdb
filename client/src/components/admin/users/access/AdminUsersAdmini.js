import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Moment from 'react-moment';

import { Item, Button, Header, Icon } from 'semantic-ui-react';

import { selectAllUsersAdmins } from '../../../../reducers/selectors/adminSelectors';
import { selectCurrentUser } from '../../../../reducers/selectors/userSelectors';

import { adminVerifyUser, adminAdminiUser } from '../../../../actions/user';

const AdminUsersAdmini = () => {
  const dispatch = useDispatch();
  const admins = useSelector(selectAllUsersAdmins);
  const currentUser = useSelector(selectCurrentUser);

  const suspendUser = (e, { value }) => {
    dispatch(adminVerifyUser(value, false));
  };

  const adminiUser = (e, { value }) => {
    dispatch(adminAdminiUser(value, false));
  };

  const renderUserAdmins = () => {
    return admins.map((user) => {
      return (
        <Item key={user._id}>
          <Item.Image size="tiny" src={user.imageUrl} />
          <Item.Content verticalAlign="middle">
            <Item.Header>
              {user.firstName} {user.lastName} &nbsp;
              {user.isSuperAdmin ? (
                <span>Super Admin</span>
              ) : (
                <span>Manager</span>
              )}
            </Item.Header>
            <Item.Meta>{user.userId}</Item.Meta>
            <Item.Meta>{user.username}</Item.Meta>
            <Item.Meta>
              Joined <Moment fromNow>{user.joinDate}</Moment>
            </Item.Meta>
            <Item.Extra>
              <Button
                onClick={(e, value) => adminiUser(e, value)}
                value={user._id}
                disabled={!currentUser.isSuperAdmin}
              >
                <Icon name="ban" color="red" />
                Demote
              </Button>
              <Button
                floated="right"
                onClick={(e, value) => suspendUser(e, value)}
                value={user._id}
                disabled={!currentUser.isSuperAdmin}
              >
                <Icon name="ban" color="red" />
                Suspend
              </Button>
            </Item.Extra>
          </Item.Content>
        </Item>
      );
    });
  };

  return (
    <>
      <Header as="h3" textAlign="center">
        Managers
      </Header>
      <Item.Group divided>{renderUserAdmins()}</Item.Group>
    </>
  );
};

export default AdminUsersAdmini;
