import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchUser } from '../../actions/auth';
import { selectUserName } from '../../reducers/selectors';

import UserRoles from './UserRoles';
import UserCourses from './UserCourses';

class User extends Component {
  componentDidMount() {
    const empId = this.props.match.params.id;
    const { fetchUser } = this.props;
    fetchUser(empId);
  }

  render() {
    const { userName } = this.props;
    return (
      <div className="row">
        <div className="col s12 l10 offset-l1">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <div>{userName}</div>
              <div className="row">
                <div className="col s6 l5">
                  <UserRoles />
                </div>
                <div className="col s6 l5">
                  {/* <UserComps ucomps={authUser.courses} /> */}
                </div>
              </div>
              <div className="row">
                <div className="col s12">
                  <UserCourses />
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
  return {
    authUser: state.auth.user,
    userName: selectUserName(state)
  };
};

const mapDispatchToProps = { fetchUser };

export default connect(mapStateToProps, mapDispatchToProps)(User);
