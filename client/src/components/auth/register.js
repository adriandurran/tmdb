import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import _ from 'lodash';

class RegisterUser extends Component {
  renderRegFields() {
    return (
      <div>
        <div className="row">
          <div className="col s6">
            <Field
              component="input"
              type="text"
              placeholder="First name"
              name="firstname"
            />
          </div>
          <div className="col s6">
            <Field
              component="input"
              type="text"
              placeholder="Last name"
              name="lastname"
            />
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            <Field
              component="input"
              type="text"
              placeholder="Email address"
              name="email"
            />
          </div>
        </div>
        <div className="row">
          <div className="col s6">
            <Field
              component="input"
              type="text"
              placeholder="Employee number"
              name="empId"
            />
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            <Field
              component="input"
              type="password"
              placeholder="Password"
              name="pwd"
            />
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { handleSubmit, submitting, pristine } = this.props;
    return (
      <div>
        <div className="row" style={{ marginTop: '20px' }}>
          <div className="s12">
            <div className="card-panel grey lighten-1">
              <h4 className="white-text center-align">Register</h4>
              <form onSubmit={handleSubmit(values => console.log(values))}>
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

export default reduxForm({
  form: 'registerForm'
})(RegisterUser);
