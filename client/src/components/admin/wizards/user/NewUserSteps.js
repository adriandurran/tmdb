import React from 'react';
import { Step } from 'semantic-ui-react';

const NewUserSteps = () => {
  return (
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
  );
};

export default NewUserSteps;
