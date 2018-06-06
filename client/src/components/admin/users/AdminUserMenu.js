import React from 'react';
import { Dropdown, Menu, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const AdminUserMenu = props => {
  return (
    <Menu attached="top">
      <Dropdown item icon="wrench" simple>
        <Dropdown.Menu>
          <Dropdown.Item name="Dashboard" as={Link} to="/admin/dashboard">
            <Icon name="home" />
            Dashboard
          </Dropdown.Item>
          <Dropdown.Item
            name="User Access Manager"
            as={Link}
            to="/admin/user-access-manager"
          >
            <Icon name="users" />
            User Access Manager
          </Dropdown.Item>
          <Dropdown.Item name="User Manager" as={Link} to="/admin/user-manager">
            <Icon name="user circle" />
            User Roles &amp; Courses Manager
          </Dropdown.Item>
          <Dropdown.Item
            name="User Course Manager"
            as={Link}
            to="/admin/user-course-manager"
          >
            <Icon name="user circle outline" />
            User Course Manager
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Menu>
  );
};

export default AdminUserMenu;
