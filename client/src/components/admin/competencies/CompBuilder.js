import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

import { Grid, Header, Form, Button, Dropdown } from 'semantic-ui-react';

// import Card, { CardContent } from 'material-ui/Card';
// import Typography from 'material-ui/Typography';
// import Select from 'material-ui/Select';
// import TextField from 'material-ui/TextField';
// import Button from 'material-ui/Button';
// import Chip from 'material-ui/Chip';
// import Paper from 'material-ui/Paper';

// import { withStyles } from 'material-ui/styles';
// import withRoot from '../../../withRoot';
// import rootStyles from '../../../styles/rootStyle';

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
  <Form.Input
    required
    fluid
    placeholder={label}
    error={touched && error}
    {...input}
    type={type}
  />
);

const renderDropdownField = ({
  name,
  input,
  label,
  meta: { touched, error },
  options
}) => (
  <Dropdown
    {...input}
    placeholder={label}
    fluid
    multiple
    selection
    options={options}
  />
);

class CompBuilder extends Component {
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
      compName: values.compName,
      shortName: values.shortName.toUpperCase(),
      courseIds: compCourseIds
    };
    adminAddNewComp(newComp);
  }

  render() {
    const {
      handleSubmit,
      submitting,
      pristine,
      courses,
      compCourses
    } = this.props;

    return (
      <div>
        <Header as="h2" textAlign="center">
          Competency Builder
        </Header>
        <Grid centered>
          <Grid.Row>
            <Grid.Column>
              <Form
                onSubmit={handleSubmit(values => this.submitNewComp(values))}
              >
                <Form.Group inline widths="equal">
                  <Field
                    required
                    component={renderTextField}
                    type="text"
                    name="shortName"
                    label="Short name"
                  />
                  <Field
                    required
                    component={renderTextField}
                    type="text"
                    name="compName"
                    label="Competency Name"
                  />
                </Form.Group>
                <Form.Group inline>
                  <Field
                    name="compCourses"
                    component={renderDropdownField}
                    label="Courses"
                    options={courses.map(course => {
                      return {
                        key: course._id,
                        value: course._id,
                        text: course.coursename
                      };
                    })}
                  />
                </Form.Group>

                <Form.Group>
                  <Button
                    fluid
                    disabled={pristine || submitting}
                    type="submit"
                    size="medium"
                  >
                    Add Competency
                  </Button>
                </Form.Group>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        {/* <Card raised className={classes.adminCard}>
          <CardContent>
            
            <Form onSubmit={handleSubmit(values =>
                this.submitNewComp(values)
              )}>
              <div className={classes.formContainer}>
                <Field required component={renderTextField} type="text" name="shortName" label="Short name" className={classes.formFields} />
                <Field required component={renderTextField} type="text" name="compName" label="Competency name" className={classes.formFields} />
              </div>
              <div className={classes.formContainer}>
                <Field component={renderSelectField} native name="courseSelector" onChange={this.handleSelectChange} className={classes.formFields}>
                  {courses.map(course => {
                    return <option value={course._id} key={course._id}>
                        {course.courseName}
                      </option>;
                  })}
                </Field>
              </div>
              <div className={classes.formContainer}>
                <Paper name="courses" className={classes.formFields}>
                  {compCourses.map(course => {
                    return <Chip name="chippers" className={classes.chip} key={course._id} value={course._id} label={course.courseName} onDelete={this.handleChipDelete(course)} />;
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
        </Card> */}
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

CompBuilder = connect(mapStateToProps, mapDispatchToProps)(CompBuilder);

export default reduxForm({
  form: 'compbuilder'
  //   validate,
})(CompBuilder);
