import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

const AdminApplicationToolsMenu = () => {
  return (
    <div>
      <Menu attached="top">
        <Menu.Item
          icon="home"
          name="Admin Dashboard"
          as={Link}
          to="/admin/dashboard"
        />
        <Menu.Item
          name="Feedback Manager"
          as={Link}
          to="/application/feedback-manager"
        />
        <Menu.Item name="Version Manager" as={Link} to="/application/version" />
        <Menu.Item name="Dashboard Manager" as={Link} to="/" />
      </Menu>
    </div>
  );
};

export default AdminApplicationToolsMenu;
