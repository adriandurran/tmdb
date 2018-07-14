import React, { Component } from 'react';

import { selectFeedBackDateDesc } from '../../reducers/selectors/extraSelectors';

class AppFeedbackList extends Component {
  render() {
    return <div>List feedback</div>;
  }
}

const mapStateToProps = state => {
  return {
    feedback: selectFeedBackDateDesc(state)
  };
};

export default AppFeedbackList;
