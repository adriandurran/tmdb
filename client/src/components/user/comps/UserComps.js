import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { Header, Segment, Icon, Card, List } from 'semantic-ui-react';

import { fetchRoles } from '../../../actions/roles';
import { fetchComps } from '../../../actions/comps';
import { fetchCourses } from '../../../actions/courses';

import {
  selectUserCompetenciesCurrent,
  selectUserRoleComps,
  selectUserCoursesCurrent
} from '../../../reducers/selectors/userSelectors';

import { getUserCoursesForComp } from '../../../utils/arrayhelpers';
import {
  checkCompExpireDate,
  checkCourseHasExpireDate,
  expireDate,
  expireMonths
} from '../../../utils/datehelpers';

class UserComps extends Component {
  componentDidMount() {
    const { fetchRoles, fetchComps, fetchCourses } = this.props;
    fetchRoles();
    fetchComps();
    fetchCourses();
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

  // add a line for when the comp expires
  renderCurrentComps() {
    const { currentComps, userCourses } = this.props;

    return currentComps.map((comp) => {
      return (
        <Card key={comp._id} fluid>
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
            <Card.Content>
              <List bulleted>{this.renderCompCourses(comp)}</List>
            </Card.Content>
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
          <Card.Group centered itemsPerRow={2}>
            {this.renderCurrentComps()}
          </Card.Group>
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

const mapDispatchToProps = {
  fetchRoles,
  fetchComps,
  fetchCourses
};

UserComps = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserComps);

export default UserComps;
