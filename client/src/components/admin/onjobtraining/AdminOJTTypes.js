import React, { Component } from 'react';
import { Grid, Header, Form, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import AdminOJTTypesList from './AdminOJTTypesList';
import semanticFormField from '../../shared/semanticFormField';
import { addOJTType } from '../../../actions/ojt';

class AdminOJTTypes extends Component {
  submitNewOJTType(values) {
    this.props.addOJTType(values);
  }

  render() {
    const { handleSubmit, submitting, pristine } = this.props;
    return (
      <div>
        <Header as="h2" textAlign="center">
          OJT Types
        </Header>
        <Grid centered attached="bottom" style={{ marginTop: '0.5em' }}>
          <Grid.Row>
            <Grid.Column>
              <Form
                onSubmit={handleSubmit((values) =>
                  this.submitNewOJTType(values)
                )}
              >
                <Field
                  fluid
                  component={semanticFormField}
                  type="text"
                  name="ojtType"
                  placeholder="OJT Type"
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
            <Grid.Column width={10}>
              <AdminOJTTypesList />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const mapDispatchToProps = {
  addOJTType
};

AdminOJTTypes = connect(
  null,
  mapDispatchToProps
)(AdminOJTTypes);

export default reduxForm({
  form: 'ojtTypes'
})(AdminOJTTypes);
