import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { List, Header, Icon, Button } from 'semantic-ui-react';

import { selectDepts } from '../../../reducers/selectors/deptSelectors';
import { fetchDeptNew } from '../../../actions/dept';
import { FETCH_DEPT, CLEAR_DEPT } from '../../../actions/types';

const AdminDeptList = ({ history }) => {
  const depts = useSelector(selectDepts);
  const fetchTheDept = useDispatch();

  const renderDeptList = () => {
    // const { depts } = this.props;

    return depts.map((dept) => {
      return (
        <List.Item key={dept._id}>
          <List.Content floated="right">
            <Button icon onClick={handleListClick} value={dept._id}>
              <Icon name="wrench" />
            </Button>
          </List.Content>
          <List.Content>
            {dept.departmentName} ({dept.departmentCode})
          </List.Content>
        </List.Item>
      );
    });
  };

  const handleListClick = async (e, { value }) => {
    fetchTheDept({ type: CLEAR_DEPT });
    const result = await fetchDeptNew(value);
    fetchTheDept({ type: FETCH_DEPT, payload: result.data });
    history.push(`/admin/dept-manager/view/${value}`);
  };

  return (
    <div>
      <Header as="h3" textAlign="center">
        Department List
      </Header>
      <List divided verticalAlign="middle">
        {renderDeptList()}
      </List>
    </div>
  );
};

export default withRouter(AdminDeptList);
