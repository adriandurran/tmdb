import React, { Component } from 'react';
import { Grid, Header, Form, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import AdminCTList from './AdminCTList';
import { addCourseType } from '../../../actions/courses';

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

class AdminCourseTypes extends Component {
  newCourseType(values, dispatch) {
    const { addCourseType } = this.props;
    addCourseType(values);
  }

  render() {
    const { handleSubmit, submitting, pristine } = this.props;
    return (
      <div>
        <Header as="h2" textAlign="center">
          Course Types
        </Header>
        <Grid centered>
          <Grid.Row>
            <Grid.Column width={10}>
              <Form
                onSubmit={handleSubmit(values => this.newCourseType(values))}
              >
                <Form.Group inline widths="equal">
                  <Field
                    fluid
                    component={renderInputField}
                    type="text"
                    name="courseType"
                    label="Course Type"
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
              <AdminCTList />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const mapDispatchToProps = {
  addCourseType
};

AdminCourseTypes = connect(null, mapDispatchToProps)(AdminCourseTypes);

export default reduxForm({
  form: 'courseTypes'
})(AdminCourseTypes);
