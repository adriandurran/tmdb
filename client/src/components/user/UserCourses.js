import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableFooter,
  TableSortLabel,
  TablePagination
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';

import { selectUserCourseNames } from '../../reducers/selectors';

class UserCourses extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      order: 'desc',
      orderBy: 'Passed',
      data: this.props.userCourses.sort(
        (a, b) => (a.passDate > b.passDate ? -1 : 1)
      ),
      page: 0,
      rowsPerPage: 5
    };
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
    const { data, rowsPerPage, page, order, orderBy } = this.state;

    return data
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((course, index) => {
        return (
          <TableRow key={index}>
            <TableCell>{course.coursename}</TableCell>
            <TableCell>
              <Moment fromNow>{course.passDate}</Moment>
            </TableCell>
            <TableCell>
              {' '}
              <Moment format="DD MMM YYYY" add={{ months: course.validity }}>
                {course.passDate}
              </Moment>
            </TableCell>
          </TableRow>
        );
      });
  }

  render() {
    const { data, rowsPerPage, page, order, orderBy } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    return (
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Course Name</TableCell>
              <TableCell>Passed</TableCell>
              <TableCell>Expires</TableCell>
            </TableRow>
          </TableHead>

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
      </Paper>
    );
  }
}

const mapStateToProps = state => {
  return {
    userCourses: selectUserCourseNames(state)
  };
};

export default connect(mapStateToProps)(UserCourses);
