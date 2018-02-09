import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import _ from 'lodash';

import UserRoles from './UserRoles';
import UserCourses from './UserCourses';

class User extends Component {
  componentDidMount() {
    const userId = this.props.match.params.id;
    this.props.fetchUser(userId);
  }

  renderComps() {
    return this.props.userComps.map(comp => {
      return (
        <li className="collection-item" key={comp.compId}>
          {comp.compname}
        </li>
      );
    });
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
                  <ul className="collection with-header blue-grey-text text-darken-1">
                    <li className="collection-header">Competencies</li>
                    {this.renderComps()}
                  </ul>
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

function mapStateToProps({ user, comps }) {
  return {
    user,

    userComps: _.filter(comps, x => _.isEqual(comps.courseIds, user.courseIds))
  };
}

export default connect(mapStateToProps, actions)(User);
