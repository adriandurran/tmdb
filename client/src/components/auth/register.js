import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';

class RegisterUser extends Component {
  render() {
    return <div>Register component</div>;
  }
}

export default reduxForm({
  form: 'registerForm'
})(RegisterUser);
