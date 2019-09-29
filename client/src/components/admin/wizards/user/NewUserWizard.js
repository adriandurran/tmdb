import React from 'react';
import { Header, Segment, Icon, Input, Select } from 'semantic-ui-react';
import { Field } from 'react-final-form';
import { useSelector, useDispatch } from 'react-redux';

import WizardForm from './NewUserWizardForm';
import { selectRolesForDropDown } from '../../../../reducers/selectors/roleSelectors';
import { selectDeptsForDropDown } from '../../../../reducers/selectors/deptSelectors';

import styles from '../../../../styles/form.module.css';

import { adminAddNewUser } from '../../../../actions/user';

const Error = ({ name }) => (
  <Field
    name={name}
    subscribe={{ touched: true, error: true }}
    render={({ meta: { touched, error } }) =>
      touched && error ? <span>{error}</span> : null
    }
  />
);

const SelectAdapter = ({ input, ...rest }) => (
  <Select
    {...input}
    {...rest}
    onChange={(e, { value }) => input.onChange(value)}
  />
);

const required = (value) => (value ? undefined : 'Required');

const NewUserWizard = () => {
  const roles = useSelector(selectRolesForDropDown);
  const depts = useSelector(selectDeptsForDropDown);
  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    const result = await dispatch(adminAddNewUser(values));
    console.log(result);
    if (result.verified) {
      // add a message the user has been added
    }
  };

  return (
    <>
      <Header as="h1" textAlign="center">
        <Icon name="wizard" />
        New User Wizard
      </Header>

      <Segment raised style={{ marginTop: '2rem' }}>
        <WizardForm onSubmit={onSubmit}>
          <WizardForm.Page>
            <label className={styles.label}>First Name</label>
            <Field
              name="firstName"
              component={Input}
              type="text"
              placeholder="First Name"
              validate={required}
              className={styles.field}
            />
            <Error name="firstName" />
            <label>Last Name</label>
            <Field
              name="lastName"
              component={Input}
              type="text"
              placeholder="Last Name"
              validate={required}
            />
            <Error name="lastName" />
          </WizardForm.Page>
          <WizardForm.Page>
            <label htmlFor="username">Email</label>
            <Field
              name="username"
              component={Input}
              type="email"
              placeholder="Email address"
              validate={required}
            />
          </WizardForm.Page>
          <WizardForm.Page>
            <label htmlFor="userId">Employee Id</label>
            <Field
              name="userId"
              component={Input}
              type="text"
              placeholder="Employee Number/Id"
              validate={required}
            />
          </WizardForm.Page>
          <WizardForm.Page>
            <label htmlFor="password">Password</label>
            <Field
              name="password"
              component={Input}
              type="password"
              placeholder="Password"
              validate={required}
            />
          </WizardForm.Page>
          <WizardForm.Page>
            <label htmlFor="dept">Department</label>
            <Field name="dept" component={SelectAdapter} options={depts} />
          </WizardForm.Page>
          <WizardForm.Page>
            <label htmlFor="role">Role</label>
            <Field name="role" component={SelectAdapter} options={roles} />
          </WizardForm.Page>
        </WizardForm>
      </Segment>
    </>
  );
};

export default NewUserWizard;