import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';

import { Header, Item } from 'semantic-ui-react';

import { selectUsersCourseHoldersExpired } from '../../../reducers/selectors/adminSelectors';
import { selectCourse } from '../../../reducers/selectors/courseSelectors';

import { expireDate } from '../../../utils/datehelpers';

class AdminCourseHoldersExpired extends Component {
  renderRelCourse(usercourses) {
    const { course } = this.props;
    let relCourse = usercourses.filter(
      usercourse => usercourse._course._id === course._id
    );

    let cPass = relCourse[0].passDate;
    let cValid = relCourse[0]._course.validity;
    let cName = relCourse[0]._course.courseName;
    return (
      <Item.Description
        style={{
          color: 'red'
        }}
      >
        {cName} &nbsp; expired &nbsp;
        <Moment fromNow>{expireDate(cPass, cValid)}</Moment>
      </Item.Description>
    );
  }

  renderCourseHoldersExpired() {
    const { users } = this.props;
    return users.map(user => {
      return (
        <Item key={user._id}>
          <Item.Image size="small" src="http://lorempixel.com/400/400/people" />
          <Item.Content>
            <Item.Header>
              {user.firstName} {user.lastName}
            </Item.Header>
            <Item.Meta>{user.username}</Item.Meta>

            {this.renderRelCourse(user.courses)}

            <Item.Extra>
              Joined <Moment fromNow>{user.joinDate}</Moment>
            </Item.Extra>
          </Item.Content>
        </Item>
      );
    });
  }

  render() {
    return (
      <div>
        <Header as="h3" textAlign="center">
          Users where Course has expired
        </Header>
        <Item.Group>{this.renderCourseHoldersExpired()}</Item.Group>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: selectUsersCourseHoldersExpired(state),
    course: selectCourse(state)
  };
};

AdminCourseHoldersExpired = connect(mapStateToProps)(AdminCourseHoldersExpired);

export default AdminCourseHoldersExpired;
