import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';

// use redux form
// will mock the actuall login process until set up with a db

class LoginUser extends Component {
  renderFields() {
    return (
      <div className="row">
        <div className="col s6">
          <Field
            type="email"
            name="email"
            component="input"
            placeholder="email address"
          />
        </div>
        <div className="col s6">
          <Field
            type="password"
            name="pwd"
            component="input"
            placeholder="password"
          />
        </div>
      </div>
    );
  }

  render() {
    const { handleSubmit, submitting, pristine } = this.props;
    return (
      <div className="row">
        <div className="col s12 m10offset-m1">
          <div className="card-panel">
            <form onSubmit={handleSubmit(values => console.log(values))}>
              {this.renderFields()}
              <div className="row">
                <button
                  type="submit"
                  className="waves-effect waves-light btn right"
                  disabled={pristine || submitting}
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: 'loginForm'
})(LoginUser);
