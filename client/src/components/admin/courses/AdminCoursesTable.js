import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';

import { Table, Header } from 'semantic-ui-react';

import { fetchCourses, fetchCourse } from '../../../actions/courses';
import { selectCourses } from '../../../reducers/selectors/courseSelectors';

class CoursesTable extends Component {
  state = {
    column: null,
    data: [],
    direction: null
  };

  componentDidMount() {
    const { fetchCourses } = this.props;
    fetchCourses();
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

  rowClick = id => {
    const { history, fetchCourse } = this.props;
    fetchCourse(id).then(() => {
      history.push(`/admin/course-manager/view/${id}`);
    });
  };

  renderTableBody() {
    const { data } = this.state;
    return data.map(({ _id, courseName, validity, type, level }) => {
      let validText = '';
      if (validity === undefined) {
        validText = 'No expiry date';
      }
      if (validity === 0) {
        validText = 'Expired';
      }
      if (validity > 0) {
        validText = `Valid for ${validity} months`;
      }

      return (
        <Table.Row
          key={_id}
          negative={validity === 0}
          onClick={() => this.rowClick(_id)}
        >
          <Table.Cell>{courseName}</Table.Cell>
          <Table.Cell textAlign="right">{validText}</Table.Cell>
          <Table.Cell>{type}</Table.Cell>
          <Table.Cell>{level}</Table.Cell>
        </Table.Row>
      );
    });
  }

  render() {
    const { column, direction } = this.state;

    return (
      <div>
        <Header as="h2" textAlign="center">
          Courses
        </Header>
        <Table sortable celled fixed structured selectable>
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
            </Table.Row>
          </Table.Header>
          <Table.Body>{this.renderTableBody()}</Table.Body>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    courses: selectCourses(state)
  };
};

const mapDispatchToProps = {
  fetchCourses,
  fetchCourse
};

CoursesTable = connect(
  mapStateToProps,
  mapDispatchToProps
)(CoursesTable);

export default withRouter(CoursesTable);
