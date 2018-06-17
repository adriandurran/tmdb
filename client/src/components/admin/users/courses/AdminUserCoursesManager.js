import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, List, Button } from 'semantic-ui-react';
import Moment from 'react-moment';

import { selectAllUsersCoursesVerify } from '../../../../reducers/selectors/adminSelectors';

class AdminUserCoursesManager extends Component {
  renderCourseList() {
    const { courses } = this.props;

    return courses.map((course, index) => {
      return (
        <List.Item key={index}>
          <List.Content floated="right">
            <Button>Verify</Button>
          </List.Content>
          <List.Content>
            <List.Header>
              {course.firstName} {course.lastName}
            </List.Header>
            <List.Description>
              {course.courses[0]._course.courseName} completed{' '}
              <Moment fromNow>{course.courses[0].passDate}</Moment>
            </List.Description>
          </List.Content>
        </List.Item>
      );
    });
  }

  render() {
    return (
      <div>
        <Header as="h3" textAlign="center">
          Courses awaiting Verification
        </Header>
        <List verticalAlign="middle">{this.renderCourseList()}</List>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    courses: selectAllUsersCoursesVerify(state)
  };
};

AdminUserCoursesManager = connect(mapStateToProps)(AdminUserCoursesManager);

export default AdminUserCoursesManager;
