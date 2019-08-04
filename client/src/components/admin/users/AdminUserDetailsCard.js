import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { isEmpty } from 'lodash';

import { Card, Image, Button } from 'semantic-ui-react';

import {
  adminVerifyUser,
  adminAdminiUser,
  adminRemoveRegistration
} from '../../../actions/user';
import { selectUserManage } from '../../../reducers/selectors/adminSelectors';

class AdminUserDetailsCard extends Component {
  suspendUser = (e, { value }) => {
    this.props.adminVerifyUser(value, false);
  };

  adminiUser = (e, { value }) => {
    const { user, adminAdminiUser } = this.props;
    let makeAdmin = false;
    if (!user.isAdmin) {
      makeAdmin = true;
    }

    adminAdminiUser(value, makeAdmin);
  };

  deleteUser = (e, { value }) => {
    console.log(value);
    this.props.adminRemoveRegistration(value);
  };

  render() {
    const { user } = this.props;
    // console.log(user);
    return (
      <div>
        {!isEmpty(user) && (
          <Card centered>
            <Card.Content>
              <Image src={user.imageUrl} floated="right" size="tiny" rounded />
              <Card.Header>
                {user.firstName} {user.lastName}
              </Card.Header>
              <Card.Meta>{user.userId}</Card.Meta>
              <Card.Description>{user.username}</Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div
                style={{ paddingTop: '0.25em' }}
                className={`ui ${
                  user.courses.length === 0 ? `three` : `two`
                } buttons`}
              >
                <Button
                  onClick={this.adminiUser}
                  value={user._id}
                  basic
                  color={!user.isAdmin ? `green` : `red`}
                >
                  {!user.isAdmin ? `Promote` : `Demote`}
                </Button>

                <Button
                  onClick={this.suspendUser}
                  value={user._id}
                  basic
                  color="red"
                >
                  Suspend
                </Button>
                {user.courses.length === 0 && (
                  <Button
                    onClick={this.deleteUser}
                    value={user._id}
                    basic
                    color="red"
                  >
                    Delete
                  </Button>
                )}
              </div>
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

const mapStateToProps = (state) => {
  return {
    user: selectUserManage(state)
  };
};

const mapDispatchToProps = {
  adminVerifyUser,
  adminAdminiUser,
  adminRemoveRegistration
};

AdminUserDetailsCard = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminUserDetailsCard);

export default AdminUserDetailsCard;
