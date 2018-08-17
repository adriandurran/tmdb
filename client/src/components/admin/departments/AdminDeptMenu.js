import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

const AdminDeptMenu = (props) => {
  return (
    <div>
      <Menu attached="top">
        <Menu.Item
          name="Department Tools"
          as={Link}
          to={'/admin/dept-tools'}
          icon="home"
        />

        <Menu.Item
          name="Department Manager"
          as={Link}
          to={'/admin/dept-manager'}
        />
        <Menu.Item name="Department Views" as={Link} to={'/admin/dept-views'} />
      </Menu>
    </div>
  );
};

export default AdminDeptMenu;
