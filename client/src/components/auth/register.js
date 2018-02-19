import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import _ from 'lodash';

import RegisterField from './registerField';

const FIELDS = [
  { name: 'firstname', placeholder: 'First name' },
  { name: 'lastname', placeholder: 'Last name' },
  { name: 'empId', placeholder: 'Employee number' },
  { name: 'email', placeholder: 'Email address' },
  { name: 'pwd', placeholder: 'Password' }
];

class RegisterUser extends Component {
  renderRegFields() {
    return _.map(FIELDS, ({ name, placeholder }) => {
      return (
        <Field
          component={RegisterField}
          type="text"
          placeholder={placeholder}
          name={name}
          key={name}
        />
      );
    });
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
