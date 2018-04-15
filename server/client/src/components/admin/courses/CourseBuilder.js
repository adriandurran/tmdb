import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Select from 'material-ui/Select';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

import { withStyles } from 'material-ui/styles';
import withRoot from '../../../withRoot';
import rootStyles from '../../../styles/rootStyle';

import {
  selectCourseTypes,
  selectCourseLevels
} from '../../../reducers/selectors';

import { adminAddNewCourse } from '../../../actions/courses';

const renderSelectField = ({
  input,
  label,
  className,
  meta: { touched, error },
  children
}) => (
  <Select native {...input} className={className}>
    {children}
  </Select>
);

const renderTextField = ({
  input,
  label,
  type,
  className,

  meta: { touched, error }
}) => (
  <TextField
    required
    placeholder={label}
    error={touched && error}
    {...input}
    type={type}
    helperText={touched && error}
    className={className}
  />
);

class CourseBuilder extends Component {
  submitNewCourse(values, dispatch) {
    const { adminAddNewCourse } = this.props;

    adminAddNewCourse(values);
  }

  render() {
    const {
      handleSubmit,
      submitting,
      classes,
      courseTypes,
      courseLevels
    } = this.props;

    return (
      <div>
        <Card raised className={classes.adminCard}>
          <CardContent>
            <Typography
              variant="display1"
              component="h5"
              gutterBottom
              align="center"
            >
              Course Builder
            </Typography>
            <form
              onSubmit={handleSubmit(values => this.submitNewCourse(values))}
            >
              <div className={classes.formContainer}>
                <Field
                  required
                  component={renderTextField}
                  type="text"
                  name="courseName"
                  label="Course name"
                  className={classes.formFields}
                />
                <Field
                  required
                  component={renderTextField}
                  type="number"
                  name="validity"
                  label="Valid"
                  className={classes.formFields}
                />
              </div>
              <div className={classes.formContainer}>
                <Field
                  component={renderSelectField}
                  name="type"
                  label="Course Type"
                  className={classes.formFields}
                >
                  <option value="">Type</option>
                  <option value="">None</option>
                  {courseTypes.map((type, index) => {
                    return (
                      <option value={type} key={index}>
                        {type}
                      </option>
                    );
                  })}
                </Field>
                <Field
                  component={renderSelectField}
                  name="level"
                  label="Course Level"
                  className={classes.formFields}
                >
                  <option value="">Level</option>
                  <option value="">None</option>
                  {courseLevels.map((level, index) => {
                    return (
                      <option value={level} key={index}>
                        {level}
                      </option>
                    );
                  })}
                </Field>
              </div>
              <div className={classes.formContainer}>
                <div style={{ flex: 1, textAlign: 'center' }} />
                <Button variant="raised" disabled={submitting} type="submit">
                  Submit
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  return errors;
}

const mapStateToProps = state => {
  return {
    courseTypes: selectCourseTypes(state),
    courseLevels: selectCourseLevels(state)
  };
};

const mapDispatchToProps = { adminAddNewCourse };

CourseBuilder = withStyles(rootStyles)(CourseBuilder);
CourseBuilder = connect(mapStateToProps, mapDispatchToProps)(CourseBuilder);

export default withRoot(
  reduxForm({
    form: 'coursebuilder',
    validate
  })(CourseBuilder)
);
