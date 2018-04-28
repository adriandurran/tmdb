import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Header, Card, Icon } from 'semantic-ui-react';

class AdminCompTools extends Component {
  render() {
    return (
      <Card.Group itemsPerRow={2} centered>
        <Card as={Link} to="/admin/comp-manager" raised>
          <Card.Content>
            <Header as="h5">Competency Manager</Header>
          </Card.Content>
          <Card.Content description="Build and Manage Competencies" />
        </Card>
      </Card.Group>
    );
  }
}

export default AdminCompTools;
