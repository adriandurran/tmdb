import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Image } from 'semantic-ui-react';

import { selectUsersInDept } from '../../../reducers/selectors/adminSelectors';
import { noRoleUsers } from '../../../utils/roleHelpers';

class AdminDeptNoRoleUsers extends Component {
  render() {
    const { deptUsers } = this.props;
    const nrUsers = noRoleUsers(deptUsers);
    return nrUsers.map((user, index) => {
      return (
        <Card key={index} fluid>
          <Card.Content>
            <Image floated="right" size="mini" src={user.imageUrl} />
            <Card.Header>
              {user.firstName} {user.lastName}
            </Card.Header>
            <Card.Meta>{user.username}</Card.Meta>
            <Card.Description>
              Reserved for adding in competencies here (and status)
            </Card.Description>
          </Card.Content>
        </Card>
      );
    });
  }
}

const mapStateToProps = (state) => {
  return { deptUsers: selectUsersInDept(state) };
};

export default connect(mapStateToProps)(AdminDeptNoRoleUsers);
