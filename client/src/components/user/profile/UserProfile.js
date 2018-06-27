import React from 'react';

import { Grid, Header } from 'semantic-ui-react';

import UserDetailsEdit from './UserDetailsEdit';

const UserProfile = () => {
  return (
    <div>
      <Header as="h2" textAlign="center">
        User Profile
      </Header>
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column>
            <UserDetailsEdit />
          </Grid.Column>
          <Grid.Column>Upload Image</Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column>Reset Password</Grid.Column>
          <Grid.Column>Possibly Messaging</Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default UserProfile;
