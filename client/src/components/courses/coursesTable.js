import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { Table, Header } from 'semantic-ui-react';

import { fetchCourses } from '../../actions/courses';
import { selectCourses } from '../../reducers/selectors';

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

  render() {
    const { column, data, direction } = this.state;

    return (
      <div>
        <Header as="h2" textAlign="center">
          Courses
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
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {_.map(data, ({ _id, courseName, validity, type, level }) => (
              <Table.Row key={_id}>
                <Table.Cell>{courseName}</Table.Cell>
                <Table.Cell textAlign="right">
                  {validity}&nbsp; months
                </Table.Cell>
                <Table.Cell>{type}</Table.Cell>
                <Table.Cell>{level}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
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
  fetchCourses
};

CoursesTable = connect(mapStateToProps, mapDispatchToProps)(CoursesTable);

export default CoursesTable;
