import React from 'react';
import { isEmpty } from 'lodash';
import { List, Header } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import {
  selectUserManage,
  selectUserManageCompetenciesCurrent
} from '../../../../reducers/selectors/adminSelectors';

const AdminCurrentComps = () => {
  const currentComps = useSelector(selectUserManageCompetenciesCurrent);
  const user = useSelector(selectUserManage);

  return (
    <>
      {!isEmpty(user) && (
        <>
          <Header as="h3" textAlign="center">
            Current Competencies
          </Header>
          <List divided verticalAlign="middle">
            {currentComps.map((comp, i) => {
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
          </List>
        </>
      )}
    </>
  );
};

export default AdminCurrentComps;
