import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { isEmpty } from 'lodash';

import { Button, Menu, Icon, Image } from 'semantic-ui-react';

import { selectCurrentUser } from '../reducers/selectors/userSelectors';
import { selectLatestVersion } from '../reducers/selectors/extraSelectors';
import { fetchLatestVersion } from '../actions/extra';

class Header extends Component {
  componentDidMount() {
    this.props.fetchLatestVersion();
  }

  renderMenus() {
    const { authUser } = this.props;
    if (authUser) {
      const { firstName, lastName, verified, userId, imageUrl } = authUser;
      return (
        <Menu.Menu position="right">
          {verified ? (
            <Menu.Item header as={Link} to={`/users/${userId}/profile`}>
              {imageUrl ? (
                <Image avatar src={imageUrl} style={{ marginRight: '10px' }} />
              ) : (
                <Icon name="user circle" style={{ marginRight: '10px' }} />
              )}
              {firstName} {lastName}
            </Menu.Item>
          ) : (
            <Menu.Item header>Awaiting Verification</Menu.Item>
          )}

          <Menu.Item>
            <Button inverted href="/api/tmdb/auth/logout">
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
    const { authUser, version } = this.props;
    return (
      <div>
        <Menu size="huge" inverted borderless fixed="top">
          <Menu.Item
            header
            as={Link}
            to={authUser ? `/application/version` : '/'}
          >
            TMDB -{' '}
            {!isEmpty(version)
              ? `Version ${version.versionNumber}`
              : 'No version information'}
          </Menu.Item>
          <Menu.Item
            header
            as={Link}
            to={authUser ? `/application/feedback` : '/'}
          >
            Feedback
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

const mapDispatchToProps = {
  fetchLatestVersion
};

const mapStateToProps = state => {
  return {
    authUser: selectCurrentUser(state),
    version: selectLatestVersion(state)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
