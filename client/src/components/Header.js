import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { isEmpty } from 'lodash';

import { Button, Menu, Icon, Image, Dropdown } from 'semantic-ui-react';

import { selectCurrentUser } from '../reducers/selectors/userSelectors';
import { selectLatestVersion } from '../reducers/selectors/extraSelectors';
import { fetchLatestVersion } from '../actions/extra';

class Header extends Component {
  componentDidMount() {
    this.props.fetchLatestVersion();
  }

  profileClick = (e, { value }) => {
    const { history, authUser } = this.props;

    if (value === authUser.userId) {
      return history.push(`/users/${value}/profile`);
    }
  };

  renderMenus() {
    const { authUser } = this.props;
    if (authUser) {
      const { firstName, lastName, verified, userId, imageUrl } = authUser;
      const trigger = (
        <Menu.Item header>
          {imageUrl ? (
            <Image
              avatar
              src={`${process.env.REACT_APP_DEV_IMAGE_URL}${imageUrl}`}
              style={{ marginRight: '10px' }}
            />
          ) : (
            <Icon name="user circle" style={{ marginRight: '10px' }} />
          )}
          {firstName} {lastName}
        </Menu.Item>
      );
      const options = [
        { key: 'user', text: 'Profile', icon: 'user', value: userId }
      ];
      return (
        <Menu.Menu position="right">
          {verified ? (
            <Dropdown
              trigger={trigger}
              options={options}
              pointing="top left"
              icon={null}
              onChange={this.profileClick}
            />
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
            TAQM -{' '}
            {!isEmpty(version)
              ? `Version ${version.versionNumber}`
              : 'No version information'}
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

const mapStateToProps = (state) => {
  return {
    authUser: selectCurrentUser(state),
    version: selectLatestVersion(state)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
