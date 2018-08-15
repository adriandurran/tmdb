import React from 'react';
import { Menu, Icon, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  selectAllUsersVerify,
  selectAllUsersCoursesVerify,
  selectAllUsersActive
} from '../../../reducers/selectors/adminSelectors';
import { selectDepts } from '../../../reducers/selectors/deptSelectors';

const AdminUserMenu = ({ UsersWaiting, UsersActive, CoursesVerify, Depts }) => {
  return (
    <Menu compact attached="top">
      <Menu.Item name="Dashboard" as={Link} to="/admin/dashboard">
        <Icon name="home" />
        Admin Dashboard
      </Menu.Item>
      <Menu.Item as={Link} to="/admin/user-access-manager">
        <Label color="red" floating>
          {UsersWaiting.length}
        </Label>
        User Access Manager
      </Menu.Item>

      <Menu.Item as={Link} to="/admin/user-manager">
        <Label floating>{UsersActive.length}</Label>
        User Manager
      </Menu.Item>

      <Menu.Item as={Link} to="/admin/user-courses-manager">
        <Label floating color="red">
          {CoursesVerify.length}
        </Label>
        User Course Manager
      </Menu.Item>
      <Menu.Item as={Link} to="/admin/department-manager">
        <Label floating>{Depts.length}</Label>
        Department Manager
      </Menu.Item>
    </Menu>
  );
};

const mapStateToProps = (state) => {
  return {
    UsersWaiting: selectAllUsersVerify(state),
    UsersActive: selectAllUsersActive(state),
    CoursesVerify: selectAllUsersCoursesVerify(state),
    Depts: selectDepts(state)
  };
};

export default connect(mapStateToProps)(AdminUserMenu);
