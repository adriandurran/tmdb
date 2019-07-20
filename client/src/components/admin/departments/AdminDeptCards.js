import React, { Component } from 'react';
import { Header, Card } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { selectDepts } from '../../../reducers/selectors/deptSelectors';
// import { selectAllUsersActive } from '../../../reducers/selectors/adminSelectors';

import AdminDeptMenu from './AdminDeptMenu';
import AdminDeptUserStatus from './AdminDeptUserStatus';

import { fetchAllUsers } from '../../../actions/user';
import { fetchDept } from '../../../actions/dept';

class AdminDeptCards extends Component {
  componentDidMount() {
    this.props.fetchAllUsers();
  }

  handleCardClick = (e, { value }) => {
    const { fetchDept, history } = this.props;
    fetchDept(value).then(() => {
      history.push(`/admin/dept-user-view/${value}`);
    });
  };

  renderDeptCards() {
    const { depts } = this.props;
    return depts.map((dept) => {
      return (
        <Card
          raised
          key={dept._id}
          value={dept._id}
          onClick={this.handleCardClick}
        >
          <Card.Content>
            <Header as="h5">{dept.departmentName}</Header>
          </Card.Content>
          <AdminDeptUserStatus dept={dept._id} />
          {/* <Card.Content extra>
            <Icon name="users" />
            &nbsp;
            {deptUsers(users, dept._id).length} &nbsp; Users
          </Card.Content> */}
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
        <AdminDeptMenu />
        <Card.Group itemsPerRow={4} style={{ marginTop: '1em' }}>
          {this.renderDeptCards()}
        </Card.Group>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    depts: selectDepts(state)
    // users: selectAllUsersActive(state)
  };
};

const mapDispatchToProps = {
  fetchAllUsers,
  fetchDept
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AdminDeptCards));
