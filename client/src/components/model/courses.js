import React, { Component } from 'react';
import { connect } from 'react-redux';

class CourseSelector extends Component {
  renderOptions() {
    const { courses } = this.props;
    return courses.map(course => {
      return (
        <option key={course.courseId} value={course.courseId}>
          {course.coursename}
        </option>
      );
    });
  }

  render() {
    return (
      <div>
        <select>{this.renderOptions()}</select>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    courses: state.courses
  };
};

export default connect(mapStateToProps)(CourseSelector);
