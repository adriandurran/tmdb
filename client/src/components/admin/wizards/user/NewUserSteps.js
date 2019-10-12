import React from 'react';
import { Step } from 'semantic-ui-react';

const NewUserSteps = ({ values }) => {
  const {
    firstName,
    lastName,
    username,
    userId,
    password,
    dept,
    role
  } = values;

  return (
    <Step.Group ordered fluid vertical>
      <Step
        active={firstName.meta.active || firstName.meta.active}
        completed={firstName.input.value !== '' && lastName.input.value !== ''}
      >
        <Step.Content>
          <Step.Title>Name</Step.Title>
          <Step.Description>Enter name</Step.Description>
        </Step.Content>
      </Step>

      <Step
        active={username.meta.active}
        completed={username.input.value !== ''}
      >
        <Step.Content>
          <Step.Title>Email</Step.Title>
          <Step.Description>Enter email</Step.Description>
        </Step.Content>
      </Step>

      <Step active={userId.meta.active} completed={userId.input.value !== ''}>
        <Step.Content>
          <Step.Title>Employee Id</Step.Title>
          <Step.Description>Enter employee Id</Step.Description>
        </Step.Content>
      </Step>

      <Step
        active={password.meta.active}
        completed={password.input.value !== ''}
      >
        <Step.Content>
          <Step.Title>Password</Step.Title>
          <Step.Description>Create password</Step.Description>
        </Step.Content>
      </Step>
      <Step active={dept.meta.active} completed={dept.input.value !== ''}>
        <Step.Content>
          <Step.Title>Department</Step.Title>
          <Step.Description>Select department</Step.Description>
        </Step.Content>
      </Step>
      <Step active={role.meta.active} completed={role.input.value !== ''}>
        <Step.Content>
          <Step.Title>Role</Step.Title>
          <Step.Description>Select role</Step.Description>
        </Step.Content>
      </Step>
    </Step.Group>
  );
};

export default NewUserSteps;
