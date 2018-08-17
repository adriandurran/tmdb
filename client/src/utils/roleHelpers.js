import { includes } from 'lodash';

// return a list of role users for a given role
export const roleUsers = (users, roleId) => {
  return users.filter((user) => {
    if (user.roles) {
      return includes(user.roles.map((role) => role._id), roleId);
    }
  });
};

export const noRoleUsers = (users) => {
  return users.filter((user) => user.roles.length === 0);
};
