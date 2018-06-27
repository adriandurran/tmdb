import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, List, Icon } from 'semantic-ui-react';

import { selectCourseLevels } from '../../../reducers/selectors/courseSelectors';
import { fetchCourseLevels, deleteCourseLevel } from '../../../actions/courses';

class AdminCLList extends Component {
  componentDidMount() {
    const { fetchCourseLevels } = this.props;
    fetchCourseLevels();
  }

  handleClick = (e, { value }) => {
    const { deleteCourseLevel } = this.props;
    deleteCourseLevel(value);
  };

  renderCourseLevels() {
    const { levels } = this.props;
    return levels.map(level => {
      return (
        <List.Item key={level._id}>
          <List.Content floated="right">
            <Button icon onClick={this.handleClick} value={level._id}>
              <Icon name="delete" />
            </Button>
          </List.Content>
          <List.Content>{level.courseLevel}</List.Content>
        </List.Item>
      );
    });
  }
  render() {
    return (
      <div>
        <List divided verticalAlign="middle">
          {this.renderCourseLevels()}
        </List>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    levels: selectCourseLevels(state)
  };
};

const mapDispatchToProps = {
  fetchCourseLevels,
  deleteCourseLevel
};

AdminCLList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminCLList);

export default AdminCLList;
