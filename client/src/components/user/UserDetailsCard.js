import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { Card, Image } from 'semantic-ui-react';

import { selectCurrentUser } from '../../reducers/selectors/userSelectors';

class UserDetailsCard extends Component {
  render() {
    const { user } = this.props;
    return (
      <div>
        <Card centered>
          <Image src={user.imageUrl} />
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
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: selectCurrentUser(state)
  };
};

UserDetailsCard = connect(mapStateToProps)(UserDetailsCard);

export default UserDetailsCard;
