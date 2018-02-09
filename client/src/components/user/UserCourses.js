import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

class UserCourses extends Component {
  renderCourses() {
    const { userCoursesFull } = this.props;
    return userCoursesFull.map(ucourse => {
      return (
        <li className="collection-item" key={ucourse.courseId}>
          {ucourse.coursename}, {ucourse.passDate}, {ucourse.validity}
        </li>
      );
    });
  }

  render() {
    return (
      <ul className="collection with-header blue-grey-text text-darken-1">
        <li className="collection-header">Courses</li>
        {this.renderCourses()}
      </ul>
    );
  }
}

function mapStateToProps({ courses }, ownProps) {
  // need to create a filter......then union
  //   work in progress
  //   ****** do not change this *****

  return {
    userCoursesFull: _.filter(courses, x =>
      _.includes(_.map(ownProps.ucourses, 'courseId'), x.courseId)
    )

    // _.unionBy(userCourses, ownProps.ucourses, 'courseId')
  };
}

export default connect(mapStateToProps)(UserCourses);
