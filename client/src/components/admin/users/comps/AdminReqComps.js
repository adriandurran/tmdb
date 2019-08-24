import React from 'react';
import { List } from 'semantic-ui-react';
import { useSelector } from 'react-redux';

import AdminCompCourses from './AdminCompCourses';
import { compExist } from '../../../../utils/arrayhelpers';

import { selectUserManageCompetenciesCurrent } from '../../../../reducers/selectors/adminSelectors';

const AdminReqComps = ({ competencies }) => {
  const currentComps = useSelector(selectUserManageCompetenciesCurrent);

  return (
    <>
      {competencies.map((comp) => {
        let compSt = 'Required';
        if (comp.compType) {
          compSt = comp.compType.compType;
        }
        return (
          <List.Item key={comp._id}>
            {compExist(comp, currentComps) ? (
              <List.Icon
                name="check circle"
                color="green"
                size="large"
                verticalAlign="middle"
              />
            ) : (
              <List.Icon
                name={
                  compSt === 'Required'
                    ? 'exclamation circle'
                    : 'exclamation triangle'
                }
                color={compSt === 'Required' ? 'red' : 'orange'}
                size="large"
                verticalAlign="middle"
              />
            )}
            <List.Content>
              <List.Header>
                {comp.compName} - {compSt}
              </List.Header>
              <List.Description>
                {comp.courses.length} Courses required for Competency
              </List.Description>
              <List.List>
                <AdminCompCourses courses={comp.courses} />
              </List.List>
            </List.Content>
          </List.Item>
        );
      })}
    </>
  );
};

export default AdminReqComps;
