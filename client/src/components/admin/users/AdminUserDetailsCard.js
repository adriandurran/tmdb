import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { Card } from 'semantic-ui-react';

import { selectUserManage } from '../../../reducers/selectors';

class AdminUserDetailsCard extends Component {
  renderUserCard() {
    const { user } = this.props;
    if (_.isEmpty(user)) {
      return <Card.Content description="No user selected" />;
    }

    return (
      <Card.Content>
        <Card.Header>
          {user.firstName} {user.lastName}
        </Card.Header>
        <Card.Meta>{user.userId}</Card.Meta>
        <Card.Meta>{user.username}</Card.Meta>
      </Card.Content>
    );
  }

  render() {
    return (
      <div>
        <Card centered>{this.renderUserCard()}</Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: selectUserManage(state)
  };
};

AdminUserDetailsCard = connect(mapStateToProps)(AdminUserDetailsCard);

export default AdminUserDetailsCard;
