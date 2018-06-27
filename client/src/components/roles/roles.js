import React, { Component } from 'react';
import { connect } from 'react-redux';

import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableFooter,
  TableSortLabel,
  TablePagination
} from 'material-ui/Table';
import Tooltip from 'material-ui/Tooltip';

import { withStyles } from 'material-ui/styles';
import withRoot from '../../withRoot';
import rootStyles from '../../styles/rootStyle';

import { selectRoles } from '../../reducers/selectors/roleSelectors';

const columnData = [
  {
    id: 'Role',
    numeric: false,
    disablePadding: false,
    label: 'Role Name'
  }
];

class EnhancedRolesTableHead extends Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy } = this.props;

    return (
      <TableHead>
        <TableRow>
          {columnData.map(column => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === column.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

class Roles extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      order: 'desc',
      orderBy: 'Passed',
      data: [],
      page: 0,
      rowsPerPage: 10
    };
  }

  setRoles(props) {
    this.setState({
      data: props.roles.sort((a, b) => (a.type > b.type ? -1 : 1))
    });
  }

  componentDidMount() {
    this.setRoles(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.roles !== nextProps.roles) {
      this.setRoles(nextProps);
    }
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    const data =
      order === 'desc'
        ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

    this.setState({ data, order, orderBy });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  renderRoles() {
    const { data, rowsPerPage, page } = this.state;

    return data
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((role, index) => {
        return (
          <TableRow key={index}>
            <TableCell>{role.rolename}</TableCell>
          </TableRow>
        );
      });
  }
  render() {
    const { data, rowsPerPage, page, order, orderBy } = this.state;
    const { classes } = this.props;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    return (
      <div>
        <Card className={classes.adminCard}>
          <CardContent>
            <Typography
              variant="display1"
              component="h5"
              gutterBottom
              align="center"
            >
              Roles
            </Typography>
            <div>
              <Table>
                <EnhancedRolesTableHead
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={this.handleRequestSort}
                />
                <TableBody>
                  {this.renderRoles()}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 49 * emptyRows }}>
                      <TableCell colSpan={3} />
                    </TableRow>
                  )}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      colSpan={3}
                      count={data.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      backIconButtonProps={{ 'aria-label': 'Previous Page' }}
                      nextIconButtonProps={{ 'aria-label': 'Next Page' }}
                      onChangePage={this.handleChangePage}
                      onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    roles: selectRoles(state)
  };
};

Roles = connect(mapStateToProps)(Roles);
Roles = withRoot(withStyles(rootStyles)(Roles));

export default Roles;
