import React from 'react';
import { Grid } from 'semantic-ui-react';

import AdminOJTMenu from './AdminOJTMenu';
import AdminOJTBuilder from './AdminOJTBuilder';
import AdminOJTTypes from './AdminOJTTypes';

const AdminOJTManager = () => {
  return (
    <div>
      <AdminOJTMenu />
      <Grid celled attached="bottom">
        <Grid.Row columns={2}>
          <Grid.Column width={10}>
            <AdminOJTBuilder />
          </Grid.Column>
          <Grid.Column width={6}>
            <AdminOJTTypes />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default AdminOJTManager;
