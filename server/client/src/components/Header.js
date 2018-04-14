import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Button, Menu, Icon } from 'semantic-ui-react';

import { selectCurrentUser } from '../reducers/selectors';

class Header extends Component {
  renderMenus() {
    const { authUser } = this.props;
    if (authUser) {
      const {
        firstName,
        lastName,
        userId,
        isAdmin,
        isSuperAdmin,
        verified
      } = authUser;
      return (
        <Menu.Menu position="right">
          {verified ? (
            <Menu.Item header>
              <Icon name="user circle" />
              {firstName} {lastName}
            </Menu.Item>
          ) : (
            <Menu.Item header>Awaiting Verification</Menu.Item>
          )}

          <Menu.Item>
            <Button inverted href="/auth/tmdb/logout">
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
