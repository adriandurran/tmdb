import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

import { Grid, Header, Form, Button, Dropdown } from 'semantic-ui-react';

import semanticFormField from '../../shared/semanticFormField';

import {
  selectCourseTypesForDropDown,
  selectCourseLevelsForDropDown
} from '../../../reducers/selectors/courseSelectors';

import {
  fetchCourseTypes,
  fetchCourseLevels,
  adminAddNewCourse
} from '../../../actions/courses';

class CourseBuilder extends Component {
  componentDidMount() {
    const { fetchCourseLevels, fetchCourseTypes } = this.props;
    fetchCourseLevels();
    fetchCourseTypes();
  }

  handleLevelChange = (e, item) => {
    this.setState({
      level: item.value
    });
  };

  handleTypeChange = (e, item) => {
    this.setState({
      type: item.value
    });
  };

  submitNewCourse(values, dispatch) {
    const { adminAddNewCourse } = this.props;
    let newCourse = {
      courseName: values.courseName,
      validity: values.validity,
      level: this.state.level,
      type: this.state.type
    };

    adminAddNewCourse(newCourse);
  }

  render() {
    const { handleSubmit, submitting, pristine, levels, types } = this.props;

    return (
      <div>
        <Header as="h2" textAlign="center">
          Course Builder
        </Header>
        <Grid centered>
          <Grid.Row>
            <Grid.Column>
              <Form
                onSubmit={handleSubmit(values => this.submitNewCourse(values))}
              >
                <Form.Group inline widths="equal">
                  <Field
                    fluid
                    component={semanticFormField}
                    as={Form.Input}
                    type="text"
                    name="courseName"
                    placeholder="Course name"
                  />
                  <Field
                    fluid
                    name="validity"
                    component={semanticFormField}
                    as={Form.Input}
                    type="number"
                    placeholder="Course Validity"
                  />
                </Form.Group>
                <Form.Group inline widths="equal">
                  <Dropdown
                    selection
                    fluid
                    inline
                    name="type"
                    options={types}
                    placeholder="Select a Course Type"
                    onChange={this.handleTypeChange}
                  />
                  <Dropdown
                    selection
                    fluid
                    inline
                    name="level"
                    options={levels}
                    placeholder="Select a Course Level"
                    onChange={this.handleLevelChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Button
                    fluid
                    disabled={pristine || submitting}
                    type="submit"
                    size="medium"
                  >
                    Add Course
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
    types: selectCourseTypesForDropDown(state),
    levels: selectCourseLevelsForDropDown(state)
  };
};

const mapDispatchToProps = {
  adminAddNewCourse,
  fetchCourseLevels,
  fetchCourseTypes
};

CourseBuilder = connect(
  mapStateToProps,
  mapDispatchToProps
)(CourseBuilder);

export default reduxForm({
  form: 'coursebuilder'
  // validate
})(CourseBuilder);
