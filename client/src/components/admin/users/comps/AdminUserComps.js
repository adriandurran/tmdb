import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { List } from 'semantic-ui-react';

import {
  selectUserManage,
  selectAdminUserRoleComps
} from '../../../../reducers/selectors/adminSelectors';

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
    const { reqComps, user } = this.props;
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

  render() {
    return (
      <div>
        <List divided verticalAlign="middle">
          {this.renderReqComps()}
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
    user: selectUserManage(state)
  };
};

AdminUserComps = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminUserComps);

export default AdminUserComps;
