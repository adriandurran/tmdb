import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';

import { Header, Segment, Feed } from 'semantic-ui-react';

import { selectCourseNotesOrdered } from '../../../reducers/selectors/courseSelectors';

class AdminCourseNotes extends Component {
  renderFeed() {
    const { notes } = this.props;
    return notes.map(note => {
      return (
        <Feed.Event key={note._id}>
          <Feed.Label image="http://lorempixel.com/400/400/people" />
          <Feed.Content>
            <Feed.Summary>
              {note.noteBy.firstName} {note.noteBy.lastName}
              <Feed.Date>
                <Moment fromNow>{note.noteDate}</Moment>
              </Feed.Date>
            </Feed.Summary>
            <Feed.Extra text>{note.noteText}</Feed.Extra>
          </Feed.Content>
        </Feed.Event>
      );
    });
  }

  render() {
    const { notes } = this.props;

    return (
      <div stye={{ marginTop: '2em' }}>
        {notes.length > 0 ? (
          <Segment stye={{ marginTop: '2em' }}>
            <Header as="h3" textAlign="center">
              Course Notes
            </Header>

            <Feed>{this.renderFeed()}</Feed>
          </Segment>
        ) : (
          <Header as="h3" textAlign="center">
            No Course Notes
          </Header>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    notes: selectCourseNotesOrdered(state)
  };
};

AdminCourseNotes = connect(mapStateToProps)(AdminCourseNotes);

export default AdminCourseNotes;
