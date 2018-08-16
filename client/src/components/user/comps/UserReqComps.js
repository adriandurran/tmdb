import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { Item, Header, Segment, Icon } from 'semantic-ui-react';

import {
  selectUserCompetenciesCurrent,
  selectUserRoleComps,
  selectUserCoursesCurrent
} from '../../../reducers/selectors/userSelectors';

import { compExist, getUserCoursesForComp } from '../../../utils/arrayhelpers';
import { expireDate } from '../../../utils/datehelpers';

class UserReqComps extends Component {
  renderReqComps() {
    const { reqComps, currentComps } = this.props;
    return reqComps.map((comp) => {
      let cType = 'Required';
      if (comp.compType) {
        cType = comp.compType.compType;
      }
      return (
        <Item key={comp._id}>
          <Item.Content>
            {compExist(comp, currentComps) ? (
              <Item.Header>
                <Icon name="check circle" color="green" />
                {comp.compName} - {cType}
              </Item.Header>
            ) : (
              <Item.Header
                style={
                  cType === 'Required' ? { color: 'red' } : { color: 'orange' }
                }
              >
                <Icon
                  name={
                    cType === 'Required'
                      ? 'exclamation circle'
                      : 'exclamation triangle'
                  }
                  color={cType === 'Required' ? 'red' : 'orange'}
                />
                {comp.compName} - {cType}
              </Item.Header>
            )}

            {compExist(comp, currentComps) ? (
              ''
            ) : (
              <Item.Description
                style={
                  cType === 'Required' ? { color: 'red' } : { color: 'orange' }
                }
              >
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
    return ucs.map((uc) => {
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

  render() {
    return (
      <div>
        <Segment padded>
          <Header as="h2" textAlign="center">
            Role Competencies
          </Header>
          <Item.Group>{this.renderReqComps()}</Item.Group>
        </Segment>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    reqComps: selectUserRoleComps(state),
    currentComps: selectUserCompetenciesCurrent(state),
    userCourses: selectUserCoursesCurrent(state)
  };
};

UserReqComps = connect(mapStateToProps)(UserReqComps);

export default UserReqComps;
