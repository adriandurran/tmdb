import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import _ from 'lodash';

class User extends Component {
  componentDidMount() {
    const userId = this.props.match.params.id;
    this.props.fetchUser(userId);
  }
  renderRoles() {
    return this.props.userRoles.map(role => {
      return (
        <li className="collection-item" key={role.roleId}>
          {role.rolename}
        </li>
      );
    });
  }

  render() {
    return (
      <div className="row">
        <div className="col s12 l10 offset-l1">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <div>
                {this.props.user.firstname} {this.props.user.lastname}
              </div>
              <div className="row">
                <div className="col s6 l5">
                  <ul className="collection with-header blue-grey-text text-darken-1">
                    <li className="collection-header">Roles</li>
                    {this.renderRoles()}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ user, roles }) {
  return {
    user,

    userRoles: _.filter(roles, x => _.includes(user.roles, x.roleId))
  };
}

export default connect(mapStateToProps, actions)(User);
