import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

import rootStyles from '../../styles/rootStyle';
import withRoot from '../../withRoot';
import { withStyles } from 'material-ui/styles';

import CourseAutoCompleteField from '../shared/CourseAutoComplete';

class CourseAdder extends Component {
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
          onSubmit={handleSubmit(values => console.log(values))}
        >
          <CourseAutoCompleteField
            name="course"
            className={classes.formFields}
          />
          <Field
            name="passdate"
            type="date"
            component="input"
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

CourseAdder = withStyles(rootStyles)(CourseAdder);

export default withRoot(
  reduxForm({
    form: 'courseadder'
  })(CourseAdder)
);
