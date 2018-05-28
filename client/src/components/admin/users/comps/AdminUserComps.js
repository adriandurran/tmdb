import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { List } from 'semantic-ui-react';

import {
  selectUserManage,
  selectAdminUserRoleComps
} from '../../../../reducers/selectors';

class AdminUserComps extends Component {
  renderReqComps() {
    const { reqComps, user } = this.props;
    if (_.isEmpty(user)) {
      return <List.Content description="No User Roles" />;
    }
    if (user.roles.length === 0) {
      return <List.Content description="No User Roles" />;
    }
    return reqComps.map(comp => {
      return (
        <List.Item key={comp._id}>
          <List.Content>
            <List.Header>{comp.compName}</List.Header>
            <List.Description>Courses required for Competency</List.Description>
            {/* <List.List>
              {this.courses.map(course => {
                return <List.Item>{course._id}</List.Item>;
              })}
            </List.List> */}
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

const mapStateToProps = state => {
  return {
    reqComps: selectAdminUserRoleComps(state),
    user: selectUserManage(state)
  };
};

AdminUserComps = connect(mapStateToProps)(AdminUserComps);

export default AdminUserComps;
