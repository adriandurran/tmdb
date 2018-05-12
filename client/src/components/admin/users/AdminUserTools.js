import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Header, Card, Icon } from 'semantic-ui-react';

class AdminUserTools extends Component {
  render() {
    return (
      <Card.Group itemsPerRow={3}>
        <Card as={Link} to="/admin/user-access-manager" raised>
          <Card.Content>
            <Header as="h5">User Access Manager</Header>
          </Card.Content>
          <Card.Content description="Manage User access" />
          <Card.Content extra>Coming Soon</Card.Content>
        </Card>
      </Card.Group>
    );
  }
}

export default AdminUserTools;
