import React from 'react';
import AppFeedbackAdd from './AppFeedbackAdd';
import AppFeedbackList from './AppFeedbackList';

import { Header, Grid } from 'semantic-ui-react';

const AppFeedback = () => {
  return (
    <div>
      <Header as="h2" textAlign="center">
        Application Feedback &amp; Error reporting
      </Header>
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <AppFeedbackAdd />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <AppFeedbackList />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default AppFeedback;
