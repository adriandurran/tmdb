// return list of users for a given dept
export const deptUsers = (users, deptId) => {
  return users
    .filter((user) => user.department)
    .filter((user) => user.department._id === deptId);
};
