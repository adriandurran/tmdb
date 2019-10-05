import React from 'react';
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import Moment from 'react-moment';
import { Header, Card, Image } from 'semantic-ui-react';

import { selectUserManage } from '../../../reducers/selectors/adminSelectors';

const AdminUserDetails = () => {
  const user = useSelector(selectUserManage);

  return (
    <>
      {!isEmpty(user) && (
        <>
          <Header as="h3" textAlign="center">
            User
          </Header>
          <Card centered>
            <Card.Content>
              <Image src={user.imageUrl} floated="right" size="tiny" rounded />
              <Card.Header>
                {user.firstName} {user.lastName}
              </Card.Header>
              <Card.Meta>{user.userId}</Card.Meta>
              <Card.Description>{user.username}</Card.Description>
            </Card.Content>
            <Card.Content extra>
              Joined <Moment fromNow>{user.joinDate}</Moment>
            </Card.Content>
          </Card>
        </>
      )}
    </>
  );
};

export default AdminUserDetails;
