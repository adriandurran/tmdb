import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Select from 'material-ui/Select';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Chip from 'material-ui/Chip';
import Paper from 'material-ui/Paper';

import { withStyles } from 'material-ui/styles';
import withRoot from '../../../withRoot';
import rootStyles from '../../../styles/rootStyle';

import {
  selectCourses,
  selectCompBuilderCourseNames
} from '../../../reducers/selectors';
import {
  addCourseForCompBuilder,
  removeCourseForCompBuilder
} from '../../../actions/courses';
import { adminAddNewComp } from '../../../actions/comps';

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
    const { removeCourseForCompBuilder } = this.props;
    removeCourseForCompBuilder(course.id);
  };

  submitNewComp(values, dispatch) {
    const { compCourses, adminAddNewComp } = this.props;
    let compCourseIds = compCourses.map(course => course.id);
    let newComp = {
      compname: values.compname,
      shortname: values.shortname.toUpperCase(),
      courseIds: compCourseIds
    };
    adminAddNewComp(newComp);
  }

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
            <form onSubmit={handleSubmit(values => this.submitNewComp(values))}>
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
                  name="courseSelector"
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
                <Paper name="courses" className={classes.formFields}>
                  {compCourses.map(course => {
                    return (
                      <Chip
                        name="chippers"
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

const mapStateToProps = state => {
  return {
    courses: selectCourses(state),
    compCourses: selectCompBuilderCourseNames(state)
  };
};

const mapDispatchToProps = {
  addCourseForCompBuilder,
  removeCourseForCompBuilder,
  adminAddNewComp
};

CompBuilder = withRoot(withStyles(rootStyles)(CompBuilder));
CompBuilder = connect(mapStateToProps, mapDispatchToProps)(CompBuilder);

export default reduxForm({
  form: 'compbuilder'
  //   validate,
})(CompBuilder);
