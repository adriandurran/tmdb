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
        <div className="row">
          <div className="col s12">
            <div className="card blue-grey darken-1">
              <div className="row">
                <div className="col s6">
                  <select className="browser-default">
                    {this.renderOptions()}
                  </select>
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
    courses: state.courses
  };
};

export default connect(mapStateToProps)(CourseSelector);
