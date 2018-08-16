// return list of users for a given dept

export const deptUsers = (users, deptId) => {
  return users.filter((user) => {
    if (user.department) {
      return user.department._id === deptId;
    }
  });
};
