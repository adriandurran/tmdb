import { includes } from 'lodash';

// return a list of role users for a given role
export const roleUsers = (users, roleId) => {
  return users
    .filter((user) => user.roles.length > 0)
    .filter((user) => {
      return includes(user.roles.map((role) => role._role._id), roleId);
    });
};

export const noRoleUsers = (users) => {
  return users.filter((user) => user.roles.length === 0);
};

// return a Role for an roleId
export const getRole = (roles, roleId) => {
  return roles.filter((role) => role._id === roleId);
};
