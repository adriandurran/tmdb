import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';

import { registerUser } from '../../actions/auth';
import RegisterField from './registerField';

class RegisterUser extends Component {
  renderRegFields() {
    return (
      <div>
        <div className="row">
          <div className="col s6">
            <Field
              component={RegisterField}
              type="text"
              name="firstname"
              label="First name"
            />
          </div>
          <div className="col s6">
            <Field
              component={RegisterField}
              type="text"
              label="Last name"
              name="lastname"
            />
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            <Field
              component={RegisterField}
              type="text"
              label="Email address"
              name="email"
            />
          </div>
        </div>
        <div className="row">
          <div className="col s6">
            <Field
              component={RegisterField}
              type="text"
              label="Employee number"
              name="empId"
            />
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            <Field
              component={RegisterField}
              type="password"
              label="Password"
              name="pwd"
            />
          </div>
        </div>
      </div>
    );
  }

  submitUser(values) {
    console.log(values);
    registerUser(values);
  }

  render() {
    const { handleSubmit, submitting, pristine, onSubmit } = this.props;
    return (
      <div>
        <div className="row" style={{ marginTop: '20px' }}>
          <div className="s12">
            <div className="card-panel grey lighten-1">
              <h4 className="white-text center-align">Register</h4>
              <form onSubmit={handleSubmit(values => this.submitUser(values))}>
                {this.renderRegFields()}
                <div className="row">
                  <button
                    disabled={pristine || submitting}
                    className="waves-effect waves-light btn right blue-grey darken-1"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.firstname) {
    errors.firstname = 'Required';
  }
  if (!values.lastname) {
    errors.lastname = 'Required';
  }

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.empId) {
    errors.empId = 'Required';
  }

  // if (!values.pwd) {
  //   errors.pwd = 'Required';
  // } else if (values.pwd.length < 8) {
  //   errors.pwd = 'Password must be 8 to 25 characters';
  // } else if (values.pwd.length > 25) {
  //   errors.pwd = 'Password must be more 8 to 25 characters';
  // }

  return errors;
}

export default reduxForm({
  form: 'registerForm',
  validate
})(RegisterUser);
