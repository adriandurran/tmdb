import React from 'react';

import { Grid } from 'semantic-ui-react';

import CompBuilder from './CompBuilder';
import CompsTable from '../../competencies/compsTable';

const AdminCompManager = props => {
  return (
    <Grid celled>
      <Grid.Row>
        <Grid.Column>
          <CompBuilder />
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
