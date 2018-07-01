import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { Card, Dropdown, Button } from 'semantic-ui-react';

import { selectUserManage } from '../../../../reducers/selectors/adminSelectors';
import { selectDeptsForDropDown } from '../../../../reducers/selectors/deptSelectors';
import { adminAssignDept } from '../../../../actions/user';

class AdminUserAddDept extends Component {
  // hate this right up here

  handleDepChange = (e, item) => {
    this.setState({
      department: item.value
    });
  };

  assignDept = () => {
    const { user, adminAssignDept } = this.props;
    adminAssignDept(user._id, this.state.department);
  };

  render() {
    const { user, depts } = this.props;
    return (
      <div>
        {_.isEmpty(user) ? (
          <Card centered style={{ marginTop: '1em' }}>
            <Card.Content description="No user selected" />
          </Card>
        ) : (
          <Card centered style={{ marginTop: '1em' }}>
            <Card.Content>
              {_.isEmpty(user.department) ? (
                <Card.Header textAlign="center">
                  No Department Assigned
                </Card.Header>
              ) : (
                <Card.Header textAlign="center">
                  {user.department.departmentName}
                </Card.Header>
              )}
              <Card.Description>
                <Dropdown
                  selection
                  fluid
                  name="department"
                  options={depts}
                  placeholder="Select a Department"
                  onChange={this.handleDepChange}
                />
                <Button
                  fluid
                  onClick={this.assignDept}
                  disabled={_.isEmpty(user)}
                  size="medium"
                  style={{ marginTop: '1em' }}
                >
                  Assign Department
                </Button>
              </Card.Description>
            </Card.Content>
          </Card>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = { adminAssignDept };

const mapStateToProps = state => {
  return {
    user: selectUserManage(state),
    depts: selectDeptsForDropDown(state)
  };
};

AdminUserAddDept = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminUserAddDept);

export default AdminUserAddDept;