import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Icon, Card } from 'semantic-ui-react';

import { selectAllUsersActive } from '../../../reducers/selectors/adminSelectors';
import { deptUsers, deptRoles } from '../../../utils/deptHelpers';

class AdminDeptUserStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      departmentUsers: [],
      departmentRoles: []
    };
  }

  componentDidMount() {
    const { dept, users } = this.props;
    const departmentUsers = deptUsers(users, dept);
    const departmentRoles = deptRoles(departmentUsers);
    this.setState({
      departmentUsers,
      departmentRoles
    });
  }

  render() {
    const { departmentUsers, departmentRoles } = this.state;
    return (
      <Fragment>
        <Card.Content extra>
          <span>
            <Icon name="users" />
            &nbsp;
            {departmentUsers.length}&nbsp; Users
          </span>
          <br />
          <span>
            <Icon name="users" />
            &nbsp;
            {departmentRoles.length}&nbsp; Roles
          </span>
        </Card.Content>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: selectAllUsersActive(state)
  };
};

export default connect(mapStateToProps)(AdminDeptUserStatus);
