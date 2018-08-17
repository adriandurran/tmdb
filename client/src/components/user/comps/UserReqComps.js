import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { Item, Header, Segment, Icon, List } from 'semantic-ui-react';

import {
  selectUserCompetenciesCurrent,
  selectUserRoleComps,
  selectUserCoursesCurrent
} from '../../../reducers/selectors/userSelectors';

import { compExist, getUserCoursesForComp } from '../../../utils/arrayhelpers';
import {
  expireDate,
  checkCourseHasExpireDate,
  expireMonths
} from '../../../utils/datehelpers';

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
              <List bulleted>{this.renderCompCourses(comp)}</List>
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
        <List.Item
          key={uc._id}
          style={
            expireMonths(uc.passDate, uc._course.validity) <= 3
              ? {
                  color: 'orange'
                }
              : { color: 'black' }
          }
        >
          {checkCourseHasExpireDate(uc._course) ? (
            <span>
              {uc._course.courseName} &nbsp; expires &nbsp;
              <Moment fromNow>
                {expireDate(uc.passDate, uc._course.validity)}
              </Moment>
            </span>
          ) : (
            <span>{uc._course.courseName} &nbsp; does not expire </span>
          )}
        </List.Item>
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
          <Item.Group style={{ marginLeft: '1em' }}>
            {this.renderReqComps()}
          </Item.Group>
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
