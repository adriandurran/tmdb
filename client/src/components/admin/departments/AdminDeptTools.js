import React, { Component } from 'react';
import { Header, Card, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectDepts } from '../../../reducers/selectors/deptSelectors';
import { selectAllUsersActiveNoDept } from '../../../reducers/selectors/adminSelectors';

import { fetchDepts } from '../../../actions/dept';

class AdminDeptTools extends Component {
  componentDidMount() {
    this.props.fetchDepts();
  }

  render() {
    const { depts, noDepts } = this.props;
    return (
      <div>
        <Header as="h2" textAlign="center">
          Department Tools
        </Header>
        <Card.Group itemsPerRow={3} style={{ marginTop: '2em' }}>
          <Card as={Link} to="/admin/dept-manager" raised>
            <Card.Content>
              <Header as="h2">Departments</Header>
            </Card.Content>
            <Card.Content description="Add & Manage Departments" />
            <Card.Content extra>
              <Icon name="factory" />
              {depts.length} &nbsp; Departments Listed
            </Card.Content>
          </Card>
          <Card as={Link} to="/admin/dept-views" raised>
            <Card.Content>
              <Header as="h2">Department Views</Header>
            </Card.Content>
            <Card.Content description="View Departments" />
            <Card.Content extra />
          </Card>
          <Card as={Link} to="/admin/users-no-dept" raised>
            <Card.Content>
              <Header as="h2">Department Allocator</Header>
            </Card.Content>
            <Card.Content description="Allocate Users to Departments" />
            <Card.Content extra>
              <Icon name="hand paper" />
              {noDepts.length}&nbsp;Orphaned users
            </Card.Content>
          </Card>
        </Card.Group>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    depts: selectDepts(state),
    noDepts: selectAllUsersActiveNoDept(state)
  };
};

const mapDispatchToProps = {
  fetchDepts
};

AdminDeptTools = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminDeptTools);

export default AdminDeptTools;
