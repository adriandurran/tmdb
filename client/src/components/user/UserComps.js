import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { Item, Header, Segment, Icon } from 'semantic-ui-react';

import {
  selectUserCompetenciesCurrent,
  selectUserRoleComps,
  selectUserCoursesCurrent
} from '../../reducers/selectors/userSelectors';

import { compExist, getUserCoursesForComp } from '../../utils/arrayhelpers';
import { checkCompExpireDate, expireDate } from '../../utils/datehelpers';

class UserComps extends Component {
  renderReqComps() {
    const { reqComps, currentComps } = this.props;
    return reqComps.map(comp => {
      return (
        <Item key={comp._id}>
          <Item.Content>
            {compExist(comp, currentComps) ? (
              <Item.Header>
                <Icon name="check circle" color="green" />
                {comp.compName}
              </Item.Header>
            ) : (
              <Item.Header style={{ color: 'red' }}>
                <Icon name="exclamation circle" color="red" />
                {comp.compName}
              </Item.Header>
            )}

            {compExist(comp, currentComps) ? (
              ''
            ) : (
              <Item.Description style={{ color: 'red' }}>
                You do not have this Competency or the required courses for this
                Competency are out of date.
              </Item.Description>
            )}
            <Item.Extra>
              {comp.courses.length} Courses required for this Competency
            </Item.Extra>
          </Item.Content>
        </Item>
      );
    });
  }

  renderCompCourses(comp) {
    const { userCourses } = this.props;
    let ucs = getUserCoursesForComp(comp, userCourses);
    return ucs.map(uc => {
      return (
        <Item.Extra key={uc._id}>
          {uc._course.courseName} &nbsp; expires &nbsp;
          <Moment fromNow>
            {expireDate(uc.passDate, uc._course.validity)}
          </Moment>
        </Item.Extra>
      );
    });
  }

  // add a line for when the comp expires
  renderCurrentComps() {
    const { currentComps, userCourses } = this.props;

    return currentComps.map(comp => {
      return (
        <Item key={comp._id}>
          <Item.Content>
            <Item.Header>
              {checkCompExpireDate(comp, userCourses) ? (
                <Icon name="warning" color="orange" />
              ) : (
                ''
              )}
              {comp.compName}
            </Item.Header>
            <Item.Description>
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
            </Item.Description>
            {this.renderCompCourses(comp)}
          </Item.Content>
        </Item>
      );
    });
  }

  render() {
    return (
      <div>
        <Segment padded>
          <Header as="h2" textAlign="center">
            Competencies
            <Header.Subheader>Required</Header.Subheader>
          </Header>
          <Item.Group>{this.renderReqComps()}</Item.Group>
        </Segment>
        <Segment padded>
          <Header as="h2" textAlign="center">
            Competencies
            <Header.Subheader>Current</Header.Subheader>
          </Header>
          <Item.Group>{this.renderCurrentComps()}</Item.Group>
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
