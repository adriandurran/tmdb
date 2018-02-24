import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { selectUserCourseNames } from '../../reducers/selectors';

class UserCourses extends Component {
  renderCourses(courses) {
    return courses.map((course, index) => {
      return (
        <li className="collection-item" key={index}>
          {course.coursename}, Passed <Moment fromNow>{course.passDate}</Moment>,{' '}
          Expires:{' '}
          <Moment format="DD MMM YYYY" add={{ months: course.validity }}>
            {course.passDate}
          </Moment>
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
