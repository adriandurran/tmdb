import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

const AdminOJTMenu = () => {
  return (
    <Menu attached="top">
      <Menu.Item
        name="OJT Tools"
        as={Link}
        to={'/admin/ojt-tools'}
        icon="home"
      />
      <Menu.Item name="OJT Manager" as={Link} to={'/admin/ojt-manager'} />
    </Menu>
  );
};

export default AdminOJTMenu;
