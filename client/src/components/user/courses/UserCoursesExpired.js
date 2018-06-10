import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Moment from 'react-moment';

import { Table, Header } from 'semantic-ui-react';

import { selectUserCoursesExpired } from '../../../reducers/selectors';

class UserCoursesExpired extends Component {
  state = {
    column: null,
    data: [],
    direction: null
  };

  componentDidMount() {
    this.setCourses(this.props);
  }

  componentDidUpdate(prevProps) {
    if (this.props.courses !== prevProps.courses) {
      this.setCourses(this.props);
    }
  }

  setCourses(props) {
    this.setState({
      data: props.courses
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

  renderTableBody() {
    const { data } = this.state;
    return data.map(({ _id, _course, passDate }) => {
      let nowDate = Date.now();

      return (
        <Table.Row key={_id}>
          <Table.Cell>{_course.courseName}</Table.Cell>
          <Table.Cell>{_course.type}</Table.Cell>
          <Table.Cell>{_course.level}</Table.Cell>
          <Table.Cell>
            <Moment fromNow>{passDate}</Moment>
          </Table.Cell>
        </Table.Row>
      );
    });
  }

  render() {
    return (
      <div>
        {courses.length > 0 ? (
          <div>
            <Table sortable celled fixed structured>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell
                    sorted={column === 'courseName' ? direction : null}
                    onClick={this.handleSort('courseName')}
                  >
                    Course Name
                  </Table.HeaderCell>

                  <Table.HeaderCell
                    sorted={column === 'type' ? direction : null}
                    onClick={this.handleSort('type')}
                  >
                    Type
                  </Table.HeaderCell>
                  <Table.HeaderCell
                    sorted={column === 'level' ? direction : null}
                    onClick={this.handleSort('level')}
                  >
                    Level
                  </Table.HeaderCell>
                  <Table.HeaderCell
                    sorted={column === 'expiredDate' ? direction : null}
                    onClick={this.handleSort('expiredDate')}
                  >
                    Expired
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>{this.renderTableBody()}</Table.Body>
            </Table>
          </div>
        ) : (
          <Header as="h3" textAlign="center">
            No expired Courses
          </Header>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    courses: selectUserCoursesExpired(state)
  };
};

UserCoursesExpired = connect(mapStateToProps)(UserCoursesExpired);

export default UserCoursesExpired;
