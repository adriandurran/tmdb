import React from 'react';

import { Grid } from 'semantic-ui-react';

import CompBuilder from './CompBuilder';
import CompsTable from '../../competencies/compsTable';
import AdminCompTypes from './AdminCompTypes';

const AdminCompManager = props => {
  return (
    <Grid celled>
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
          <CompsTable />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default AdminCompManager;
