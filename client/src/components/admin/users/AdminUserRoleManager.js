import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { selectUserManage } from '../../../reducers/selectors';

import { Card, Grid } from 'semantic-ui-react';

class AdminUserRoleManager extends Component {
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
        <Grid columns={2}>
          <Grid.Column>
            <Card centered>{this.renderUserCard()}</Card>
          </Grid.Column>
          <Grid.Column>Role items in here</Grid.Column>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: selectUserManage(state)
  };
};

AdminUserRoleManager = connect(mapStateToProps)(AdminUserRoleManager);

export default AdminUserRoleManager;
