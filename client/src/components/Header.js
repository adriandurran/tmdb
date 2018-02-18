import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { selectUserName } from '../reducers/selectors';

class Header extends Component {
  renderHeader() {
    const { authUser, userName } = this.props;
    switch (authUser) {
      case null:
        return;

      case false:
        return (
          <div>
            <li>
              <Link
                to={'/auth/login'}
                className="blue-grey darken-1 waves-effect waves-light btn"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to={'/auth/register'}
                className="blue-grey darken-1 waves-effect waves-light btn"
              >
                Register
              </Link>
            </li>
          </div>
        );
      default:
        return (
          <div>
            <li>
              <a href="#!">Courses</a>
            </li>
            <li>
              <a href="#!">Competencies</a>
            </li>
            <li>
              <a href="#!">Help</a>
            </li>
            <li style={{ margin: '0 10px' }}>
              <i className="material-icons left">person</i>
              {userName}
            </li>
            <li>
              <a
                href="http://raf.mod.uk"
                className="blue-grey darken-1 waves-effect waves-light btn"
              >
                Logout
              </a>
            </li>
          </div>
        );
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper grey darken-2">
          <Link to={'/'} className="brand-logo" style={{ margin: '0 20px' }}>
            TMDB
          </Link>
          <ul id="nav-mobile" className="right">
            {this.renderHeader()}
          </ul>
        </div>
      </nav>
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
