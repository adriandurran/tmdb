import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class User extends Component {
  componentDidMount() {
    const userId = this.props.match.params.id;
    this.props.fetchUser(userId);
  }
  render() {
    return <div>Hello {this.props.user.firstname}</div>;
  }
}

function mapStateToProps({ user }) {
  return { user };
}

export default connect(mapStateToProps, actions)(User);
