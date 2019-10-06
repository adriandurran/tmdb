import React from 'react';
import { Header, Icon, Card, Segment } from 'semantic-ui-react';

import ReportsDashBoard from './ReportsDashBoard';
import DeptDashBoard from './DeptDashBoard';
import UserDashBoard from './UserDashBoard';
import RoleDashBoard from './RoleDashBoard';
import CompDashBoard from './CompDashBoard';
import CourseDashBoard from './CourseDashBoard';
// import OJTDashBoard from './OJTDashBoard';
import AppDashBoard from './AppDashBoard';
import WizardDashBoard from './WizardDashBoard';

const AdminDashboard = () => {
  return (
    <>
      <Header as="h1" textAlign="center">
        <Icon name="dashboard" />
        Admin Dashboard
      </Header>

      <Segment basic style={{ marginTop: '2em' }}>
        <Card.Group itemsPerRow={1}>
          <UserDashBoard />
          <DeptDashBoard />
        </Card.Group>

        <Card.Group itemsPerRow={3}>
          <RoleDashBoard />
          <CompDashBoard />
          <CourseDashBoard />
          {/* <OJTDashBoard /> */}
        </Card.Group>
        <Card.Group itemsPerRow={1}>
          <WizardDashBoard />
          <ReportsDashBoard />
          <AppDashBoard />
        </Card.Group>
      </Segment>
    </>
  );
};

export default AdminDashboard;
