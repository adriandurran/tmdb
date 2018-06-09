import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Moment from 'react-moment';

import { Table, Header } from 'semantic-ui-react';

import { selectUserCoursesVerify } from '../../../reducers/selectors';

class UserCoursesVerify extends Component {
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
      let validText = '';
      if (_course.validity === undefined) {
        validText = 'No expiry date';
      }
      if (_course.validity > 0) {
        validText = `Valid for ${_course.validity} months`;
      }

      return (
        <Table.Row key={_id}>
          <Table.Cell>{_course.courseName}</Table.Cell>
          <Table.Cell textAlign="right">{validText}</Table.Cell>
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
    const { courses } = this.props;
    const { column, direction } = this.state;
    return (
      <div>
        {courses.length > 0 ? (
          <div>
            <Header as="h3" textAlign="center">
              Courses waiting for Verification
            </Header>
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
                    sorted={column === 'validity' ? direction : null}
                    onClick={this.handleSort('validity')}
                  >
                    Validity
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
                    sorted={column === 'passDate' ? direction : null}
                    onClick={this.handleSort('passDate')}
                  >
                    Passed
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>{this.renderTableBody()}</Table.Body>
            </Table>
          </div>
        ) : (
          <Header as="h3" textAlign="center">
            No Courses waiting for Verification
          </Header>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    courses: selectUserCoursesVerify(state)
  };
};

UserCoursesVerify = connect(mapStateToProps)(UserCoursesVerify);

export default UserCoursesVerify;
