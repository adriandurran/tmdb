import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';

import { Item, Header, Segment, Dropdown } from 'semantic-ui-react';

import {
  selectFeedBackDateDesc,
  selectFeedbackTypesForDropDown
} from '../../reducers/selectors/extraSelectors';
import {
  fetchFeedback,
  fetchFeedbackTypes,
  filterFeedback
} from '../../actions/extra';

class AppFeedbackList extends Component {
  componentDidMount() {
    const { fetchFeedback, fetchFeedbackTypes } = this.props;
    fetchFeedback();
    fetchFeedbackTypes();
  }

  handleTypeChange = (e, item) => {
    this.props.filterFeedback(item.value);
  };

  renderFeedbackItems() {
    const { feedback } = this.props;
    return feedback.map(fb => {
      return (
        <Item key={fb._id}>
          <Item.Image size="tiny" src={fb.feedbackUser.imageUrl} />
          <Item.Content>
            <Item.Header>{fb.feedbackType.feedbackType}</Item.Header>
            {fb.feedbackAppVersion && (
              <Item.Meta>
                Version {fb.feedbackAppVersion.versionNumber}
              </Item.Meta>
            )}

            <Item.Description>{fb.feedbackNotes}</Item.Description>
            <Item.Extra>
              Submitted &nbsp;<Moment fromNow>{fb.feedbackDate}</Moment>&nbsp;by{' '}
              {fb.feedbackUser.firstName} {fb.feedbackUser.lastName}
            </Item.Extra>
          </Item.Content>
        </Item>
      );
    });
  }

  render() {
    const { types } = this.props;
    return (
      <div>
        <Header as="h3" textAlign="center">
          Feedback
        </Header>
        <Segment style={{ marginBottom: '1em' }}>
          <Dropdown
            button
            className="icon"
            icon="search"
            floating
            labeled
            options={types}
            text="Select feedback type"
            onChange={this.handleTypeChange}
          />
        </Segment>
        <Item.Group>{this.renderFeedbackItems()}</Item.Group>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    feedback: selectFeedBackDateDesc(state),
    types: selectFeedbackTypesForDropDown(state)
  };
};

const mapDispatchToProps = {
  fetchFeedback,
  fetchFeedbackTypes,
  filterFeedback
};

AppFeedbackList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppFeedbackList);

export default AppFeedbackList;
