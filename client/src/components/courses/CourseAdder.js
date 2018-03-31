import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import moment from 'moment';

import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';

import rootStyles from '../../styles/rootStyle';
import withRoot from '../../withRoot';
import { withStyles } from 'material-ui/styles';

import CourseAutoCompleteField from './CourseAutoComplete';
import { selectCurrentUser } from '../../reducers/selectors';
import { patchUserCourses } from '../../actions/user';

const renderTextField = ({
  input,
  label,
  type,
  max,
  className,

  meta: { touched, error },
  // ...custom
}) => (
  <TextField
    required
    placeholder={label}
    error={touched && error}
    {...input}
    type={type}
    helperText={touched && error}
    className={className}
    max={max}
  />
);

const CurrentDate = moment(new Date()).format('YYYY-MM-DD');

class CourseAdder extends Component {
  submitNewCourse(values, dispatch) {
    const { auth, patchUserCourses } = this.props;

    let newCourse = {
      courseId: values.course,
      passDate: values.passdate,
      verified: false,
    };

    let newUserCourses = [...auth.courses, newCourse];
    patchUserCourses(auth, newUserCourses).then(result => {
      console.log(result);
      // maybe clear out fields......
    });
  }

  render() {
    const { handleSubmit, submitting, classes } = this.props;
    return (
      <div>
        <Typography
          variant="display1"
          gutterBottom
          align="center"
          component="h5"
        >
          Add a Course
        </Typography>
        <form
          className={classes.formContainer}
          onSubmit={handleSubmit(values => this.submitNewCourse(values))}
        >
          <CourseAutoCompleteField
            name="course"
            className={classes.formFields}
          />
          <Field
            name="passdate"
            type="date"
            max={CurrentDate}
            component={renderTextField}
            className={classes.formFields}
          />
          <Button type="submit" variant="raised" disabled={submitting}>
            Submit
          </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: selectCurrentUser(state),
  };
};

const mapDispatchToProps = {
  patchUserCourses,
};

CourseAdder = withStyles(rootStyles)(CourseAdder);
CourseAdder = connect(mapStateToProps, mapDispatchToProps)(CourseAdder);

export default withRoot(
  reduxForm({
    form: 'courseadder',
  })(CourseAdder)
);
