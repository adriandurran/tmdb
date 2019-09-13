import React, { useEffect } from 'react';
import { Header, Card } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { selectDepts } from '../../../reducers/selectors/deptSelectors';

import AdminDeptMenu from './AdminDeptMenu';
import AdminDeptUserStatus from './AdminDeptUserStatus';

import { fetchAllUsers } from '../../../actions/user';
import { fetchDept } from '../../../actions/dept';

const AdminDeptCards = ({ history }) => {
  const depts = useSelector(selectDepts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const handleCardClick = (e, { value }) => {
    dispatch(fetchDept(value)).then(() => {
      history.push(`/admin/dept-user-view/${value}`);
    });
  };

  const renderDeptCards = () => {
    return depts.map((dept) => {
      return (
        <Card raised key={dept._id} value={dept._id} onClick={handleCardClick}>
          <Card.Content>
            <Header as="h5">{dept.departmentName}</Header>
          </Card.Content>
          <AdminDeptUserStatus dept={dept._id} />
        </Card>
      );
    });
  };

  return (
    <>
      <Header as="h2" textAlign="center">
        Department Views
      </Header>
      <AdminDeptMenu />
      <Card.Group itemsPerRow={4} style={{ marginTop: '1em' }}>
        {renderDeptCards()}
      </Card.Group>
    </>
  );
};

export default withRouter(AdminDeptCards);
