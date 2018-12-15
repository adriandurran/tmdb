import React from 'react';

import { Grid } from 'semantic-ui-react';
import AdminOJTMenu from './AdminOJTMenu';
import AdminOJTBuilder from './AdminOJTBuilder';

const AdminOJTManager = () => {
  return (
    <div>
      <AdminOJTMenu />
      <Grid celled attached="bottom">
        <Grid.Row columns={2}>
          <Grid.Column width={10}>
            <AdminOJTBuilder />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default AdminOJTManager;
