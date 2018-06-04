import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { Search } from 'semantic-ui-react';

import { fetchCourses } from '../../actions/courses';
import { selectCoursesForSearch } from '../../reducers/selectors';

class CoursesSearch extends Component {
  // when component mounts it fetches courses
  // selector to display only 'active' courses
  // once selected add the course to redux 'course reducer'
  componentDidMount() {
    this.props.fetchCourses();
  }

  render() {
    return <div>Course Search</div>;
  }
}

const mapStateToProps = state => {
  return {
    courses: selectCoursesForSearch(state)
  };
};

const mapDispatchToProps = {
  fetchCourses
};

CoursesSearch = connect(mapStateToProps, mapDispatchToProps)(CoursesSearch);

export default CoursesSearch;
