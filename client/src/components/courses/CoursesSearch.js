import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { Search, Header } from 'semantic-ui-react';

import {
  fetchCourses,
  clearCourseSearchResult,
  fetchCourse
} from '../../actions/courses';
import { selectCoursesForSearch } from '../../reducers/selectors/courseSelectors';

class CoursesSearch extends Component {
  // when component mounts it fetches courses
  // selector to display only 'active' courses
  // once selected add the course to redux 'course reducer'
  componentDidMount() {
    this.props.fetchCourses();
  }

  componentWillUnmount() {
    this.resetComponent();
  }
  componentWillMount() {
    this.resetComponent();
  }

  resetComponent = () => {
    this.setState({ isLoading: false, results: [], value: '' });
    this.props.clearCourseSearchResult();
  };

  handleResultSelect = (e, { result }) => {
    this.setState({
      value: result.title,
      key: result.key
    });
    // fetch and add to temp while using the course
    this.props.fetchCourse(result.key);
  };

  handleSearchChange = (e, { value }) => {
    const { courses } = this.props;

    this.setState({ isLoading: true, value });
    // clear out the temp user
    this.props.clearCourseSearchResult();

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent();

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
      const isMatch = result => re.test(result.title);

      this.setState({
        isLoading: false,
        results: _.filter(courses, isMatch)
      });
    }, 300);
  };

  render() {
    const { isLoading, value, results } = this.state;
    return (
      <div>
        <Header as="h3">Search for Course Name</Header>
        <Search
          fluid
          loading={isLoading}
          onResultSelect={this.handleResultSelect}
          onSearchChange={_.debounce(this.handleSearchChange, 500, {
            leading: true
          })}
          results={results}
          value={value}
          //   {...this.props}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    courses: selectCoursesForSearch(state)
  };
};

const mapDispatchToProps = {
  fetchCourses,
  clearCourseSearchResult,
  fetchCourse
};

CoursesSearch = connect(
  mapStateToProps,
  mapDispatchToProps
)(CoursesSearch);

export default CoursesSearch;
