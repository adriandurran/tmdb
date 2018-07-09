import React from 'react';

import { Grid, Header } from 'semantic-ui-react';

import UserDetailsEdit from './UserDetailsEdit';
import UserImageAdd from './UserImageAdd';
import UserResetPassword from './UserResetPassword';

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
          <Grid.Column>
            <UserImageAdd />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column>
            <UserResetPassword />
          </Grid.Column>
          <Grid.Column>Possibly Messaging</Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default UserProfile;
