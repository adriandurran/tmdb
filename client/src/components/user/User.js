import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import _ from 'lodash';

import UserRoles from './UserRoles';

class User extends Component {
  componentDidMount() {
    const userId = this.props.match.params.id;
    this.props.fetchUser(userId);
  }

  renderCourses() {
    return this.props.userCourses.map(course => {
      return (
        <li className={"collection-item" + (course.missing ? " red" : "")} key={course.courseId}>
          {course.coursename}
        </li>
      );
    });
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
    return (
      <div className="row">
        <div className="col s12 l10 offset-l1">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <div>
                {this.props.user.firstname} {this.props.user.lastname}
              </div>
              <div className="row">
                <div className="col s6 l5">
                   <UserRoles uroles={this.props.user.roles} />
                </div>
                <div className="col s6 l5">
                  <ul className="collection with-header blue-grey-text text-darken-1">
                    <li className="collection-header">Competencies</li>
                    {this.renderComps()}
                  </ul>
                </div>
              </div>
              <div className="row">
                <div className="col s6 l5">
                  <ul className="collection with-header blue-grey-text text-darken-1">
                    <li className="collection-header">Courses</li>
                    {this.renderCourses()}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ user, courses, comps, roles }) {
  roles = roles.fullRoles ? roles.fullRoles : []
  const userRoleCompIds = user.roles ? _.flatten(roles.filter(role => user.roles.includes(role.roleId)).map(role => role.compIds)) : [];
  const userRoleCompCourseIds = _.flatten(comps.filter(comp => userRoleCompIds.includes(comp.compId)).map(comp => comp.courseIds))
  const userCourseIds = user.courses ? user.courses.map(({courseId}) => courseId) : [];
  return {
    user,
    userCourses: courses.filter(course => {
      course.missing = userRoleCompCourseIds.includes(course.courseId) && !userCourseIds.includes(course.courseId)
      return userRoleCompCourseIds.includes(course.courseId) || userCourseIds.includes(course.courseId)
    }),
    userComps: comps.filter(comp => userRoleCompIds.includes(comp.compId))
  };
}

export default connect(mapStateToProps, actions)(User);
