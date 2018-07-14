import React, { Component } from 'react';
import { Grid, Header, Form, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import semanticFormField from '../shared/semanticFormField';
import { required } from '../../utils/validation';

import AppFeedbackTypeList from './AppFeedbackTypeList';

import { addFeedbackType } from '../../actions/extra';

class AppFeedbackType extends Component {
  newFeedbackType(values) {
    // new feedback
    this.props.addFeedbackType(values);
  }

  render() {
    const { handleSubmit, submitting, pristine } = this.props;

    return (
      <div>
        <Header as="h3" textAlign="center">
          Add Feedback types
        </Header>
        <Grid centered>
          <Grid.Row>
            <Grid.Column width={8}>
              <Form
                onSubmit={handleSubmit(values => this.newFeedbackType(values))}
              >
                <Field
                  fluid
                  component={semanticFormField}
                  type="text"
                  name="feedbackType"
                  placeholder="Feedback Type"
                  as={Form.Input}
                  validate={required}
                />
                <Button
                  fluid
                  disabled={pristine || submitting}
                  type="submit"
                  size="large"
                >
                  Submit
                </Button>
              </Form>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={8}>
              <AppFeedbackTypeList />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const mapDispatchToProps = {
  addFeedbackType
};

AppFeedbackType = connect(
  null,
  mapDispatchToProps
)(AppFeedbackType);

export default reduxForm({
  form: 'addFeedbackType'
})(AppFeedbackType);
