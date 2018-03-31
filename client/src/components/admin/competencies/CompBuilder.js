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

import { withStyles } from 'material-ui/styles';
import withRoot from '../../../withRoot';
import rootStyles from '../../../styles/rootStyle';

import { selectCourses } from '../../../reducers/selectors';

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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 500
    }
  }
};

class CompBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: []
    };
  }

  handleChange = event => {
    console.log(event.target.value);
    this.setState({ name: event.target.value });
  };

  render() {
    const { handleSubmit, submitting, classes, courses } = this.props;

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
              <div className={classes.formContainer} />
              <Select
                multiple
                className={classes.formFields}
                value={this.state.name}
                onChange={this.handleChange}
                MenuProps={MenuProps}
                renderValue={selected => (
                  <div className={classes.chips}>
                    {selected.map(value => (
                      <Chip
                        key={value}
                        label={value}
                        className={classes.chip}
                      />
                    ))}
                  </div>
                )}
              >
                {courses.map(course => {
                  return (
                    <MenuItem key={course.id} value={course.id}>
                      {course.coursename}
                    </MenuItem>
                  );
                })}
              </Select>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    courses: selectCourses(state)
  };
};

const mapDispatchToProps = {};

CompBuilder = withRoot(withStyles(rootStyles)(CompBuilder));
CompBuilder = connect(mapStateToProps, mapDispatchToProps)(CompBuilder);

export default reduxForm({
  form: 'compbuilder'
  //   validate,
})(CompBuilder);
