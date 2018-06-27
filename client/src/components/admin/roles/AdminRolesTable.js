import _ from 'lodash';
import React, { Component } from 'react';
import { Table, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { fetchRoles, fetchRole } from '../../../actions/roles';
import { selectRoles } from '../../../reducers/selectors/roleSelectors';

class AdminRolesTable extends Component {
  state = {
    column: null,
    data: [],
    direction: null
  };

  componentDidMount() {
    const { fetchRoles } = this.props;
    fetchRoles();
    this.setRoles(this.props);
  }

  componentDidUpdate(prevProps) {
    if (this.props.roles !== prevProps.roles) {
      this.setRoles(this.props);
    }
  }

  setRoles(props) {
    this.setState({
      data: props.roles
    });
  }

  handleSort = clickedColumn => () => {
    const { column, data, direction } = this.state;

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: _.sortBy(data, [clickedColumn]),
        direction: 'ascending'
      });

      return;
    }

    this.setState({
      data: data.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending'
    });
  };

  rowClick = id => {
    const { history, fetchRole } = this.props;
    fetchRole(id).then(() => {
      history.push(`/admin/role-manager/view/${id}`);
    });
  };

  renderTableCells(role) {
    return role.competencies.map((comp, index) => {
      return (
        <span key={index}>
          {comp.compName}
          <br />
        </span>
      );
    });
  }

  renderTableRows() {
    const { data } = this.state;
    return data.map(role => {
      return (
        <Table.Row key={role._id} onClick={() => this.rowClick(role._id)}>
          <Table.Cell>{role.roleName}</Table.Cell>
          <Table.Cell>{this.renderTableCells(role)}</Table.Cell>
        </Table.Row>
      );
    });
  }

  render() {
    const { column, direction } = this.state;

    return (
      <div>
        <Header as="h2" textAlign="center">
          Roles
        </Header>
        <Table sortable celled fixed structured selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                sorted={column === 'roleName' ? direction : null}
                onClick={this.handleSort('roleName')}
              >
                Role Name
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'competencies' ? direction : null}
                onClick={this.handleSort('competencies')}
              >
                Competencies
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{this.renderTableRows()}</Table.Body>
        </Table>
      </div>
    );
  }
}

const mapDispatchToProps = {
  fetchRoles,
  fetchRole
};

const mapStateToProps = state => {
  return {
    roles: selectRoles(state)
  };
};

AdminRolesTable = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminRolesTable);

export default withRouter(AdminRolesTable);
