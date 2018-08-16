import React, { Component } from 'react';
import { Header, Icon, Card } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { selectDepts } from '../../../reducers/selectors/deptSelectors';
import { selectAllUsersActive } from '../../../reducers/selectors/adminSelectors';
import { deptUsers } from '../../../utils/deptHelpers';

class AdminDeptCards extends Component {
  renderDeptCards() {
    const { depts, users } = this.props;
    return depts.map((dept) => {
      return (
        <Card raised key={dept._id}>
          <Card.Content>
            <Header as="h5">{dept.departmentName}</Header>
          </Card.Content>
          <Card.Content extra>
            <Icon name="users" />
            &nbsp;
            {deptUsers(users, dept._id).length} &nbsp; Users
          </Card.Content>
        </Card>
      );
    });
  }

  render() {
    return (
      <div>
        <Header as="h2" textAlign="center">
          Department Views
        </Header>
        <Card.Group itemsPerRow={4}>{this.renderDeptCards()}</Card.Group>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    depts: selectDepts(state),
    users: selectAllUsersActive(state)
  };
};

export default connect(mapStateToProps)(AdminDeptCards);
