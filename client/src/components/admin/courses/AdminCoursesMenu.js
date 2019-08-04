import React from 'react';
import { Dropdown, Menu, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const AdminCoursesMenu = (props) => {
  return (
    <Menu attached="top">
      <Dropdown item icon="wrench" simple>
        <Dropdown.Menu>
          <Dropdown.Item
            name="Competency Manager"
            as={Link}
            to="/admin/comp-manager"
          >
            Competency Manager
          </Dropdown.Item>
          <Dropdown.Item name="Role Manager" as={Link} to="/admin/role-manager">
            Role Manager
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Menu.Item name="Dashboard" as={Link} to="/admin/course-tools">
        <Icon name="home" />
        Course Tools
      </Menu.Item>
      <Menu.Item name="Course Manager" as={Link} to="/admin/course-manager" />
      <Menu.Item name="Course Types" as={Link} to="/admin/course-types" />
      <Menu.Item name="Course Levels" as={Link} to="/admin/course-levels" />
    </Menu>
  );
};

export default AdminCoursesMenu;
