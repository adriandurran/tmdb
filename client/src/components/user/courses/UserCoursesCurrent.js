import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Table, Header } from 'semantic-ui-react';

import { selectUserCoursesCurrent } from '../../../reducers/selectors';

class UserCoursesCurrent extends Component {
  render() {
    const { courses } = this.props;
    return (
      <div>
        {courses.length > 0 ? (
          <Header as="h3" textAlign="center">
            Current Courses
          </Header>
        ) : (
          <Header as="h3" textAlign="center">
            No Current Courses
          </Header>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    courses: selectUserCoursesCurrent(state)
  };
};

UserCoursesCurrent = connect(mapStateToProps)(UserCoursesCurrent);

export default UserCoursesCurrent;
