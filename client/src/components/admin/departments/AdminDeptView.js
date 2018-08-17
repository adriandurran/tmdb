import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import { Header, Grid, Breadcrumb } from 'semantic-ui-react';

import { selectDept } from '../../../reducers/selectors/deptSelectors';

import AdminDeptEdit from './AdminDeptEdit';
import AdminDeptHolders from './AdminDeptHolders';

class AdminDeptView extends Component {
  render() {
    const { dept } = this.props;
    return (
      <div>
        <Header as="h2" textAlign="center">
          Department View
        </Header>
        <Breadcrumb style={{ marginBottom: '2em' }}>
          <Breadcrumb.Section link as={Link} to="/admin/department-tools">
            Department Tools
          </Breadcrumb.Section>
          <Breadcrumb.Divider icon="right chevron" />
          <Breadcrumb.Section link as={Link} to="/admin/dept-manager">
            Department Manager
          </Breadcrumb.Section>
          <Breadcrumb.Divider icon="right arrow" />
          <Breadcrumb.Section active>
            {_.isEmpty(dept)
              ? 'No Department found'
              : `Details for ${dept.departmentName}`}
          </Breadcrumb.Section>
        </Breadcrumb>
        <Grid columns={2} centered>
          <Grid.Column>
            <Grid.Column>
              <AdminDeptEdit />
            </Grid.Column>
          </Grid.Column>
          <Grid.Column>
            <AdminDeptHolders />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dept: selectDept(state)
  };
};

AdminDeptView = connect(mapStateToProps)(AdminDeptView);

export default AdminDeptView;
