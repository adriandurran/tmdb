import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Image } from 'semantic-ui-react';

import { roleUsers, getRole } from '../../../utils/roleHelpers';

import { selectUsersInDept } from '../../../reducers/selectors/adminSelectors';
import { selectRoles } from '../../../reducers/selectors/roleSelectors';

class AdminDeptRoleUsers extends Component {
  render() {
    const { deptUsers, roles, roleId } = this.props;
    const rUsers = roleUsers(deptUsers, roleId);
    const roleComps = getRole(roles, roleId);
    return rUsers.map((user, index) => {
      return (
        <Card key={index} fluid>
          <Card.Content>
            <Image floated="right" size="mini" src={user.imageUrl} />
            <Card.Header>
              {user.firstName} {user.lastName}
            </Card.Header>
            <Card.Meta>{user.username}</Card.Meta>
            <Card.Description>
              Reserved for adding in Role competencies here (and status)
            </Card.Description>
          </Card.Content>
        </Card>
      );
    });
  }
}

const mapStateToProps = (state) => {
  return {
    deptUsers: selectUsersInDept(state),
    roles: selectRoles(state)
  };
};

export default connect(mapStateToProps)(AdminDeptRoleUsers);
