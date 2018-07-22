import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import _ from 'lodash';

import { Card, Image, Button, Icon } from 'semantic-ui-react';

import { adminVerifyUser, adminAdminiUser } from '../../../actions/user';
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
            <Image src={user.imageUrl} />
            <Card.Content>
              <Card.Header>
                {user.firstName} {user.lastName}
              </Card.Header>
              <Card.Meta>{user.userId}</Card.Meta>
              <Card.Meta>{user.username}</Card.Meta>
              <Card.Description>
                <span style={{ marginTop: '0.25em' }}>
                  <Button onClick={this.adminiUser} value={user._id}>
                    {!user.isAdmin ? (
                      <span>
                        <Icon name="spy" color="green" />
                        Promote
                      </span>
                    ) : (
                      <span>
                        <Icon name="ban" color="red" />
                        Demote
                      </span>
                    )}
                  </Button>

                  <Button
                    floated="right"
                    onClick={this.suspendUser}
                    value={user._id}
                  >
                    <Icon name="ban" color="red" />
                    Suspend
                  </Button>
                </span>
              </Card.Description>
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

const mapDispatchToProps = {
  adminVerifyUser,
  adminAdminiUser
};

AdminUserDetailsCard = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminUserDetailsCard);

export default AdminUserDetailsCard;
