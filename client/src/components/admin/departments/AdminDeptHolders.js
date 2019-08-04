import React from 'react';
import Moment from 'react-moment';

import { Header, Item } from 'semantic-ui-react';

const AdminDeptHolders = ({ users }) => {
  const renderDeptHolders = () => {
    return users.map((user) => {
      return (
        <Item key={user._id}>
          <Item.Image size="tiny" circular src={user.imageUrl} />
          <Item.Content>
            <Item.Header>
              {user.firstName} {user.lastName}
            </Item.Header>
            <Item.Meta>{user.username}</Item.Meta>
            <Item.Extra>
              Joined <Moment fromNow>{user.joinDate}</Moment>
            </Item.Extra>
          </Item.Content>
        </Item>
      );
    });
  };

  return (
    <>
      <Header as="h3" textAlign="center">
        Users who are in this Department
      </Header>
      <Item.Group>{renderDeptHolders()}</Item.Group>
    </>
  );
};

export default AdminDeptHolders;
