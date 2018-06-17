import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Header, Card, Icon } from 'semantic-ui-react';

import {
  fetchCourses,
  fetchCourseTypes,
  fetchCourseLevels
} from '../../../actions/courses';
import {
  selectCourses,
  selectCourseTypes,
  selectCourseLevels
} from '../../../reducers/selectors/courseSelectors';

class AdminCourseTools extends Component {
  componentDidMount() {
    const { fetchCourses, fetchCourseTypes, fetchCourseLevels } = this.props;
    fetchCourses();
    fetchCourseTypes();
    fetchCourseLevels();
  }

  render() {
    const { courses, types, levels } = this.props;
    return (
      <Card.Group itemsPerRow={3} centered>
        <Card as={Link} to="/admin/course-manager" raised>
          <Card.Content>
            <Header as="h5">Course Manager</Header>
          </Card.Content>
          <Card.Content description="Build and Manage Courses" />
          <Card.Content extra>
            {courses.length > 0 ? (
              <span>
                <Icon name="cubes" />
                {courses.length} Courses loaded
              </span>
            ) : (
              <span>No Courses in the system</span>
            )}
          </Card.Content>
        </Card>
        <Card as={Link} to="/admin/course-types" raised>
          <Card.Content>
            <Header as="h5">Course Types</Header>
          </Card.Content>
          <Card.Content description="Manage Course Types" />
          <Card.Content extra>
            {types.length > 0 ? (
              <span>
                <Icon name="map signs" />
                {types.length} Course types loaded
              </span>
            ) : (
              <span>No Courses types in the system</span>
            )}
          </Card.Content>
        </Card>
        <Card as={Link} to="/admin/course-levels" raised>
          <Card.Content>
            <Header as="h5">Course Levels</Header>
          </Card.Content>
          <Card.Content description="Manage Course Levels" />
          <Card.Content extra>
            {levels.length > 0 ? (
              <span>
                <Icon name="puzzle" />
                {levels.length} Course levels loaded
              </span>
            ) : (
              <span>No Course levels in the system</span>
            )}
          </Card.Content>
        </Card>
      </Card.Group>
    );
  }
}

const mapStateToProps = state => {
  return {
    courses: selectCourses(state),
    types: selectCourseTypes(state),
    levels: selectCourseLevels(state)
  };
};

const mapDispatchToProps = {
  fetchCourses,
  fetchCourseTypes,
  fetchCourseLevels
};

AdminCourseTools = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminCourseTools);

export default AdminCourseTools;
