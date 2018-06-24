import _ from 'lodash';
import React, { Component } from 'react';
import { Table, Header, Modal, Form } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { fetchComps, fetchCompetency } from '../../../actions/comps';
import {
  selectCompetencies,
  selectCompetency
} from '../../../reducers/selectors/compSelectors';

import semanticFormField from '../../shared/semanticFormField';

class AdminCompsTable extends Component {
  state = {
    column: null,
    data: [],
    direction: null,
    openModal: false,
    comp: {}
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
    const { comp, fetchCompetency } = this.props;
    fetchCompetency(id).then(() => {
      this.setState({
        comp,
        openModal: true
      });
    });
  };

  onCloseModal = () => {
    this.setState({
      comp: {},
      openModal: false
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

  editComp = values => {};

  renderCompsForm() {
    const { handleSubmit, submitting, pristine } = this.props;
    return (
      <Form onSubmit={handleSubmit(values => this.editComp(values))}>
        <Form.Group>
          <Field
            fluid
            component={semanticFormField}
            as={Form.Input}
            type="text"
            name="shortName"
            placeholder="Short name"
          />
          <Field
            fluid
            name="compName"
            component={semanticFormField}
            as={Form.Input}
            type="text"
            placeholder="Competency Name"
          />
        </Form.Group>
      </Form>
    );
  }

  render() {
    const { column, data, direction } = this.state;
    const { comp } = this.props;

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
            {!_.isEmpty(comp) ? (
              <Modal.Description>
                <Header>
                  {comp.shortName} - {comp.compName}
                </Header>
                {this.renderCompsForm()}
              </Modal.Description>
            ) : (
              <Modal.Description>
                <Header>No Competency selected</Header>
              </Modal.Description>
            )}
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    comps: selectCompetencies(state),
    comp: selectCompetency(state)
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

AdminCompsTable = connect(state => ({ initialValues: state.comp }))(
  AdminCompsTable
);

export default reduxForm({
  form: 'compeditor'
})(AdminCompsTable);

// state => ({ initialValues: state.comp }),
