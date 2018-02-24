import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux';

import { patchUserCourses } from '../../actions';

function selectCourse(course) {
  return (
    <option key={course.courseId} value={course.courseId}>
      {course.coursename}
    </option>
  );
}

let AddCourseForm = props => {
  const { handleSubmit } = props
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field name="courseId" component="select" placeholder="Course"
          className="browser-default" parse={value => parseInt(value, 10)}>
            {props.courses.map(selectCourse)}
        </Field>
      </div>
      <div>
        <Field name="passDate" component="input" type="date" placeholder="Passed date" />
      </div>
      <button type="submit">Add</button>
    </form>
  )
}

AddCourseForm = reduxForm({
  form: 'addCourse'
})(AddCourseForm)

class UserCourseAdder extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit({courseId, passDate}) {
    const courses = this.props.authUser.courses.concat(
      [{courseId: courseId, passDate: passDate}]);
    this.props.patchUserCourses(this.props.authUser, courses);
  }

  render() {
    return <AddCourseForm onSubmit={this.handleSubmit} courses={this.props.courses} />
  }
}

const mapDispatchToProps = { patchUserCourses };

const mapStateToProps = state => {
  return {
    authUser: state.auth.user,
    courses: state.courses ? state.courses : []
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserCourseAdder);
