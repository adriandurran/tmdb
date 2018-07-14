import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import {
  Segment,
  Header,
  Button,
  Form,
  Dropdown,
  Message,
  Label
} from 'semantic-ui-react';

import semanticFormTextArea from '../shared/semanticFormTextArea';
import { required } from '../../utils/validation';

import { selectCurrentUser } from '../../reducers/selectors/userSelectors';
import { selectLatestVersion } from '../../reducers/selectors/extraSelectors';

class AppFeedbackAdd extends Component {
  submitAppFeedback(values) {
    // submit feedback
  }

  handleTypeChange = (e, item) => {
    this.setState({
      type: item.value
    });
  };

  render() {
    const { handleSubmit, submitting, pristine, version, user } = this.props;

    return (
      <div>
        <Segment attached>
          <Header as="h3" textAlign="center">
            Add feedback
          </Header>
          <Form
            onSubmit={handleSubmit(values => this.submitAppFeedback(values))}
          >
            <Form.Group>
              <Label>Application version: {version.versionNumber}</Label>
              <Label>
                Submitted by: {user.firstName} {user.lastName}
              </Label>
            </Form.Group>
            <Dropdown
              style={{ marginBottom: '1em' }}
              selection
              fluid
              inline
              name="type"
              //   options={types}
              placeholder="Select Feedback Type"
              onChange={this.handleTypeChange}
            />
            <Field
              validate={required}
              component={semanticFormTextArea}
              as={Form.TextArea}
              type="text"
              placeholder="Enter feedback with as much detail as you can give..."
              name="feedbackNotes"
            />
            <Button
              disabled={pristine || submitting}
              loading={submitting}
              type="submit"
              style={{ marginTop: '15px' }}
            >
              Submit
            </Button>
          </Form>
        </Segment>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: selectCurrentUser(state),
    version: selectLatestVersion(state)
  };
};

AppFeedbackAdd = connect(mapStateToProps)(AppFeedbackAdd);

export default reduxForm({
  form: 'newFeedback'
})(AppFeedbackAdd);
