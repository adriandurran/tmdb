import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const AdminUserMenu = props => {
  return (
    <Menu attached="top">
      <Menu.Item name="Dashboard" as={Link} to="/admin/dashboard">
        <Icon name="home" />
        Admin Dashboard
      </Menu.Item>
      <Menu.Item
        name="User Access Manager"
        as={Link}
        to="/admin/user-access-manager"
      />
      <Menu.Item name="User Manager" as={Link} to="/admin/user-manager" />
      <Menu.Item
        name="User Course Manager"
        as={Link}
        to="/admin/user-courses-manager"
      />
      <Menu.Item
        name="Department Manager"
        as={Link}
        to="/admin/department-manager"
      />
    </Menu>
  );
};

export default AdminUserMenu;
