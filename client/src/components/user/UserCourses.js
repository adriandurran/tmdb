import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectUserCourseNames } from '../../reducers';

class UserCourses extends Component {
  renderCourses(courses) {
    return courses.map(course => {
      return (
        <li className="collection-item" key={course.courseId}>
          {course.coursename}, Valid for: {course.validity} months, Pass date:{' '}
          {course.passDate}
        </li>
      );
    });
  }

  render() {
    const { userCourses } = this.props;
    return (
      <ul className="collection with-header blue-grey-text text-darken-1">
        <li className="collection-header">Courses</li>
        {this.renderCourses(userCourses)}
      </ul>
    );
  }
}

const mapStateToProps = state => {
  return {
    userCourses: selectUserCourseNames(state)
  };
};

export default connect(mapStateToProps)(UserCourses);
