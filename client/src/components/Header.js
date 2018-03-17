import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import { withStyles } from 'material-ui/styles';
import rootStyles from '../styles/rootStyle';
import withRoot from '../withRoot';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Person from 'material-ui-icons/Person';
import Button from 'material-ui/Button';

import Menu, { MenuItem } from 'material-ui/Menu';

import { selectUserName } from '../reducers/selectors';

class Header extends Component {
  state = { anchorEl: null };

  renderHeader() {
    const { authUser, userName, classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    if (_.isEmpty(authUser, true)) {
      return (
        <div>
          <Button
            component={Link}
            to={'/auth/login'}
            className={classes.menuButton}
          >
            Login
          </Button>
          <Button
            color="inherit"
            component={Link}
            to={'/auth/register'}
            className={classes.menuButton}
          >
            Register
          </Button>
        </div>
      );
    } else {
      return (
        <div>
          <Button
            component={Link}
            to={`/users/${authUser.id}/courses`}
            className={classes.menuButton}
          >
            Courses
          </Button>
          <Button
            component={Link}
            to={`/users/${authUser.id}/competencies`}
            className={classes.menuButton}
          >
            Competencies
          </Button>
          <IconButton
            aria-owns={open ? 'menu-user' : null}
            aria-haspopup="true"
            onClick={this.handleMenu}
            color="inherit"
          >
            <Person />
          </IconButton>
          {/* <Typography variant="body2">{userName}</Typography> */}

          <Menu
            id="menu-user"
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={open}
            onClose={this.handleClose}
          >
            <MenuItem onClick={this.handleClose}>Profile</MenuItem>
            <MenuItem onClick={this.handleClose}>Logout</MenuItem>
          </Menu>
        </div>
      );
    }
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    // temp will logout
    this.setState({ anchorEl: null });
  };

  handleProfile = () => {
    // temp will send to profile details
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const { classes } = this.props;
    return (
      <AppBar>
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="title"
            color="inherit"
            className={classes.appbarTitle}
            component={Link}
            to={'/'}
          >
            TMDB
          </Typography>
          {this.renderHeader()}
        </Toolbar>
      </AppBar>
    );
  }
}

Header = withStyles(rootStyles)(Header);

const mapStateToProps = state => {
  return {
    authUser: state.auth.user,
    userName: selectUserName(state)
  };
};

export default withRoot(connect(mapStateToProps)(Header));
