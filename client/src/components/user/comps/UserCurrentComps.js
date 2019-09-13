import React from 'react';

import { Icon, Card, List } from 'semantic-ui-react';

import { checkCompExpireDate } from '../../../utils/datehelpers';

import UserCompCourses from './UserCompCourses';

const UserCurrentComps = ({ currentComps, userCourses }) => {
  return (
    <>
      {currentComps.map((comp) => {
        return (
          <Card key={comp._id} fluid>
            <Card.Content>
              <Card.Header>
                {checkCompExpireDate(comp, userCourses) ? (
                  <Icon name="warning" color="orange" />
                ) : (
                  ''
                )}
                {comp.compName}
              </Card.Header>
              <Card.Description>
                {checkCompExpireDate(comp, userCourses) ? (
                  <span style={{ color: 'orange' }}>
                    One of the required courses for this Competency is due to
                    expire in 3 or less months
                  </span>
                ) : (
                  `All ${
                    comp.courses.length
                  } courses required for this Competency are in date`
                )}
              </Card.Description>
              <Card.Content>
                <List bulleted>
                  <UserCompCourses
                    competency={comp}
                    userCourses={userCourses}
                  />
                </List>
              </Card.Content>
            </Card.Content>
          </Card>
        );
      })}
    </>
  );
};

export default UserCurrentComps;
