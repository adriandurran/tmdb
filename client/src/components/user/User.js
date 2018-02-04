import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import _ from 'lodash';

import UserRoles from './UserRoles';

class User extends Component {
  componentWillMount() {
    const userId = this.props.match.params.id;
    this.props.fetchUser(userId);
  }

  renderCourses() {
    return this.props.userCourses.map(course => {
      return (
        <li className="collection-item" key={course.courseId}>
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
                  <UserRoles uroles={[1]} />
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

function mapStateToProps({ user, courses, comps }) {
  return {
    user,
    userCourses: _.filter(courses, x =>
      _.includes(_.map(user.courses, 'courseId'), x.courseId)
    ),
    userComps: _.filter(comps, x => _.isEqual(comps.courseIds, user.courseIds))
  };
}

export default connect(mapStateToProps, actions)(User);
