import React from 'react';
import { Dropdown, Menu, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const AdminCoursesMenu = props => {
  return (
    <Menu attached="top">
      <Dropdown item icon="wrench" simple>
        <Dropdown.Menu>
          <Dropdown.Item name="Dashboard" as={Link} to="/admin/dashboard">
            <Icon name="home" />
            Dashboard
          </Dropdown.Item>
          <Dropdown.Item
            name="Course Manager"
            as={Link}
            to="/admin/course-manager"
          >
            <Icon name="cubes" />
            Course Manager
          </Dropdown.Item>
          <Dropdown.Item name="Course Types" as={Link} to="/admin/course-types">
            <Icon name="tags" />
            Course Types
          </Dropdown.Item>
          <Dropdown.Item
            name="Course Levels"
            as={Link}
            to="/admin/course-levels"
          >
            <Icon name="leaf" />
            Course Levels
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Menu.Item name="Competency Manager" as={Link} to="/admin/comp-manager" />
      <Menu.Item name="Role Manager" as={Link} to="/admin/role-manager" />
    </Menu>
  );
};

export default AdminCoursesMenu;
