import React from 'react';

import { Header, Grid } from 'semantic-ui-react';

const AdminDeptManager = () => {
  return (
    <div>
      <Header as="h2" textAlign="center">
        Departments
      </Header>
      <Grid columns={2} centered attached="bottom">
        <Grid.Column>add dept</Grid.Column>
        <Grid.Column>view delete dept</Grid.Column>
      </Grid>
    </div>
  );
};

export default AdminDeptManager;
