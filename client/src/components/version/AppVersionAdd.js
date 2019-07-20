import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { Header, Form, Button } from 'semantic-ui-react';

import semanticFormField from '../shared/semanticFormField';
import semanticFormTextArea from '../shared/semanticFormTextArea';
import { required } from '../../utils/validation';

import { addNewVersion } from '../../actions/extra';

class AppVersionAdd extends Component {
  submitNewVersion(values) {
    const { versionNotes, versionNumber } = values;
    let versionDate = Date.now();
    let newVersion = {
      versionNumber,
      versionDate,
      versionNotes
    };
    this.props.addNewVersion(newVersion);
  }

  render() {
    const { handleSubmit, submitting, pristine } = this.props;

    return (
      <div>
        <Header as="h3" textAlign="center">
          Add a new version
        </Header>
        <Form onSubmit={handleSubmit(values => this.submitNewVersion(values))}>
          <Field
            component={semanticFormField}
            as={Form.Input}
            type="text"
            placeholder="Enter version number"
            name="versionNumber"
            validate={required}
          />
          <Field
            component={semanticFormTextArea}
            as={Form.TextArea}
            type="text"
            placeholder="Enter version notes"
            name="versionNotes"
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
      </div>
    );
  }
}

const mapDispatchToProps = {
  addNewVersion
};

AppVersionAdd = connect(
  null,
  mapDispatchToProps
)(AppVersionAdd);

export default reduxForm({
  form: 'addVersion',
  enableReinitialize: true
})(AppVersionAdd);
