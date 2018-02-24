import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button';

import { patchUserCourses } from '../../actions';

import Select from 'react-select';
import 'react-select/dist/react-select.css';

function selectCourse(course) {
  return (
    <option key={course.courseId} value={course.courseId}>
      {course.coursename}
    </option>
  );
}

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField helperText={label}
    {...input}
    {...custom}
  />
)

let AddCourseForm = props => {
  const { handleSubmit, classes } = props
  return (
    <form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <Field name="courseId" component="select" placeholder="Course"
            className="browser-default" parse={value => parseInt(value, 10)}>
              {props.courses.map(selectCourse)}
          </Field>
        </Grid>
        <Grid item xs>
          <Field name="passDate" component={renderTextField} label="Passed date" type="date" />
        </Grid>
        <Grid item xs>
          <Button type="submit" variant="raised">Add</Button>
        </Grid>
      </Grid>
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
