import _ from 'lodash';
import React, { Component } from 'react';
import { Table, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { fetchComps, fetchCompetency } from '../../../actions/comps';
import { selectCompetencies } from '../../../reducers/selectors/compSelectors';

class AdminCompsTable extends Component {
  state = {
    column: null,
    data: [],
    direction: null
  };

  componentDidMount() {
    const { fetchComps } = this.props;
    fetchComps();
    this.setComps(this.props);
  }

  componentDidUpdate(prevProps) {
    if (this.props.comps !== prevProps.comps) {
      this.setComps(this.props);
    }
  }

  setComps(props) {
    this.setState({
      data: props.comps
    });
  }

  rowClick = id => {
    const { fetchCompetency, history } = this.props;
    fetchCompetency(id).then(() => {
      // open new page
      history.push(`/admin/comp-manager/view/${id}`);
    });
  };

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

  renderTableCells(comp) {
    return comp.courses.map((course, index) => {
      return (
        <span key={index}>
          {course.courseName}
          <br />
        </span>
      );
    });
  }

  renderTableRows() {
    const { data } = this.state;
    return data.map(comp => {
      return (
        <Table.Row key={comp._id} onClick={() => this.rowClick(comp._id)}>
          <Table.Cell>{comp.shortName}</Table.Cell>
          <Table.Cell>{comp.compName}</Table.Cell>
          <Table.Cell>{comp.compType.compType}</Table.Cell>
          <Table.Cell verticalAlign="top">
            {this.renderTableCells(comp)}
          </Table.Cell>
        </Table.Row>
      );
    });
  }

  render() {
    const { column, direction } = this.state;

    return (
      <div>
        <Header as="h2" textAlign="center">
          Competencies
        </Header>
        <Table sortable celled striped selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                sorted={column === 'shortName' ? direction : null}
                onClick={this.handleSort('shortName')}
              >
                Short Name
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'compName' ? direction : null}
                onClick={this.handleSort('compName')}
              >
                Name
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'compType' ? direction : null}
                onClick={this.handleSort('compType')}
              >
                Competency Type
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'courses' ? direction : null}
                onClick={this.handleSort('courses')}
              >
                Courses
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
    comps: selectCompetencies(state)
  };
};

const mapDispatchToProps = {
  fetchComps,
  fetchCompetency
};

AdminCompsTable = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminCompsTable);

export default withRouter(AdminCompsTable);
