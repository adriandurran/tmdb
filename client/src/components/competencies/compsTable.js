import _ from 'lodash';
import React, { Component } from 'react';
import { Table, Header, Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { fetchComps } from '../../actions/comps';
import { selectCompetencies } from '../../reducers/selectors/compSelectors';

class CompsTable extends Component {
  state = {
    column: null,
    data: [],
    direction: null,
    openModal: false
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
    // console.log(id);
    this.setState({ openModal: true });
  };

  onCloseModal = () => {
    this.setState({ openModal: false });
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

  render() {
    const { column, data, direction } = this.state;

    return (
      <div>
        <Header as="h2" textAlign="center">
          Competencies
        </Header>
        <Table sortable celled fixed structured selectable>
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
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {_.map(data, ({ _id, shortName, compName, compType }) => (
              <Table.Row key={_id} onClick={() => this.rowClick(_id)}>
                <Table.Cell>{shortName}</Table.Cell>
                <Table.Cell>{compName}</Table.Cell>
                {compType && <Table.Cell>{compType.compType}</Table.Cell>}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        {/* this is better off as a seperate....comp */}
        <Modal open={this.state.openModal} onClose={this.onCloseModal}>
          <Modal.Header>Edit Competency</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Header>Edit Competency</Header>
              <p>This is still in development.</p>
              <p>Coming soon</p>
            </Modal.Description>
          </Modal.Content>
        </Modal>
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
  fetchComps
};

CompsTable = connect(
  mapStateToProps,
  mapDispatchToProps
)(CompsTable);

export default CompsTable;
