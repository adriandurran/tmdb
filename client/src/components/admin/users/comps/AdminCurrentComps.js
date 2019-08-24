import React from 'react';
import { isEmpty } from 'lodash';
import { List } from 'semantic-ui-react';

const AdminCurrentComps = ({ user, currentComps }) => {
  return (
    <>
      {!isEmpty(user) &&
        currentComps.map((comp, i) => {
          return (
            <List.Item key={comp._id}>
              <List.Content>
                <List.Header>{comp.compName}</List.Header>
                <List.Description>
                  {comp.courses.length} Courses required for Competency
                </List.Description>
              </List.Content>
            </List.Item>
          );
        })}
    </>
  );
};

export default AdminCurrentComps;
