import React from 'react';
import { Step } from 'semantic-ui-react';
import { isEmpty, has } from 'lodash';

const NewUserSteps = ({ values, page }) => {
  const { firstName, lastName, email, userId, password, dept, role } = values;

  return (
    <Step.Group ordered fluid attached="top">
      <Step
        active={page === 0}
        completed={firstName !== '' && lastName !== '' && !isEmpty(values)}
      >
        <Step.Content>
          <Step.Title>Name</Step.Title>
          <Step.Description>Enter name</Step.Description>
        </Step.Content>
      </Step>

      <Step
        active={page === 1}
        completed={has(values, 'email') && email !== ''}
      >
        <Step.Content>
          <Step.Title>Email</Step.Title>
          <Step.Description>Enter email</Step.Description>
        </Step.Content>
      </Step>

      <Step
        active={page === 2}
        completed={has(values, 'userId') && userId !== ''}
      >
        <Step.Content>
          <Step.Title>Employee Id</Step.Title>
          <Step.Description>Enter employee Id</Step.Description>
        </Step.Content>
      </Step>

      <Step
        active={page === 3}
        completed={has(values, 'password') && password !== ''}
      >
        <Step.Content>
          <Step.Title>Password</Step.Title>
          <Step.Description>Create password</Step.Description>
        </Step.Content>
      </Step>
      <Step active={page === 4} completed={has(values, 'dept') && dept !== ''}>
        <Step.Content>
          <Step.Title>Department</Step.Title>
          <Step.Description>Select department</Step.Description>
        </Step.Content>
      </Step>
      <Step active={page === 5} completed={has(values, 'role') && role !== ''}>
        <Step.Content>
          <Step.Title>Role</Step.Title>
          <Step.Description>Select role</Step.Description>
        </Step.Content>
      </Step>
    </Step.Group>
  );
};

export default NewUserSteps;
