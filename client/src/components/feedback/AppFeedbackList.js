import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';

import { Item, Header } from 'semantic-ui-react';

import { selectFeedBackDateDesc } from '../../reducers/selectors/extraSelectors';
import { fetchFeedback } from '../../actions/extra';

class AppFeedbackList extends Component {
  componentDidMount() {
    this.props.fetchFeedback();
  }

  renderFeedbackItems() {
    const { feedback } = this.props;
    return feedback.map(fb => {
      return (
        <Item key={fb._id}>
          <Item.Image size="small" src={fb.feedbackUser.imageUrl} />
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
    return (
      <div>
        <Header as="h3" textAlign="center">
          Feedback
        </Header>
        <Item.Group>{this.renderFeedbackItems()}</Item.Group>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    feedback: selectFeedBackDateDesc(state)
  };
};

const mapDispatchToProps = {
  fetchFeedback
};

AppFeedbackList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppFeedbackList);

export default AppFeedbackList;
