import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Button, Menu, Icon } from 'semantic-ui-react';

import { selectCurrentUser } from '../reducers/selectors';

class Header extends Component {
  // renderHeader() {
  //   const { authUser, userName, classes } = this.props;

  //   if (isEmpty(authUser, true)) {
  //     return (
  //       <div>
  //         <Button
  //           component={Link}
  //           to={'/auth/login'}
  //           className={classes.menuButton}
  //         >
  //           Login
  //         </Button>
  //         <Button
  //           color="inherit"
  //           component={Link}
  //           to={'/auth/register'}
  //           className={classes.menuButton}
  //         >
  //           Register
  //         </Button>
  //       </div>
  //     );
  //   } else {
  //     return (
  //       <div>
  //         {authUser.isAdmin && (
  //           <Button
  //             component={Link}
  //             to={`/admin/dashboard`}
  //             className={classes.menuButton}
  //           >
  //             Admin Dashboard
  //           </Button>
  //         )}

  //         <Button
  //           component={Link}
  //           to={`/users/${authUser.userId}/courses`}
  //           className={classes.menuButton}
  //         >
  //           Courses
  //         </Button>
  //         <Button
  //           component={Link}
  //           to={`/users/${authUser.userId}/competencies`}
  //           className={classes.menuButton}
  //         >
  //           Competencies
  //         </Button>
  //         <IconButton
  //           aria-owns={open ? 'menu-user' : null}
  //           aria-haspopup="true"
  //           onClick={this.handleMenu}
  //           color="inherit"
  //         >
  //           <Person />
  //         </IconButton>
  //         {/* <Typography variant="body2">{userName}</Typography> */}

  //         <Menu
  //           id="menu-user"
  //           anchorEl={anchorEl}
  //           anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
  //           transformOrigin={{ vertical: 'top', horizontal: 'right' }}
  //           open={open}
  //           onClose={this.handleClose}
  //         >
  //           <MenuItem onClick={this.handleClose}>Profile</MenuItem>
  //           <MenuItem onClick={this.handleClose}>Logout</MenuItem>
  //         </Menu>
  //       </div>
  //     );
  //   }
  // }

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
            <div>
              <Menu.Item header>
                <Icon name="user circle" />
                {firstName} {lastName}
              </Menu.Item>
              <Menu.Item as={Link} to={`/users/${authUser.userId}/courses`}>
                Courses
              </Menu.Item>
              <Menu.Item
                as={Link}
                to={`/users/${authUser.userId}/competencies`}
              >
                Competencies
              </Menu.Item>
            </div>
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
