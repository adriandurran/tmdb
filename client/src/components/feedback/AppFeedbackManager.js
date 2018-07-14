import React, { Component } from 'react';

import { Header, Grid } from 'semantic-ui-react';

import AppFeedbackType from './AppFeedbackType';

class AppFeedbackManager extends Component {
  render() {
    return (
      <div>
        <Header as="h2" textAlign="center">
          Feedback Manager
        </Header>
        <Grid centered>
          <Grid.Column>
            <AppFeedbackType />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default AppFeedbackManager;
