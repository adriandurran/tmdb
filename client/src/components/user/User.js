import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchUser } from '../../actions/auth';
import { selectUserName, selectUserRoleNames } from '../../reducers';

// import UserRoles from './UserRoles';
import UserCourses from './UserCourses';
// import UserComps from './UserComps';

class User extends Component {
  componentDidMount() {
    const userId = this.props.match.params.id;
    const { fetchUser } = this.props;
    fetchUser(userId);
  }

  renderRoles(roles) {
    return roles.map(role => {
      return (
        <li className="collection-item" key={role.roleId}>
          {role.rolename}
        </li>
      );
    });
  }

  render() {
    const { authUser, userName, userRoles } = this.props;
    return (
      <div className="row">
        <div className="col s12 l10 offset-l1">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <div>{userName}</div>
              <div className="row">
                <div className="col s6 l5">
                  <ul className="collection with-header blue-grey-text text-darken-1">
                    <li className="collection-header">Roles</li>
                    {this.renderRoles(userRoles)}
                  </ul>
                  {/* <UserRoles uroles={authUser.roles} /> */}
                </div>
                <div className="col s6 l5">
                  {/* <UserComps ucomps={authUser.courses} /> */}
                </div>
              </div>
              <div className="row">
                <div className="col s12">
                  <UserCourses ucourses={authUser.courses} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { auth, roles } = state;
  return {
    authUser: state.auth.user,
    userName: selectUserName(state),
    userRoles: selectUserRoleNames(state)
  };
};

const mapDispatchToProps = { fetchUser };

export default connect(mapStateToProps, mapDispatchToProps)(User);
