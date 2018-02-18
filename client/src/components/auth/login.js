import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';

// use redux form
// will mock the actuall login process until set up with a db
// so for dev only the submit button will just link to user 1

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
      <div className="row" style={{ marginTop: '20px' }}>
        <div className="col s12 m10offset-m1">
          <div className="card-panel grey lighten-1">
            <form onSubmit={handleSubmit(values => console.log(values))}>
              {this.renderFields()}
              <div className="row">
                <Link
                  to={'/users/1'}
                  type="submit"
                  disabled={pristine || submitting}
                  className="waves-effect waves-light btn right blue-grey darken-1"
                >
                  Login
                </Link>
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
