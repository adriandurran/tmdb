import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

import { Grid, Header, Form, Button, Dropdown } from 'semantic-ui-react';

import { selectCoursesForDropDown } from '../../../reducers/selectors/courseSelectors';
import { selectCompetencyTypesForDropDown } from '../../../reducers/selectors/compSelectors';
import { fetchCourses } from '../../../actions/courses';
import { adminAddNewComp, fetchCompTypes } from '../../../actions/comps';

import semanticFormField from '../../shared/semanticFormField';

class CompBuilder extends Component {
  componentDidMount() {
    const { fetchCompTypes, fetchCourses } = this.props;
    fetchCourses();
    fetchCompTypes();
  }

  handleSelectChange = (e, item) => {
    this.setState({
      cForC: item.value
    });
  };

  handleSelectCompChange = (e, item) => {
    this.setState({
      cForCType: item.value
    });
  };

  submitNewComp(values) {
    const { adminAddNewComp } = this.props;
    let newComp = {
      compName: values.compName,
      shortName: values.shortName.toUpperCase(),
      courses: this.state.cForC,
      compType: this.state.cForCType
    };
    adminAddNewComp(newComp).then(() =>
      this.setState({ cForC: [], cForCType: '' })
    );
  }

  render() {
    const {
      handleSubmit,
      submitting,
      pristine,
      courses,
      compTypes
    } = this.props;

    return (
      <div>
        <Header as="h2" textAlign="center">
          Competency Builder
        </Header>
        <Grid centered>
          <Grid.Row>
            <Grid.Column>
              <Form
                onSubmit={handleSubmit(values => this.submitNewComp(values))}
              >
                <Form.Group inline widths="equal">
                  <Field
                    fluid
                    component={semanticFormField}
                    as={Form.Input}
                    type="text"
                    name="shortName"
                    placeholder="Short name"
                  />
                  <Field
                    fluid
                    name="compName"
                    component={semanticFormField}
                    as={Form.Input}
                    type="text"
                    placeholder="Competency Name"
                  />
                  <Dropdown
                    selection
                    name="compTypes"
                    options={compTypes}
                    placeholder="Select a Competency Type"
                    onChange={this.handleSelectCompChange}
                  />
                </Form.Group>
                {/* <Form.Group inline> */}
                <Dropdown
                  fluid
                  selection
                  multiple
                  name="compCourses"
                  options={courses}
                  placeholder="Select a Course"
                  onChange={this.handleSelectChange}
                />
                {/* </Form.Group> */}

                <Form.Group>
                  <Button
                    fluid
                    disabled={pristine || submitting}
                    type="submit"
                    size="medium"
                  >
                    Add Competency
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

const mapStateToProps = state => {
  return {
    courses: selectCoursesForDropDown(state),
    compTypes: selectCompetencyTypesForDropDown(state)
  };
};

const mapDispatchToProps = {
  adminAddNewComp,
  fetchCourses,
  fetchCompTypes
};

CompBuilder = connect(
  mapStateToProps,
  mapDispatchToProps
)(CompBuilder);

export default reduxForm({
  form: 'compbuilder'
})(CompBuilder);
