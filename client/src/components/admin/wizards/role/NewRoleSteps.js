import React from 'react';
import { Step } from 'semantic-ui-react';

const NewRoleSteps = ({ values }) => {
  const { roleComps, roleName, timeToSQEP } = values;

  return (
    <Step.Group ordered fluid vertical>
      <Step
        active={roleName.meta.active}
        completed={roleName.input.value !== ''}
      >
        <Step.Content>
          <Step.Title> Role Name</Step.Title>
          <Step.Description>Enter a role name</Step.Description>
        </Step.Content>
      </Step>

      <Step
        active={timeToSQEP.meta.active}
        completed={timeToSQEP.input.value >= 0}
      >
        <Step.Content>
          <Step.Title>Time to SQEP</Step.Title>
          <Step.Description>
            Enter a number of months until SQEP
          </Step.Description>
        </Step.Content>
      </Step>

      <Step
        active={roleComps.meta.active}
        completed={roleComps.input.value.length > 0}
      >
        <Step.Content>
          <Step.Title>Role Competencies</Step.Title>
          <Step.Description>Select at least one competency</Step.Description>
        </Step.Content>
      </Step>
    </Step.Group>
  );
};

export default NewRoleSteps;
