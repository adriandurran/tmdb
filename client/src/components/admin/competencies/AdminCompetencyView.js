import React from 'react';

import { Header, Grid } from 'semantic-ui-react';

import AdminEditCompetency from './AdminEditCompetency';
import AdminCompetencyHolders from './AdminCompetencyHolders';

const AdminCompetencyView = () => {
  return (
    <div>
      <Header as="h2" textAlign="center">
        Competency View
      </Header>
      <Grid columns={2} centered>
        <Grid.Column>
          <AdminEditCompetency />
        </Grid.Column>
        <Grid.Column>
          <AdminCompetencyHolders />
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default AdminCompetencyView;
