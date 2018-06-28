import React, { Component } from 'react';
import { Grid, Header, Form, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import AdminCLList from './AdminCLList';
import { addCourseLevel } from '../../../actions/courses';
import AdminCoursesMenu from './AdminCoursesMenu';

// need to remove this and import my semantic one
const renderInputField = ({ input, label, type, meta: { touched, error } }) => (
  <Form.Input
    required
    fluid
    placeholder={label}
    error={touched && error}
    {...input}
    type={type}
  />
);

class AdminCourseLevels extends Component {
  newCourseLevel(values, dispatch) {
    const { addCourseLevel } = this.props;
    addCourseLevel(values);
  }

  render() {
    const { handleSubmit, submitting, pristine } = this.props;

    return (
      <div>
        <Header as="h2" textAlign="center">
          Course Levels
        </Header>
        <AdminCoursesMenu />
        <Grid centered attached="bottom" style={{ marginTop: '0.5em' }}>
          <Grid.Row>
            <Grid.Column width={10}>
              <Form
                onSubmit={handleSubmit(values => this.newCourseLevel(values))}
              >
                <Form.Group inline widths="equal">
                  <Field
                    fluid
                    component={renderInputField}
                    type="text"
                    name="courseLevel"
                    label="Course Level"
                  />
                  <Button
                    fluid
                    disabled={pristine || submitting}
                    type="submit"
                    size="large"
                  >
                    Submit
                  </Button>
                </Form.Group>
              </Form>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={8}>
              <AdminCLList />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const mapDispatchToProps = {
  addCourseLevel
};

AdminCourseLevels = connect(
  null,
  mapDispatchToProps
)(AdminCourseLevels);

export default reduxForm({
  form: 'courseLevels'
})(AdminCourseLevels);
