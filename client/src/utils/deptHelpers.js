import { uniq, map } from 'lodash';

// return list of users for a given dept
export const deptUsers = (users, deptId) => {
  return users
    .filter((user) => user.department.dept)
    .filter((user) => user.department.dept._id === deptId);
};

// return a distinct set of role ids for a dept of users
export const deptRoles = (users) => {
  return users
    .filter((user) => user.roles.length > 0 && user.roles !== null)
    .map((user) => {
      return uniq(map(user.roles, '_id'));
    });
};
