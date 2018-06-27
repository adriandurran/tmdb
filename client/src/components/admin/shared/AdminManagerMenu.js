import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

const AdminManagerMenu = () => {
  return (
    <div>
      <Menu attached="top">
        <Menu.Item
          icon="home"
          name="Admin Dashboard"
          as={Link}
          to="/admin/dashboard"
        />
        <Menu.Item name="Course Manager" as={Link} to="/admin/course-manager" />
        <Menu.Item
          name="Competency Manager"
          as={Link}
          to="/admin/comp-manager"
        />
        <Menu.Item name="Role Manager" as={Link} to="/admin/role-manager" />
      </Menu>
    </div>
  );
};

export default AdminManagerMenu;
