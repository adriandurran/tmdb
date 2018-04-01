import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Select from 'material-ui/Select';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { MenuItem } from 'material-ui/Menu';
import Chip from 'material-ui/Chip';
import Paper from 'material-ui/Paper';

import { withStyles } from 'material-ui/styles';
import withRoot from '../../../withRoot';
import rootStyles from '../../../styles/rootStyle';

import {
  selectCourses,
  selectCompBuilderCourseNames
} from '../../../reducers/selectors';
import { addCourseForCompBuilder } from '../../../actions/courses';

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

class CompBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: []
    };
  }

  handleSelectChange = event => {
    const { addCourseForCompBuilder } = this.props;
    addCourseForCompBuilder(parseInt(event.target.value, 10));
  };

  handleChipDelete = course => () => {
    console.log(course.id);
  };

  render() {
    const {
      handleSubmit,
      submitting,
      classes,
      courses,
      compCourses
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
              Competency Builder
            </Typography>
            <form onSubmit={values => console.log(values)}>
              <div className={classes.formContainer}>
                <Field
                  required
                  component={renderTextField}
                  type="text"
                  name="shortname"
                  label="Short name"
                  className={classes.formFields}
                />
                <Field
                  required
                  component={renderTextField}
                  type="text"
                  name="compname"
                  label="Competency name"
                  className={classes.formFields}
                />
              </div>
              <div className={classes.formContainer}>
                <Field
                  component={renderSelectField}
                  native
                  name="courses"
                  onChange={this.handleSelectChange}
                  className={classes.formFields}
                >
                  {courses.map(course => {
                    return (
                      <option value={course.id} key={course.id}>
                        {course.coursename}
                      </option>
                    );
                  })}
                </Field>
              </div>
              <div className={classes.formContainer}>
                <Paper className={classes.formFields}>
                  {compCourses.map(course => {
                    return (
                      <Chip
                        className={classes.chip}
                        key={course.id}
                        value={course.id}
                        label={course.coursename}
                        onDelete={this.handleChipDelete(course)}
                      />
                    );
                  })}
                </Paper>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    courses: selectCourses(state),
    compCourses: selectCompBuilderCourseNames(state)
  };
};

const mapDispatchToProps = { addCourseForCompBuilder };

CompBuilder = withRoot(withStyles(rootStyles)(CompBuilder));
CompBuilder = connect(mapStateToProps, mapDispatchToProps)(CompBuilder);

export default reduxForm({
  form: 'compbuilder'
  //   validate,
})(CompBuilder);
