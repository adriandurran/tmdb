import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Header, Card, Icon } from 'semantic-ui-react';

import { fetchRoles } from '../../../actions/roles';
import { selectRoles } from '../../../reducers/selectors/roleSelectors';

class AdminRoleTools extends Component {
  componentDidMount() {
    this.props.fetchRoles();
  }

  render() {
    const { roles } = this.props;
    return (
      <Card.Group itemsPerRow={1} centered>
        <Card as={Link} to="/admin/role-manager" raised>
          <Card.Content>
            <Header as="h5">Role Manager</Header>
          </Card.Content>
          <Card.Content description="Build and Manage Roles" />
          <Card.Content extra>
            {roles.length > 0 ? (
              <span>
                <Icon name="cubes" />
                {roles.length} Roles loaded
              </span>
            ) : (
              <span>No Roles in the system</span>
            )}
          </Card.Content>
        </Card>
      </Card.Group>
    );
  }
}

const mapStateToProps = state => {
  return {
    roles: selectRoles(state)
  };
};

const mapDispatchToProps = {
  fetchRoles
};

AdminRoleTools = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminRoleTools);

export default AdminRoleTools;
