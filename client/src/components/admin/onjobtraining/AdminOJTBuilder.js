import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { Header, Grid, Form, Button, Dropdown } from 'semantic-ui-react';

import { fetchOJTTypes } from '../../../actions/ojt';
import { selectOJTTypesForDropDown } from '../../../reducers/selectors/ojtsSelectors';

import semanticFormField from '../../shared/semanticFormField';

class AdminOJTBuilder extends Component {
  componentDidMount() {
    this.props.fetchOJTTypes();
  }

  handleSelectChange = (e, item) => {
    this.setState({
      cOJTType: item.value
    });
  };

  submitNewOJT(values) {
    console.log(values);
  }

  render() {
    const { ojtTypes, handleSubmit, submitting, pristine } = this.props;
    return (
      <div>
        <Header as="h2" textAlign="center">
          On the Job Training Builder
        </Header>
        <Grid centered>
          <Grid.Row>
            <Grid.Column>
              <Form
                onSubmit={handleSubmit((values) => this.submitNewOJT(values))}
              >
                <Form.Group inline>
                  <Field
                    component={semanticFormField}
                    as={Form.Input}
                    type="text"
                    name="ojtName"
                    placeholder="OJT Name"
                  />
                  <Field
                    component={semanticFormField}
                    as={Form.Input}
                    type="number"
                    name="hours"
                    placeholder="Hours required"
                  />
                  <Dropdown
                    selection
                    name="ojtTypes"
                    options={ojtTypes}
                    placeholder="OJT Type"
                    onChange={this.handleSelectChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Button
                    fluid
                    disabled={pristine || submitting}
                    type="submit"
                    size="medium"
                  >
                    Add On the Job Training
                  </Button>
                </Form.Group>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ojtTypes: selectOJTTypesForDropDown(state)
  };
};

const mapDispatchToProps = {
  fetchOJTTypes
};

AdminOJTBuilder = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminOJTBuilder);

export default reduxForm({
  form: 'ojtbuilder'
})(AdminOJTBuilder);
