import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Moment from 'react-moment';

import { Item, Button, Header, Icon } from 'semantic-ui-react';

import { selectAllUsersVerify } from '../../../../reducers/selectors/adminSelectors';
import {
  adminVerifyUser,
  adminRemoveRegistration
} from '../../../../actions/user';

const AdminUserVerify = () => {
  const dispatch = useDispatch();
  const verify = useSelector(selectAllUsersVerify);

  const verifiyUser = (e, { value }) => {
    dispatch(adminVerifyUser(value, true));
  };

  const removeRegistration = (e, { value }) => {
    dispatch(adminRemoveRegistration(value));
  };

  const renderUserVerify = () => {
    return verify.map((user) => {
      return (
        <Item key={user._id}>
          <Item.Content verticalAlign="middle">
            <Item.Header>
              {user.firstName} {user.lastName}
            </Item.Header>
            <Item.Meta>{user.userId}</Item.Meta>
            <Item.Meta>{user.username}</Item.Meta>
            <Item.Meta>
              Registered <Moment fromNow>{user.joinDate}</Moment>
            </Item.Meta>
            <Item.Extra>
              <Button
                floated="right"
                onClick={(e, value) => removeRegistration(e, value)}
                value={user._id}
              >
                <Icon name="user delete" color="red" />
                Remove Registration
              </Button>
              <Button
                floated="right"
                onClick={(e, value) => verifiyUser(e, value)}
                value={user._id}
              >
                <Icon name="checkmark" color="green" />
                Verify
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
        Verify Users
      </Header>
      <Item.Group divided>{renderUserVerify()}</Item.Group>
    </>
  );
};

export default AdminUserVerify;
