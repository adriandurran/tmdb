import React, { Component } from 'react';

import { fetchUser } from '../actions';

class User extends Component {
  componentDidMount() {
    const userId = this.props.match.params.id;
    console.log(userId);
    const user = fetchUser(userId);
  }
  render() {
    return <div>Hello {this.props.user}</div>;
  }
}

export default User;
