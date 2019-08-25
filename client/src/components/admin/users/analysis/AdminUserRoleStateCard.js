import React, { useState, useEffect } from 'react';
import { Card, Icon, Header, List } from 'semantic-ui-react';
import { format, parseISO } from 'date-fns';
import { useSelector } from 'react-redux';
import { compExist } from '../../../../utils/arrayhelpers';
import { calcTimeToSQEP } from '../../../../utils/datehelpers';

import { selectUserManageCompetenciesCurrent } from '../../../../reducers/selectors/adminSelectors';

import AdminReqComps from '../comps/AdminReqComps';

const AdminUserRoleStateCard = ({ role }) => {
  const currentComps = useSelector(selectUserManageCompetenciesCurrent);
  const [isSQEP, setSQEP] = useState(false);

  const { roleName, timeToSQEP, competencies } = role._role;

  useEffect(() => {
    const roleCompLength = competencies.length;
    const checkSQEP = () => {
      for (let i = 0; i < roleCompLength; i++) {
        if (competencies[i].compType.compType === 'Required') {
          setSQEP(compExist(competencies[i], currentComps));
        }
      }
    };
    checkSQEP();
  }, [competencies, currentComps]);

  return (
    <Card>
      <Card.Content>
        <Icon
          name={isSQEP ? 'smile' : 'meh'}
          size="huge"
          color={isSQEP ? 'green' : 'red'}
          style={{ float: 'right' }}
        />

        <Card.Header>{roleName}</Card.Header>
        <Card.Meta>Time to SQEP is {timeToSQEP} months</Card.Meta>
        <Card.Meta>
          Assigned on {format(parseISO(role.joinDate), 'dd MMM yyyy')}
        </Card.Meta>

        <Card.Description>
          <Header as="h4" textAlign="center">
            Competencies
          </Header>
          <List divided verticalAlign="middle">
            <AdminReqComps competencies={competencies} />
          </List>
        </Card.Description>
      </Card.Content>
      {isSQEP && timeToSQEP !== 0 ? (
        <Card.Content extra>
          <Icon name="check circle" color="green" />
          Suitably Qualified for this Role
        </Card.Content>
      ) : (
        <Card.Content extra>
          <Icon name="warning circle" color="red" />
          {calcTimeToSQEP(role.joinDate, timeToSQEP)} months to achieve SQEP
        </Card.Content>
      )}
    </Card>
  );
};

export default AdminUserRoleStateCard;
