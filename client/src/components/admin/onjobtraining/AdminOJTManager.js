import React from 'react';

import { Grid } from 'semantic-ui-react';
import AdminOJTMenu from './AdminOJTMenu';

const AdminOJTManager = () => {
  return (
    <div>
      <AdminOJTMenu />
      <Grid celled attached="bottom">
        <Grid.Row columns={2} />
      </Grid>
    </div>
  );
};

export default AdminOJTManager;
