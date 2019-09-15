import React from 'react';
import { Header, Segment, Step, Icon, Input, Select } from 'semantic-ui-react';
import { Field } from 'react-final-form';
import { useSelector, useDispatch } from 'react-redux';

import WizardForm from '../WizardForm';
import { selectRolesForDropDown } from '../../../../reducers/selectors/roleSelectors';
import { selectDeptsForDropDown } from '../../../../reducers/selectors/deptSelectors';

const onSubmit = async (values) => {
  window.alert(JSON.stringify(values, 0, 2));
};

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

  return (
    <>
      <Header as="h1" textAlign="center">
        <Icon name="wizard" />
        New User Wizard
      </Header>
      <Step.Group ordered>
        <Step active>
          <Step.Content>
            <Step.Title>Name</Step.Title>
            <Step.Description>Enter name</Step.Description>
          </Step.Content>
        </Step>

        <Step>
          <Step.Content>
            <Step.Title>Email</Step.Title>
            <Step.Description>Enter email address</Step.Description>
          </Step.Content>
        </Step>

        <Step>
          <Step.Content>
            <Step.Title>Employee Id</Step.Title>
            <Step.Description>Enter employee Id</Step.Description>
          </Step.Content>
        </Step>

        <Step>
          <Step.Content>
            <Step.Title>Password</Step.Title>
            <Step.Description>Create password</Step.Description>
          </Step.Content>
        </Step>
        <Step>
          <Step.Content>
            <Step.Title>Role</Step.Title>
            <Step.Description>Select role</Step.Description>
          </Step.Content>
        </Step>
        <Step>
          <Step.Content>
            <Step.Title>Department</Step.Title>
            <Step.Description>Select department</Step.Description>
          </Step.Content>
        </Step>
      </Step.Group>

      <Segment raised style={{ marginTop: '2rem' }}>
        <WizardForm onSubmit={onSubmit}>
          <WizardForm.Page>
            <label>First Name</label>
            <Field
              name="firstName"
              component={Input}
              type="text"
              placeholder="First Name"
              validate={required}
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
            <label htmlFor="email">Email</label>
            <Field
              name="email"
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
