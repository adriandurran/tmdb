import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, List, Icon } from 'semantic-ui-react';

import { selectCompetencyTypes } from '../../../reducers/selectors/compSelectors';
import { fetchCompTypes, adminDeleteCompType } from '../../../actions/comps';

class AdminCTypeList extends Component {
  componentDidMount() {
    const { fetchCompTypes } = this.props;
    fetchCompTypes();
  }

  handleClick = (e, { value }) => {
    const { adminDeleteCompType } = this.props;
    adminDeleteCompType(value);
  };

  renderCompTypes() {
    const { types } = this.props;
    return types.map(type => {
      return (
        <List.Item key={type._id}>
          <List.Content floated="right">
            <Button icon onClick={this.handleClick} value={type._id}>
              <Icon name="delete" />
            </Button>
          </List.Content>
          <List.Content>{type.compType}</List.Content>
        </List.Item>
      );
    });
  }
  render() {
    return (
      <div>
        <List divided verticalAlign="middle">
          {this.renderCompTypes()}
        </List>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    types: selectCompetencyTypes(state)
  };
};

const mapDispatchToProps = {
  fetchCompTypes,
  adminDeleteCompType
};

AdminCTypeList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminCTypeList);

export default AdminCTypeList;
