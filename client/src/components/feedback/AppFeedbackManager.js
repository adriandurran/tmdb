import React, { Component } from 'react';

import { Header, Grid } from 'semantic-ui-react';

import AppFeedbackType from './AppFeedbackType';
import AdminApplicationToolsMenu from '../admin/shared/AdminApplicationToolsMenu';

class AppFeedbackManager extends Component {
  render() {
    return (
      <div>
        <Header as="h2" textAlign="center">
          Feedback Manager
        </Header>
        <AdminApplicationToolsMenu />

        <Grid centered attached="bottom" style={{ marginTop: '0.5em' }}>
          <Grid.Column>
            <AppFeedbackType />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default AppFeedbackManager;
