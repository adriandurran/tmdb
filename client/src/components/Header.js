import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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

export default Header;
