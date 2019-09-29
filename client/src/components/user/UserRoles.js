import React from 'react';
import { useSelector } from 'react-redux';
import { selectUserRoles } from '../../reducers/selectors/userSelectors';
import { isEmpty } from 'lodash';

import { Item, Header, Segment } from 'semantic-ui-react';

const UserRoles = () => {
  const userRoles = useSelector(selectUserRoles);

  const renderUserRoles = () => {
    return userRoles.map((role, i) => {
      if (isEmpty(role._role)) {
        return <div key={i} />;
      }
      const { competencies, roleName } = role._role;
      return (
        <Item key={role._id}>
          <Item.Content>
            <Item.Header>{roleName}</Item.Header>
            <Item.Extra>
              {competencies.length} competencies required for this Role
            </Item.Extra>
          </Item.Content>
        </Item>
      );
    });
  };

  return (
    <div>
      <Segment padded>
        <Header as="h2" textAlign="center">
          Roles
        </Header>
        <Item.Group>{renderUserRoles()}</Item.Group>
      </Segment>
    </div>
  );
};

export default UserRoles;
