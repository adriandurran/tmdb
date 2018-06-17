import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

import { Grid, Header, Form, Button, Dropdown } from 'semantic-ui-react';

import semanticFormField from '../../shared/semanticFormField';

import {
  selectCourseTypes,
  selectCourseLevels
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

  makeLevelOptions() {
    return this.props.courseLevels.map(level => {
      let newLvl = {
        key: level._id,
        value: level.courseLevel,
        text: level.courseLevel
      };
      return newLvl;
    });
  }

  handleTypeChange = (e, item) => {
    this.setState({
      type: item.value
    });
  };

  makeTypeOptions() {
    return this.props.courseTypes.map(type => {
      let newType = {
        key: type._id,
        value: type.courseType,
        text: type.courseType
      };
      return newType;
    });
  }

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
    const { handleSubmit, submitting, pristine } = this.props;

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
                    options={this.makeTypeOptions()}
                    placeholder="Select a Course Type"
                    onChange={this.handleTypeChange}
                  />
                  <Dropdown
                    selection
                    fluid
                    inline
                    name="level"
                    options={this.makeLevelOptions()}
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
    courseTypes: selectCourseTypes(state),
    courseLevels: selectCourseLevels(state)
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
