import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, List, Icon } from 'semantic-ui-react';

import { selectCourseTypes } from '../../../reducers/selectors/courseSelectors';
import { fetchCourseTypes, deleteCourseType } from '../../../actions/courses';

class AdminCTList extends Component {
  componentDidMount() {
    const { fetchCourseTypes } = this.props;
    fetchCourseTypes();
  }

  handleClick = (e, { value }) => {
    const { deleteCourseType } = this.props;
    deleteCourseType(value);
  };

  renderCourseTypes() {
    const { types } = this.props;
    return types.map(type => {
      return (
        <List.Item key={type._id}>
          <List.Content floated="right">
            <Button icon onClick={this.handleClick} value={type._id}>
              <Icon name="delete" />
            </Button>
          </List.Content>
          <List.Content>{type.courseType}</List.Content>
        </List.Item>
      );
    });
  }
  render() {
    return (
      <div>
        <List divided verticalAlign="middle">
          {this.renderCourseTypes()}
        </List>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    types: selectCourseTypes(state)
  };
};

const mapDispatchToProps = {
  fetchCourseTypes,
  deleteCourseType
};

AdminCTList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminCTList);

export default AdminCTList;
