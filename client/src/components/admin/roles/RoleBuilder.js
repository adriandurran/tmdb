import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

import { Grid, Header, Form, Button, Dropdown } from 'semantic-ui-react';

import { selectCompetenciesForDropDown } from '../../../reducers/selectors/compSelectors';
import { fetchComps } from '../../../actions/comps';
import { adminAddNewRole } from '../../../actions/roles';

import semanticFormField from '../../shared/semanticFormField';

class RoleBuilder extends Component {
  componentDidMount() {
    this.props.fetchComps();
  }

  handleSelectChange = (e, item) => {
    this.setState({
      cForR: item.value
    });
  };

  // makeCompOptions() {
  //   return this.props.comps.map(comp => {
  //     let statComp = {
  //       key: comp._id,
  //       value: comp._id,
  //       text: comp.compName
  //     };
  //     return statComp;
  //   });
  // }

  submitNewRole(values, dispatch) {
    const { adminAddNewRole } = this.props;
    let newRole = {
      roleName: values.roleName,
      competencies: this.state.cForR
    };
    adminAddNewRole(newRole);
  }

  render() {
    const { handleSubmit, submitting, pristine, comps } = this.props;
    return (
      <div>
        <Header as="h2" textAlign="center">
          Role Builder
        </Header>

        <Grid centered>
          <Grid.Row>
            <Grid.Column>
              <Form
                onSubmit={handleSubmit(values => this.submitNewRole(values))}
              >
                <Form.Group inline widths="equal">
                  <Field
                    fluid
                    component={semanticFormField}
                    as={Form.Input}
                    type="text"
                    name="roleName"
                    placeholder="Role name"
                  />
                </Form.Group>
                <Dropdown
                  fluid
                  selection
                  multiple
                  name="roleComps"
                  options={comps}
                  placeholder="Select competencies"
                  onChange={this.handleSelectChange}
                />
                <Form.Group>
                  <Button
                    fluid
                    disabled={pristine || submitting}
                    type="submit"
                    size="medium"
                  >
                    Add Role
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

const mapDispatchToProps = {
  fetchComps,
  adminAddNewRole
};

const mapStateToProps = state => {
  return {
    comps: selectCompetenciesForDropDown(state)
  };
};

RoleBuilder = connect(
  mapStateToProps,
  mapDispatchToProps
)(RoleBuilder);

export default reduxForm({
  form: 'rolebuilder'
})(RoleBuilder);
