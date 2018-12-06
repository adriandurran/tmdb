import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';

import {
  fetchCourses,
  fetchCourseLevels,
  fetchCourseTypes
} from '../../actions/courses';

import CoursesSearch from '../courses/CoursesSearch';
import UserCoursesAdd from './courses/UserCoursesAdd';
import UserCourses from './courses/UserCourses';

class CoursesHome extends Component {
  componentDidMount() {
    const { fetchCourses, fetchCourseLevels, fetchCourseTypes } = this.props;
    fetchCourses();
    fetchCourseLevels();
    fetchCourseTypes();
  }

  render() {
    return (
      <div>
        <Grid>
          {/*  insert another row here with courses needed to achieve req comps */}
          <Grid.Row columns={2}>
            <Grid.Column>
              <CoursesSearch />
            </Grid.Column>
            <Grid.Column>
              <UserCoursesAdd />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <UserCourses />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const mapDispatchToProps = {
  fetchCourses,
  fetchCourseLevels,
  fetchCourseTypes
};

export default connect(
  null,
  mapDispatchToProps
)(CoursesHome);
