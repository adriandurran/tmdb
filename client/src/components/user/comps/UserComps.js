import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { Header, Segment, Icon, Card } from 'semantic-ui-react';

// change this to a card group

import {
  selectUserCompetenciesCurrent,
  selectUserRoleComps,
  selectUserCoursesCurrent
} from '../../../reducers/selectors/userSelectors';

import { getUserCoursesForComp } from '../../../utils/arrayhelpers';
import {
  checkCompExpireDate,
  expireDate,
  expireMonths
} from '../../../utils/datehelpers';

class UserComps extends Component {
  renderCompCourses(comp) {
    const { userCourses } = this.props;
    let ucs = getUserCoursesForComp(comp, userCourses);
    return ucs.map(uc => {
      return (
        <Card.Content
          extra
          key={uc._id}
          style={
            expireMonths(uc.passDate, uc._course.validity) <= 3
              ? {
                  color: 'orange'
                }
              : { color: 'black' }
          }
        >
          {uc._course.courseName} &nbsp; expires &nbsp;
          <Moment fromNow>
            {expireDate(uc.passDate, uc._course.validity)}
          </Moment>
        </Card.Content>
      );
    });
  }

  // add a line for when the comp expires
  renderCurrentComps() {
    const { currentComps, userCourses } = this.props;

    return currentComps.map(comp => {
      return (
        <Card key={comp._id}>
          <Card.Content>
            <Card.Header>
              {checkCompExpireDate(comp, userCourses) ? (
                <Icon name="warning" color="orange" />
              ) : (
                ''
              )}
              {comp.compName}
            </Card.Header>
            <Card.Description>
              {checkCompExpireDate(comp, userCourses) ? (
                <span style={{ color: 'orange' }}>
                  One of the required courses for this Competency is due to
                  expire in 3 or less months
                </span>
              ) : (
                `All ${
                  comp.courses.length
                } courses required for this Competency are in date`
              )}
            </Card.Description>
            {this.renderCompCourses(comp)}
          </Card.Content>
        </Card>
      );
    });
  }

  render() {
    return (
      <div>
        <Segment padded>
          <Header as="h2" textAlign="center">
            Competencies
            <Header.Subheader>Current</Header.Subheader>
          </Header>
          <Card.Group centered>{this.renderCurrentComps()}</Card.Group>
        </Segment>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    reqComps: selectUserRoleComps(state),
    currentComps: selectUserCompetenciesCurrent(state),
    userCourses: selectUserCoursesCurrent(state)
  };
};

UserComps = connect(mapStateToProps)(UserComps);

export default UserComps;
