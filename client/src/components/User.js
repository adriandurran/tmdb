import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import _ from 'lodash';

class User extends Component {
  componentDidMount() {
    const userId = this.props.match.params.id;
    this.props.fetchUser(userId);
    this.props.fetchRoles();
  }
  renderRoles() {
    return this.props.roles.map(role => {
      return <li>{role.rolename}</li>;
    });
  }

  render() {
    return (
      <div>
        <div>Hello {this.props.user.firstname}</div>
        <ul>{this.renderRoles()}</ul>
      </div>
    );
  }
}

function mapStateToProps({ user, roles }) {
  return {
    user,
    roles
  };
}

export default connect(mapStateToProps, actions)(User);
