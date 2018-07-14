import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, List, Icon } from 'semantic-ui-react';

import { selectFeedbackTypes } from '../../reducers/selectors/extraSelectors';
import { deleteFeedbackType, fetchFeedbackTypes } from '../../actions/extra';

class AppFeedbackTypeList extends Component {
  componentDidMount() {
    this.props.fetchFeedbackTypes();
  }

  handleClick = (e, { value }) => {
    this.props.deleteFeedbackType(value);
  };

  renderFeedbackTypes() {
    const { types } = this.props;
    return types.map(type => {
      return (
        <List.Item key={type._id}>
          <List.Content floated="right">
            <Button icon onClick={this.handleClick} value={type._id}>
              <Icon name="delete" />
            </Button>
          </List.Content>
          <List.Content>{type.feedbackType}</List.Content>
        </List.Item>
      );
    });
  }

  render() {
    return (
      <div>
        <List divided verticalAlign="middle">
          {this.renderFeedbackTypes()}
        </List>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    types: selectFeedbackTypes(state)
  };
};

const mapDispatchToProps = {
  deleteFeedbackType,
  fetchFeedbackTypes
};

AppFeedbackTypeList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppFeedbackTypeList);

export default AppFeedbackTypeList;