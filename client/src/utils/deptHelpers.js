// return list of users for a given dept
export const deptUsers = (users, deptId) => {
  return users
    .filter((user) => user.department.dept)
    .filter((user) => user.department.dept._id === deptId);
};

// return a distinct set of role ids for a dept of users
// changed to reflect the new role structire for users
export const deptRoles = (users) => {
  const usersInDeptRoles = users
    .filter((user) => user.roles.length > 0 && user.roles !== null)
    .map((user) => user.roles);
  return [...new Set(usersInDeptRoles.flat().map((role) => role._role._id))];
};
