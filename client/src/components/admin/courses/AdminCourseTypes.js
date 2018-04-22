import React, { Component } from 'react';
import { Grid, Header, Form, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { selectCourseTypes } from '../../../reducers/selectors';

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
  render() {
    const { handleSubmit, submitting, pristine, types } = this.props;
    return (
      <div>
        <Header as="h2" textAlign="center">
          Course Types
        </Header>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Form onSubmit={handleSubmit(values => console.log(values))}>
                <Form.Group widths={8}>
                  <Field
                    component={renderInputField}
                    type="text"
                    name="courseType"
                    label="Course Type"
                  />
                  <Button
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
            <Grid.Column>list</Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    types: selectCourseTypes(state)
  };
};

AdminCourseTypes = connect(mapStateToProps)(AdminCourseTypes);

export default reduxForm({
  form: 'courseTypes'
})(AdminCourseTypes);
