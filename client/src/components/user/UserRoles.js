import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectUserRoles } from '../../reducers/selectors/userSelectors';

import { Item, Header, Segment } from 'semantic-ui-react';

class UserRoles extends Component {
  renderUserRoles() {
    const { userRoles } = this.props;
    return userRoles.map(role => {
      return (
        <Item key={role._id}>
          <Item.Content>
            <Item.Header>{role.roleName}</Item.Header>
            <Item.Extra>
              {role.competencies.length} Competencies required for this Role
            </Item.Extra>
          </Item.Content>
        </Item>
      );
    });
  }

  render() {
    return (
      <div>
        <Segment padded>
          <Header as="h2" textAlign="center">
            Roles
          </Header>
          <Item.Group>{this.renderUserRoles()}</Item.Group>
        </Segment>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userRoles: selectUserRoles(state)
  };
};

UserRoles = connect(mapStateToProps)(UserRoles);

export default UserRoles;
