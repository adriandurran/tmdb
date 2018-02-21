import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

class UserComps extends Component {}

function mapStateToProps({ comps, courses }, ownProps) {
  // iterate of the courses state to get the full details
  // compare pass date and validity
  // merge (or ignore courses past validity)
  // iterate over the comps state and check combination of user courses = competency
  // some things to think about....if the user has the courses for a  competency....but one of his courses
  // has expired...do we show the competency? Do we highlight this to the user in some way?
  // I think we need to tie the courses and competencies together in a clearly understandable way
  // added this to a pr and seperate branch
}

export default connect(mapStateToProps)(UserComps);
