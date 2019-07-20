import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, Button, Image } from 'semantic-ui-react';
import Moment from 'react-moment';

import { adminVerifyUserCourse } from '../../../../actions/user';
import { selectAllUsersCoursesVerify } from '../../../../reducers/selectors/adminSelectors';
import { selectCurrentUser } from '../../../../reducers/selectors/userSelectors';

class AdminUserCoursesManager extends Component {
  verifyCourse = (e, { value }) => {
    const { adminVerifyUserCourse, currUser } = this.props;
    adminVerifyUserCourse(value.userId, value.userCourseId, currUser._id);
  };

  renderCourseList() {
    const { users } = this.props;
    return users.map((user, index) => {
      return (
        <List.Item key={index}>
          <List.Content floated="right">
            <Button
              onClick={this.verifyCourse}
              value={{ userCourseId: user.course._id, userId: user._id }}
            >
              Verify
            </Button>
          </List.Content>
          <Image avatar src={user.imageUrl} />
          <List.Content>
            <List.Header>
              {user.firstName} {user.lastName}
            </List.Header>
            <List.Description>
              {user.course._course.courseName} completed &nbsp;
              <Moment fromNow>{user.course.passDate}</Moment>
            </List.Description>
          </List.Content>
        </List.Item>
      );
    });
  }

  render() {
    return (
      <div>
        <List verticalAlign="middle">{this.renderCourseList()}</List>
      </div>
    );
  }
}

const mapDispatchToProps = {
  adminVerifyUserCourse
};

const mapStateToProps = (state) => {
  return {
    users: selectAllUsersCoursesVerify(state),
    currUser: selectCurrentUser(state)
  };
};

AdminUserCoursesManager = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminUserCoursesManager);

export default AdminUserCoursesManager;
