import React, { useState } from 'react';
import { List, Accordion, Icon } from 'semantic-ui-react';
import { isEmpty } from 'lodash';

import AdminReqComps from './AdminReqComps';

const RoleReqComps = ({ user }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;

    setActiveIndex(newIndex);
  };

  return (
    <>
      {!isEmpty(user) &&
        user.roles.map((role, i) => {
          const { _id, competencies, roleName, timeToSQEP } = role._role;
          const { joinDate } = role;
          return (
            <>
              <Accordion.Title
                active={activeIndex === i}
                index={i}
                onClick={handleClick}
                key={_id}
              >
                <Icon name="dropdown" />
                {roleName} {`(time to SQEP is ${timeToSQEP} months)`}
              </Accordion.Title>
              <Accordion.Content active={activeIndex === i} key={_id + i}>
                <List divided verticalAlign="middle">
                  <AdminReqComps competencies={competencies} />
                </List>
              </Accordion.Content>
            </>
          );
        })}
    </>
  );
};

export default RoleReqComps;
