import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import { Header, Grid, Breadcrumb } from 'semantic-ui-react';

import { selectCompetency } from '../../../reducers/selectors/compSelectors';

import AdminEditCompetency from './AdminEditCompetency';
import AdminCompetencyHolders from './AdminCompetencyHolders';

class AdminCompetencyView extends Component {
  render() {
    const { comp } = this.props;
    return (
      <div>
        <Header as="h2" textAlign="center">
          Competency View
        </Header>
        <Breadcrumb style={{ marginBottom: '2em' }}>
          <Breadcrumb.Section link as={Link} to="/admin/dashboard">
            Admin Dashboard
          </Breadcrumb.Section>
          <Breadcrumb.Divider icon="right chevron" />
          <Breadcrumb.Section link as={Link} to="/admin/comp-manager">
            Competency Manager
          </Breadcrumb.Section>
          <Breadcrumb.Divider icon="right arrow" />
          <Breadcrumb.Section active>
            {_.isEmpty(comp)
              ? 'No Competency found'
              : `Details for ${comp.compName}`}
          </Breadcrumb.Section>
        </Breadcrumb>
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
  }
}

const mapStateToProps = state => {
  return {
    comp: selectCompetency(state)
  };
};

AdminCompetencyView = connect(mapStateToProps)(AdminCompetencyView);

export default AdminCompetencyView;
