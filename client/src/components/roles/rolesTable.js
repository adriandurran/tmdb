import _ from 'lodash';
import React, { Component } from 'react';
import { Table, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { fetchRoles } from '../../actions/roles';
import { selectRoles } from '../../reducers/selectors/roleSelectors';

class RolesTable extends Component {
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

  render() {
    const { column, data, direction } = this.state;

    return (
      <div>
        <Header as="h2" textAlign="center">
          Roles
        </Header>
        <Table sortable celled fixed structured>
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
          <Table.Body>
            {_.map(data, ({ _id, roleName, competencies }) => (
              <Table.Row key={_id}>
                <Table.Cell>{roleName}</Table.Cell>
                <Table.Cell>Coming soon</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

const mapDispatchToProps = {
  fetchRoles
};

const mapStateToProps = state => {
  return {
    roles: selectRoles(state)
  };
};

RolesTable = connect(
  mapStateToProps,
  mapDispatchToProps
)(RolesTable);

export default RolesTable;
