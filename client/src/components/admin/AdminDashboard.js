import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header, Icon, Card, Segment, Dimmer, Loader } from 'semantic-ui-react';

import { fetchDepts } from '../../actions/dept';
import { fetchAllUsers } from '../../actions/user';
import { fetchRoles } from '../../actions/roles';
import { fetchComps, fetchCompTypes } from '../../actions/comps';
import {
  fetchCourses,
  fetchCourseTypes,
  fetchCourseLevels
} from '../../actions/courses';
import { fetchVersions, fetchFeedbackTypes } from '../../actions/extra';

class AdminDashboard extends Component {
  state = {
    active: true
  };

  componentDidMount() {
    const {
      fetchDepts,
      fetchAllUsers,
      fetchRoles,
      fetchComps,
      fetchCompTypes,
      fetchCourses,
      fetchCourseTypes,
      fetchCourseLevels,
      fetchVersions,
      fetchFeedbackTypes
    } = this.props;
    try {
      fetchDepts();
      fetchAllUsers();
      fetchRoles();
      fetchComps();
      fetchCompTypes();
      fetchCourses();
      fetchCourseTypes();
      fetchCourseLevels();
      fetchVersions();
      fetchFeedbackTypes();
    } catch (error) {
      return this.setState({ active: true });
    }
    this.setState({ active: false });
  }

  render() {
    const { active } = this.state;
    return (
      <div>
        <Header as="h1" textAlign="center">
          <Icon name="dashboard" />
          Admin Dashboard
        </Header>

        <Segment basic style={{ marginTop: '2em' }}>
          {/* <Card.Group itemsPerRow={1}>
            <Card as={Link} to="/admin/dept-tools" raised>
              <Card.Content>
                <Header as="h2">Unit</Header>
              </Card.Content>
              <Card.Content description="Unit Views & Reports" />
              <Card.Content extra />
            </Card>
          </Card.Group> */}
          <Card.Group itemsPerRow={2}>
            <Card as={Link} to="/admin/dept-tools" raised>
              <Card.Content>
                <Header as="h2">Departments</Header>
              </Card.Content>
              <Card.Content description="Add & Manage & View Departments" />
              <Card.Content extra />
            </Card>
            <Card as={Link} to="/admin/user-tools" raised>
              <Card.Content>
                <Header as="h2">Users</Header>
              </Card.Content>
              <Card.Content description="Add & Manage & View Users" />
              <Card.Content extra />
            </Card>
          </Card.Group>
          <Card.Group itemsPerRow={4}>
            <Card as={Link} to="/admin/role-tools" raised>
              <Card.Content>
                <Header as="h2">Roles</Header>
              </Card.Content>
              <Card.Content description="Add & Manage & View Roles" />
              <Card.Content extra />
            </Card>
            <Card as={Link} to="/admin/comp-tools" raised>
              <Card.Content>
                <Header as="h2">Competencies</Header>
              </Card.Content>
              <Card.Content description="Add & Manage & View Competencies" />
              <Card.Content extra />
            </Card>
            <Card as={Link} to="/admin/course-tools" raised>
              <Card.Content>
                <Header as="h2">Courses</Header>
              </Card.Content>
              <Card.Content description="Add & Manage & View Courses" />
              <Card.Content extra />
            </Card>
            <Card as={Link} to="/admin/ojt-tools" raised>
              <Card.Content>
                <Header as="h2">On the Job Training</Header>
              </Card.Content>
              <Card.Content description="Add & Manage On the Job Training" />
              <Card.Content extra />
            </Card>
          </Card.Group>
          <Card.Group itemsPerRow={1}>
            <Card as={Link} to="/admin/app-tools" raised>
              <Card.Content>
                <Header as="h2">Application</Header>
              </Card.Content>
              <Card.Content description="Manage & View Application Settings" />
              <Card.Content extra />
            </Card>
          </Card.Group>
          <Dimmer inverted active={active}>
            <Loader indeterminate size="huge">
              Fetching data please wait.....
            </Loader>
          </Dimmer>
        </Segment>
      </div>
    );
  }
}

const mapDispatchToProps = {
  fetchDepts,
  fetchAllUsers,
  fetchRoles,
  fetchComps,
  fetchCompTypes,
  fetchCourses,
  fetchCourseTypes,
  fetchCourseLevels,
  fetchVersions,
  fetchFeedbackTypes
};

AdminDashboard = connect(
  null,
  mapDispatchToProps
)(AdminDashboard);

export default AdminDashboard;
