import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import _ from 'lodash';

import { Card, Image, Button, Icon } from 'semantic-ui-react';

import { adminVerifyUser, adminAdminiUser } from '../../../actions/user';
import { selectUserManage } from '../../../reducers/selectors';

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
            <Image src="http://lorempixel.com/400/400/people" />
            <Card.Content>
              <Card.Header>
                {user.firstName} {user.lastName}
              </Card.Header>
              <Card.Meta>{user.userId}</Card.Meta>
              <Card.Meta>{user.username}</Card.Meta>
              <Card.Description>
                <span style={{ marginTop: '0.25em' }}>
                  <Button
                    animated="vertical"
                    onClick={this.adminiUser}
                    value={user._id}
                  >
                    {!user.isAdmin ? (
                      <div>
                        <Button.Content hidden>Promote</Button.Content>
                        <Button.Content visible>
                          <Icon name="spy" color="green" />
                        </Button.Content>
                      </div>
                    ) : (
                      <div>
                        <Button.Content hidden>Demote</Button.Content>
                        <Button.Content visible>
                          <Icon name="ban" color="red" />
                        </Button.Content>
                      </div>
                    )}
                  </Button>

                  <Button
                    floated="right"
                    animated="vertical"
                    onClick={this.suspendUser}
                    value={user._id}
                  >
                    <Button.Content hidden>Suspend</Button.Content>
                    <Button.Content visible>
                      <Icon name="ban" color="red" />
                    </Button.Content>
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

AdminUserDetailsCard = connect(mapStateToProps, mapDispatchToProps)(
  AdminUserDetailsCard
);

export default AdminUserDetailsCard;
