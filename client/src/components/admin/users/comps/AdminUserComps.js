import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { List, Header } from 'semantic-ui-react';

import {
  selectUserManage,
  selectAdminUserRoleComps,
  selectUserManageCompetenciesCurrent
} from '../../../../reducers/selectors/adminSelectors';

import { compExist } from '../../../../utils/arrayhelpers';

import { fetchComps } from '../../../../actions/comps';

class AdminUserComps extends Component {
  componentDidMount() {
    this.props.fetchComps();
  }

  renderCompCourses(courses) {
    return courses.map(course => {
      return (
        <List.Item key={course._id}>
          <List.Icon name="book" />
          <List.Content>
            <List.Header>{course.courseName}</List.Header>
          </List.Content>
        </List.Item>
      );
    });
  }

  renderReqComps() {
    const { reqComps, user, currentComps } = this.props;
    if (_.isEmpty(user)) {
      return <List.Content description="No User Roles" />;
    }
    if (user.roles.length === 0) {
      return <List.Content description="No User Roles" />;
    }
    return reqComps.map(comp => {
      let compSt = '';
      if (!_.isEmpty(comp.compType)) {
        compSt = `-- ${comp.compType.compType}`;
      }
      return (
        <List.Item key={comp._id}>
          {compExist(comp, currentComps) ? (
            <List.Icon
              name="check circle"
              color="green"
              size="large"
              verticalAlign="middle"
            />
          ) : (
            <List.Icon
              name="exclamation circle"
              color="red"
              size="large"
              verticalAlign="middle"
            />
          )}
          <List.Content>
            <List.Header>
              {comp.compName} {comp.compType && compSt}
            </List.Header>
            <List.Description>
              {comp.courses.length} Courses required for Competency
            </List.Description>
            <List.List>{this.renderCompCourses(comp.courses)}</List.List>
          </List.Content>
        </List.Item>
      );
    });
  }

  // TODO ---- need to add in check on the courses to see if any expire within 3 months
  renderCurrentComps() {
    const { currentComps, user } = this.props;
    if (_.isEmpty(user)) {
      return <List.Content description="No User selected" />;
    }
    if (currentComps.length === 0) {
      return <List.Content description="No User Competencies" />;
    }

    return currentComps.map(comp => {
      return (
        <List.Item key={comp._id}>
          <List.Content>
            <List.Header>{comp.compName}</List.Header>
            <List.Description>
              {comp.courses.length} Courses required for Competency
            </List.Description>
          </List.Content>
        </List.Item>
      );
    });
  }

  render() {
    return (
      <div>
        <List divided verticalAlign="middle">
          {this.renderReqComps()}
        </List>
        <Header as="h4" textAlign="center">
          Current Competencies
        </Header>
        <List divided verticalAlign="middle">
          {this.renderCurrentComps()}
        </List>
      </div>
    );
  }
}

const mapDispatchToProps = {
  fetchComps
};

const mapStateToProps = state => {
  return {
    reqComps: selectAdminUserRoleComps(state),
    user: selectUserManage(state),
    currentComps: selectUserManageCompetenciesCurrent(state)
  };
};

AdminUserComps = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminUserComps);

export default AdminUserComps;
