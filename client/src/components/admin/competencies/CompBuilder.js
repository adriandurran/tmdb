import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

import { Grid, Header, Form, Button, Dropdown } from 'semantic-ui-react';

import {
  selectCourses,
  selectCoursesForDropDown,
  selectCompetencyTypes
} from '../../../reducers/selectors';
import { fetchCourses } from '../../../actions/courses';
import { adminAddNewComp } from '../../../actions/comps';

import semanticFormField from '../../shared/semanticFormField';

class CompBuilder extends Component {
  componentDidMount() {
    this.props.fetchCourses();
  }

  handleSelectChange = (e, item) => {
    this.setState({
      cForC: item.value
    });
  };

  submitNewComp(values, dispatch) {
    const { adminAddNewComp } = this.props;
    let newComp = {
      compName: values.compName,
      shortName: values.shortName.toUpperCase(),
      courses: this.state.cForC
    };
    adminAddNewComp(newComp).then(() => this.setState({ cForC: [] }));
  }

  // makeCourseOptions() {
  //   return this.props.courses.map(course => {
  //     let statCourse = {
  //       key: course._id,
  //       value: course._id,
  //       text: course.courseName
  //     };
  //     return statCourse;
  //   });
  // }

  render() {
    const { handleSubmit, submitting, pristine, courses } = this.props;

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
    compTypes: selectCompetencyTypes(state)
  };
};

const mapDispatchToProps = {
  adminAddNewComp,
  fetchCourses
};

CompBuilder = connect(mapStateToProps, mapDispatchToProps)(CompBuilder);

export default reduxForm({
  form: 'compbuilder'
})(CompBuilder);
