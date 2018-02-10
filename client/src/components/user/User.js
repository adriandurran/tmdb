import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import _ from 'lodash';

import UserRoles from './UserRoles';
import UserCourses from './UserCourses';
import UserComps from './UserComps';

class User extends Component {
  componentDidMount() {
    const userId = this.props.match.params.id;
    this.props.fetchUser(userId);
  }

  render() {
    const { user } = this.props;
    return (
      <div className="row">
        <div className="col s12 l10 offset-l1">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <div>
                {user.firstname} {user.lastname}
              </div>
              <div className="row">
                <div className="col s6 l5">
                  <UserRoles uroles={user.roles} />
                </div>
                <div className="col s6 l5">
                  <UserComps ucomps={user.courses} />
                </div>
              </div>
              <div className="row">
                <div className="col s12">
                  <UserCourses ucourses={user.courses} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ user }) {
  return { user };
}

export default connect(mapStateToProps, actions)(User);
