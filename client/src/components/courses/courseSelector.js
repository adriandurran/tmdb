import React, { Component } from 'react';
import { connect } from 'react-redux';
import Downshift from 'downshift';

import { withStyles } from 'material-ui/styles';
import rootStyles from '../../styles/rootStyle';
import withRoot from '../../withRoot';

import Input from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import Typography from 'material-ui/Typography';

import { selectCourses } from '../../reducers/selectors';
import debounce from '../../utils/debounce';

class CourseSelector extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [] };
  }

  fetchCourses = debounce(value => {
    const { courses } = this.props;

    let counter = 0;

    const keepers =
      courses.toLowerCase().includes(value.toLowerCase()) && count < 5;

    if (keepers) {
      counter += 1;
    }
    const items = keepers.map(keeper => {
      `${keeper.coursename} Valid for ${keeper.validity} month(s)`;
    });
    this.setState({ items });
  }, 300);

  render() {
    return <div>Course Selector</div>;
  }
}

const mapStateToProps = state => {
  return {
    courses: selectCourses(state)
  };
};

export default connect(mapStateToProps)(CourseSelector);
