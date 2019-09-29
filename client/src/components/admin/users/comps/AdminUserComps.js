import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';

import { List, Header, Accordion } from 'semantic-ui-react';

import AdminRoleReqComps from './AdminRoleReqComps';
import AdminCurrentComps from './AdminCurrentComps';

import {
  selectUserManage,
  selectUserManageCompetenciesCurrent
} from '../../../../reducers/selectors/adminSelectors';

import { fetchComps } from '../../../../actions/comps';

const AdminUserComps = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserManage);
  const currentComps = useSelector(selectUserManageCompetenciesCurrent);

  useEffect(() => {
    dispatch(fetchComps());
  }, [dispatch]);

  return (
    <>
      {!isEmpty(user) && (
        <>
          <Header as="h3" textAlign="center">
            Competencies
          </Header>
          <Accordion fluid styled>
            <AdminRoleReqComps user={user} />
          </Accordion>
          <Header as="h4" textAlign="center">
            Current Competencies
          </Header>
          <List divided verticalAlign="middle">
            <AdminCurrentComps user={user} currentComps={currentComps} />
          </List>
        </>
      )}
    </>
  );
};

export default AdminUserComps;
