import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Button, Menu, Icon } from 'semantic-ui-react';

import { selectCurrentUser } from '../reducers/selectors/userSelectors';

class Header extends Component {
  renderMenus() {
    const { authUser } = this.props;
    if (authUser) {
      const { firstName, lastName, verified, userId } = authUser;
      return (
        <Menu.Menu position="right">
          {verified ? (
            <Menu.Item header as={Link} to={`/users/${userId}/profile`}>
              <Icon name="user circle" />
              {firstName} {lastName}
            </Menu.Item>
          ) : (
            <Menu.Item header>Awaiting Verification</Menu.Item>
          )}

          <Menu.Item>
            <Button inverted href="/api/tmdb/auth/logout" target="_self">
              Logout
            </Button>
          </Menu.Item>
        </Menu.Menu>
      );
    } else {
      return (
        <Menu.Menu position="right">
          <Menu.Item>
            <Button.Group>
              <Button as={Link} to="/auth/login">
                Login
              </Button>
              <Button as={Link} to="/auth/register">
                Register
              </Button>
            </Button.Group>
          </Menu.Item>
        </Menu.Menu>
      );
    }
  }

  render() {
    const { authUser } = this.props;

    return (
      <div>
        <Menu size="huge" inverted borderless fixed="top">
          <Menu.Item
            header
            as={Link}
            to={authUser ? `/users/${authUser.userId}` : '/'}
          >
            TMDB
          </Menu.Item>
          <Menu.Menu position="right">
            {authUser.isAdmin && (
              <Menu.Item as={Link} to={`/admin/dashboard`}>
                Admin Dashboard
              </Menu.Item>
            )}
            {authUser.verified && (
              <Menu.Item
                icon="home"
                as={Link}
                to={`/users/${authUser.userId}`}
              />
            )}
            {authUser.verified && (
              <Menu.Item
                as={Link}
                to={`/users/${authUser.userId}/competencies`}
              >
                Competencies
              </Menu.Item>
            )}
            {authUser.verified && (
              <Menu.Item as={Link} to={`/users/${authUser.userId}/courses`}>
                Courses
              </Menu.Item>
            )}
          </Menu.Menu>
          {this.renderMenus()}
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authUser: selectCurrentUser(state)
  };
};

export default connect(mapStateToProps)(Header);
