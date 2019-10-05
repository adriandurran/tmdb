import React from 'react';
import { Menu, Icon, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  selectAllUsersVerify,
  selectAllUsersCoursesVerify,
  selectAllUsersActive
} from '../../../reducers/selectors/adminSelectors';

const AdminUserMenu = () => {
  const UsersWaiting = useSelector(selectAllUsersVerify);
  const UsersActive = useSelector(selectAllUsersActive);
  const CoursesVerify = useSelector(selectAllUsersCoursesVerify);

  return (
    <Menu compact attached="top">
      <Menu.Item name="User Tools" as={Link} to="/admin/user-tools">
        <Icon name="home" />
        User Tools
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
      <Menu.Item as={Link} to="/admin/user-views">
        <Label color="red" floating>
          {UsersWaiting.length}
        </Label>
        All User View
      </Menu.Item>
    </Menu>
  );
};

export default AdminUserMenu;
