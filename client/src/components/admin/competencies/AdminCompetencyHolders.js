import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';

import { Header, Item } from 'semantic-ui-react';

import { selectUsersCompetencyHolders } from '../../../reducers/selectors/adminSelectors';

class AdminCompetencyHolders extends Component {
  renderCompHolders() {
    const { users } = this.props;

    return users.map(user => {
      return (
        <Item key={user._id}>
          <Item.Image size="small" src={user.imageUrl} />
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
  }

  render() {
    return (
      <div>
        <Header as="h3" textAlign="center">
          Users who have this Competency
        </Header>
        <Item.Group>{this.renderCompHolders()}</Item.Group>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: selectUsersCompetencyHolders(state)
  };
};

AdminCompetencyHolders = connect(mapStateToProps)(AdminCompetencyHolders);

export default AdminCompetencyHolders;
