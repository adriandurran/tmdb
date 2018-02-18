import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { selectUserName } from '../reducers/selectors';

class Header extends Component {
  render() {
    return (
      <nav>
        <div className="nav-wrapper grey darken-2">
          <Link to={'/'} className="center brand-logo">
            TMDB
          </Link>
          <ul id="nav-mobile" className="right">
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
