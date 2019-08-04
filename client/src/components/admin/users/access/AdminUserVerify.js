import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';

import { Item, Button, Header, Icon } from 'semantic-ui-react';

import { selectAllUsersVerify } from '../../../../reducers/selectors/adminSelectors';
import {
  adminVerifyUser,
  adminRemoveRegistration
} from '../../../../actions/user';

class AdminUserVerify extends Component {
  verifiyUser = (e, { value }) => {
    this.props.adminVerifyUser(value, true);
  };

  removeRegistration = (e, { value }) => {
    this.props.adminRemoveRegistration(value);
  };

  renderUserVerify() {
    const { verify } = this.props;
    return verify.map((user) => {
      return (
        <Item key={user._id}>
          <Item.Content verticalAlign="middle">
            <Item.Header>
              {user.firstName} {user.lastName}
            </Item.Header>
            <Item.Meta>{user.userId}</Item.Meta>
            <Item.Meta>{user.username}</Item.Meta>
            <Item.Meta>
              Registered <Moment fromNow>{user.joinDate}</Moment>
            </Item.Meta>
            <Item.Extra>
              <Button
                floated="right"
                onClick={this.removeRegistration}
                value={user._id}
              >
                <Icon name="user delete" color="red" />
                Remove Registration
              </Button>
              <Button
                floated="right"
                onClick={this.verifiyUser}
                value={user._id}
              >
                <Icon name="checkmark" color="green" />
                Verify
              </Button>
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
          Verify Users
        </Header>
        <Item.Group divided>{this.renderUserVerify()}</Item.Group>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    verify: selectAllUsersVerify(state)
  };
};

const mapDispatchToProps = {
  adminVerifyUser,
  adminRemoveRegistration
};

AdminUserVerify = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminUserVerify);

export default AdminUserVerify;
