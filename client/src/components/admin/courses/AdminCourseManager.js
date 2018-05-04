import React, { Component } from 'react';
import { Grid, Sidebar, Menu, Icon, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import CourseBuilder from './CourseBuilder';
import CoursesTable from '../../courses/coursesTable';

class AdminCourseManager extends Component {
  state = { visible: false };

  toggleVisibility = () => this.setState({ visible: !this.state.visible });

  render() {
    const { visible } = this.state;
    return (
      <div>
        <Sidebar.Pushable as={Grid}>
          <Sidebar
            as={Menu}
            animation="overlay"
            width="thin"
            visible={visible}
            icon="labeled"
            vertical
            inverted
          >
            <Menu.Item name="Dashboard" as={Link} to="/admin/dashboard">
              <Icon name="home" />
              Dashboard
            </Menu.Item>
            <Menu.Item name="Course Types" as={Link} to="/admin/course-types">
              <Icon name="tags" />
              Types
            </Menu.Item>
            <Menu.Item name="Course Levels" as={Link} to="/admin/course-levels">
              <Icon name="leaf" />
              Levels
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher>
            <Grid celled>
              <Grid.Row>
                <Grid.Column>
                  <Button onClick={this.toggleVisibility} floated="right">
                    Menu
                  </Button>
                  <CourseBuilder />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <CoursesTable />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}

export default AdminCourseManager;
