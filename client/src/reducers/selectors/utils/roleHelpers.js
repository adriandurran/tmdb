// return a tole for an Id
export const getRole = (roles, roleId) => {
  return roles.filter((role) => role._id === roleId);
};
