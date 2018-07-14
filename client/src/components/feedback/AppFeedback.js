import React from 'react';

import { Header, Grid } from 'semantic-ui-react';

const AppFeedback = () => {
  return (
    <div>
      <Header as="h2" textAlign="center">
        Application Feedback &amp; Error reporting
      </Header>
      <Grid>
        <Grid.Row>
          <Grid.Column>Add feedback</Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>list feedback</Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default AppFeedback;
