import React from 'react';

import { Grid } from 'semantic-ui-react';

import CompBuilder from './CompBuilder';
import AdminCompsTable from './AdminCompsTable';
import AdminCompTypes from './AdminCompTypes';
import AdminManagerMenu from '../shared/AdminManagerMenu';

const AdminCompManager = props => {
  return (
    <div>
      <AdminManagerMenu />
      <Grid celled attached="bottom">
        <Grid.Row columns={2}>
          <Grid.Column width={10}>
            <CompBuilder />
          </Grid.Column>
          <Grid.Column width={6}>
            <AdminCompTypes />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <AdminCompsTable />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default AdminCompManager;
