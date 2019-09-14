import React from 'react';
import {
  Header,
  Segment,
  Step,
  Icon,
  Input,
  Label,
  Form
} from 'semantic-ui-react';
import { Field } from 'react-final-form';

import WizardForm from '../WizardForm';

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

const required = (value) => (value ? undefined : 'Required');

const NewUserWizard = () => {
  return (
    <>
      <Header as="h1" textAlign="center">
        <Icon name="wizard" />
        New User Wizard
      </Header>
      <Step.Group ordered>
        <Step active>
          <Step.Content>
            <Step.Title>Name & Email</Step.Title>
            <Step.Description>
              Enter first name last Name and email address
            </Step.Description>
          </Step.Content>
        </Step>

        <Step>
          <Step.Content>
            <Step.Title>Billing</Step.Title>
            <Step.Description>Enter billing information</Step.Description>
          </Step.Content>
        </Step>

        <Step>
          <Step.Content>
            <Step.Title>Confirm Order</Step.Title>
          </Step.Content>
        </Step>
      </Step.Group>
      <Segment basic style={{ marginTop: '2rem' }}>
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
        </WizardForm>
      </Segment>
    </>
  );
};

export default NewUserWizard;
