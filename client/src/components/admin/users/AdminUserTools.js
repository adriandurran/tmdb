import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Header, Card, Icon } from 'semantic-ui-react';

import { fetchAllUsers } from '../../../actions/user';
import { selectAllUsers } from '../../../reducers/selectors';

class AdminUserTools extends Component {
  componentDidMount() {
    const { fetchAllUsers } = this.props;
    fetchAllUsers();
  }
  render() {
    const { allusers } = this.props;
    return (
      <Card.Group itemsPerRow={3}>
        <Card as={Link} to="/admin/user-access-manager" raised>
          <Card.Content>
            <Header as="h5">User Access Manager</Header>
          </Card.Content>
          <Card.Content description="Manage User access" />
          <Card.Content extra>
            {allusers.length > 0 ? (
              <span>
                <Icon name="users" />
                {allusers.length} Users loaded
              </span>
            ) : (
              <span>No Users in the system</span>
            )}
          </Card.Content>
        </Card>
      </Card.Group>
    );
  }
}

const mapDispatchToProps = {
  fetchAllUsers
};

const mapStateToProps = state => {
  return {
    allusers: selectAllUsers(state)
  };
};

AdminUserTools = connect(mapStateToProps, mapDispatchToProps)(AdminUserTools);

export default AdminUserTools;
