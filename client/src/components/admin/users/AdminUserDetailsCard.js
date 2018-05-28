import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import _ from 'lodash';

import { Card, Image } from 'semantic-ui-react';

import { selectUserManage } from '../../../reducers/selectors';

class AdminUserDetailsCard extends Component {
  render() {
    const { user } = this.props;
    return (
      <div>
        {_.isEmpty(user) ? (
          <Card centered>
            <Card.Content description="No user selected" />
          </Card>
        ) : (
          <Card centered>
            <Image src="http://lorempixel.com/400/400/people" />
            <Card.Content>
              <Card.Header>
                {user.firstName} {user.lastName}
              </Card.Header>
              <Card.Meta>{user.userId}</Card.Meta>
              <Card.Meta>{user.username}</Card.Meta>
            </Card.Content>
            <Card.Content extra>
              Joined <Moment fromNow>{user.joinDate}</Moment>
            </Card.Content>
          </Card>
        )}
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
