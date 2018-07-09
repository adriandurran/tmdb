import React, { Component } from 'react';
import { Grid, Header, Form, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { adminAddCompType } from '../../../actions/comps';

import AdminCTypeList from './AdminCTypeList';

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

class AdminCompTypes extends Component {
  newCompType(values, dispatch) {
    const { adminAddCompType } = this.props;
    adminAddCompType(values);
  }

  render() {
    const { handleSubmit, submitting, pristine } = this.props;
    return (
      <div>
        <Header as="h2" textAlign="center">
          Competency Types
        </Header>
        <Grid centered attached="bottom" style={{ marginTop: '0.5em' }}>
          <Grid.Row>
            <Grid.Column>
              <Form onSubmit={handleSubmit(values => this.newCompType(values))}>
                <Form.Group inline widths="equal">
                  <Field
                    fluid
                    component={renderInputField}
                    type="text"
                    name="compType"
                    label="Competency  Type"
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
            <Grid.Column width={10}>
              <AdminCTypeList />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const mapDispatchToProps = {
  adminAddCompType
};

AdminCompTypes = connect(null, mapDispatchToProps)(AdminCompTypes);

export default reduxForm({
  form: 'compTypes'
})(AdminCompTypes);
