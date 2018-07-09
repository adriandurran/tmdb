import React, { Component } from 'react';
import { Table, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';

import { selectAllUsersActiveNoDept } from '../../../../reducers/selectors/adminSelectors';
import { fetchUser } from '../../../../actions/user';

class AdminUsersNoDeptTable extends Component {
  state = {
    column: null,
    data: [],
    direction: null
  };

  componentDidMount() {
    this.setUsers(this.props);
  }

  componentDidUpdate(prevProps) {
    if (this.props.users !== prevProps.users) {
      this.setUsers(this.props);
    }
  }

  setUsers(props) {
    this.setState({
      data: props.users
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
    const { history, fetchUser } = this.props;
    fetchUser(id).then(() => {
      history.push(`/admin/user-manager`);
    });
  };

  renderTableCells(roles) {
    return roles.map((role, index) => {
      return (
        <span key={index}>
          {role.roleName}
          <br />
        </span>
      );
    });
  }

  renderTableRows() {
    const { data } = this.state;
    return data.map(user => {
      return (
        <Table.Row key={user._id} onClick={() => this.rowClick(user._id)}>
          <Table.Cell>{user.firstName}</Table.Cell>
          <Table.Cell>{user.lastName}</Table.Cell>
          <Table.Cell>{this.renderTableCells(user.roles)}</Table.Cell>
        </Table.Row>
      );
    });
  }

  render() {
    const { column, direction } = this.state;

    return (
      <div>
        <Header as="h3" textAlign="center">
          Users with no Department assigned
        </Header>
        <Table sortable celled striped selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                sorted={column === 'firstName' ? direction : null}
                onClick={this.handleSort('firstName')}
              >
                First Name
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'lastName' ? direction : null}
                onClick={this.handleSort('lastName')}
              >
                Last Name
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'roles' ? direction : null}
                onClick={this.handleSort('roles')}
              >
                Roles
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{this.renderTableRows()}</Table.Body>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: selectAllUsersActiveNoDept(state)
  };
};

const mapDispatchToProps = {
  fetchUser
};

AdminUsersNoDeptTable = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminUsersNoDeptTable);

export default withRouter(AdminUsersNoDeptTable);
