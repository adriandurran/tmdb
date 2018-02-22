import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux';

import { addPass, saveUser } from '../../actions';

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
        <Field name="courseId" component="select" placeholder="Course" className="browser-default">
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

  handleSubmit(values) {
    this.props.addPass(values);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.authUser !== this.props.authUser) {
      this.props.saveUser(nextProps.authUser);
    }
  }

  render() {
    return <AddCourseForm onSubmit={this.handleSubmit} courses={this.props.courses} />
  }
}

const mapDispatchToProps = { addPass, saveUser };

const mapStateToProps = state => {
  return {
    authUser: state.auth.user,
    courses: state.courses ? state.courses : []
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserCourseAdder);
