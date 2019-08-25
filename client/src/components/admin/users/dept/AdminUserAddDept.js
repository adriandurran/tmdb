import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';
import { parseISO, format } from 'date-fns';

import { Card, Dropdown, Button } from 'semantic-ui-react';

import { selectUserManage } from '../../../../reducers/selectors/adminSelectors';
import { selectDeptsForDropDown } from '../../../../reducers/selectors/deptSelectors';
import { selectCurrentUser } from '../../../../reducers/selectors/userSelectors';
import { adminAssignDept } from '../../../../actions/user';

const AdminUserAddDept = () => {
  const dispatch = useDispatch();
  const curr = useSelector(selectCurrentUser);
  const user = useSelector(selectUserManage);
  const depts = useSelector(selectDeptsForDropDown);
  const [dept, setDept] = useState(null);

  const handleDepChange = (e, item) => {
    setDept({ dept: item.value });
  };

  const assignDept = () => {
    dispatch(adminAssignDept(curr._id, user._id, dept));
  };

  const {
    joinDate,
    dept: { departmentName }
  } = user.department;

  return (
    <>
      {!isEmpty(user) && (
        <Card centered style={{ marginTop: '1em' }}>
          <Card.Content>
            {isEmpty(user.department) ? (
              <Card.Header textAlign="center">
                No Department Assigned
              </Card.Header>
            ) : (
              <Card.Header textAlign="center">
                {departmentName} joined on{' '}
                {format(parseISO(joinDate), 'dd MMM yyyy')}
              </Card.Header>
            )}
            <Card.Description>
              <Dropdown
                selection
                fluid
                name="department"
                options={depts}
                placeholder="Select a Department"
                onChange={handleDepChange}
              />
              <Button
                fluid
                onClick={assignDept}
                disabled={isEmpty(user)}
                size="medium"
                style={{ marginTop: '1em' }}
              >
                Assign Department
              </Button>
            </Card.Description>
          </Card.Content>
        </Card>
      )}
    </>
  );
};

// const mapDispatchToProps = { adminAssignDept };

// const mapStateToProps = (state) => {
//   return {
//     user: selectUserManage(state),
//     depts: selectDeptsForDropDown(state),
//     curr: selectCurrentUser(state)
//   };
// };

// AdminUserAddDept = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(AdminUserAddDept);

export default AdminUserAddDept;
