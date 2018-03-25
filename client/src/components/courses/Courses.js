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
  TablePagination,
} from 'material-ui/Table';
import Toolbar from 'material-ui/Toolbar';
import Tooltip from 'material-ui/Tooltip';

import { withStyles } from 'material-ui/styles';
import withRoot from '../../withRoot';
import rootStyles from '../../styles/rootStyle';

import { selectCourses } from '../../reducers/selectors';

const columnData = [
  { id: 'course', numeric: false, disablePadding: false, label: 'Course Name' },
  { id: 'validity', numeric: false, disablePadding: false, label: 'Validity' },
  { id: 'type', numeric: false, disablePadding: false, label: 'Type' },
  { id: 'level', numeric: false, disablePadding: false, label: 'Level' },
];

class EnhancedCourseTableHead extends Component {
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

class Courses extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      order: 'desc',
      orderBy: 'Passed',
      data: [],
      page: 0,
      rowsPerPage: 10,
    };
  }

  setCourses(props) {
    this.setState({
      data: props.courses.sort((a, b) => (a.type > b.type ? -1 : 1)),
    });
  }

  componentDidMount() {
    this.setCourses(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.courses !== nextProps.courses) {
      this.setCourses(nextProps);
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

  renderCourses() {
    const { data, rowsPerPage, page } = this.state;

    return data
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((course, index) => {
        return (
          <TableRow key={index}>
            <TableCell>{course.coursename}</TableCell>
            <TableCell>{course.validity}</TableCell>
            <TableCell>{course.type}</TableCell>
            <TableCell>{course.level}</TableCell>
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
              Courses
            </Typography>
            <div>
              <Table>
                <EnhancedCourseTableHead
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={this.handleRequestSort}
                />
                <TableBody>
                  {this.renderCourses()}
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
    courses: selectCourses(state),
  };
};

Courses = connect(mapStateToProps)(Courses);

export default withRoot(withStyles(rootStyles)(Courses));
