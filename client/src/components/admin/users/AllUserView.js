import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Table, Header, Icon } from 'semantic-ui-react';
import { sortBy, isEmpty } from 'lodash';
import { selectAllUsers } from '../../../reducers/selectors/adminSelectors';

const AllUserView = () => {
  const allUsers = useSelector(selectAllUsers);
  const [tableState, setTableState] = useState({
    column: null,
    data: allUsers,
    direction: null
  });

  const { column, direction } = tableState;

  const handleSort = (clickedColumn) => () => {
    const { column, data, direction } = tableState;

    if (column !== clickedColumn) {
      setTableState({
        column: clickedColumn,
        data: sortBy(data, [clickedColumn]),
        direction: 'ascending'
      });

      return;
    }

    setTableState({
      data: data.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending'
    });
  };

  const renderRoleCells = (roles) => {
    return roles.map((role, index) => {
      return (
        <span key={index}>
          {role.roleName}
          <br />
        </span>
      );
    });
  };

  const renderTableRows = () => {
    const { data } = tableState;
    return data.map((user) => {
      return (
        <Table.Row key={user._id}>
          <Table.Cell>{user.firstName}</Table.Cell>
          <Table.Cell>{user.lastName}</Table.Cell>
          <Table.Cell>{user.username}</Table.Cell>
          <Table.Cell>
            {isEmpty(user.department)
              ? `No Department Assigned`
              : user.department.departmentName}
          </Table.Cell>
          <Table.Cell verticalAlign="top">
            {renderRoleCells(user.roles)}
          </Table.Cell>
          <Table.Cell textAlign="center">
            {user.verified ? (
              <Icon color="green" name="checkmark" size="large" />
            ) : (
              <Icon name="close" size="large" color="red" />
            )}
          </Table.Cell>
        </Table.Row>
      );
    });
  };

  return (
    <>
      <Header as="h2" textAlign="center">
        All Users
      </Header>
      <Table sortable celled striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={column === 'firstName' ? direction : null}
              onClick={handleSort('firstName')}
            >
              First Name
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'lastName' ? direction : null}
              onClick={handleSort('lastName')}
            >
              Last Name
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'userName' ? direction : null}
              onClick={handleSort('userName')}
            >
              Email Address
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'dept' ? direction : null}
              onClick={handleSort('dept')}
            >
              Department
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'roles' ? direction : null}
              onClick={handleSort('roles')}
            >
              Roles
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'verified' ? direction : null}
              onClick={handleSort('verified')}
            >
              Verified
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{renderTableRows()}</Table.Body>
      </Table>
    </>
  );
};

export default AllUserView;
