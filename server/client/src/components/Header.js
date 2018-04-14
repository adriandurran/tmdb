import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Button, Menu, Icon } from 'semantic-ui-react';

import { selectUserName } from '../reducers/selectors';

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
        <div>
          <Menu.Item header>
            <Icon name="user circle" />
            {firstName} {lastName}
          </Menu.Item>
        </div>
      );
    } else {
      return (
        <div>
          <Menu.Item>
            <Button primary as={Link} to={'/auth/login'}>
              Login
            </Button>
          </Menu.Item>
          <Menu.Item>
            <Button primary as={Link} to={'/auth/register'}>
              Register
            </Button>
          </Menu.Item>
        </div>
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
            {this.renderMenus()}
            <Menu.Item position="right">
              <Button inverted href="/auth/tmdb/logout">
                Logout
              </Button>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authUser: state.auth.user,
    userName: selectUserName(state)
  };
};

export default connect(mapStateToProps)(Header);
