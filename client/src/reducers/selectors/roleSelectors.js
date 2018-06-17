import { createSelector } from 'reselect';

// roles
export const selectRoles = state => state.roles;
//  roles for dropdown
export const selectRolesForDropDown = createSelector(selectRoles, roles => {
  return roles.map(role => {
    return {
      text: role.roleName,
      value: role._id,
      key: role._id
    };
  });
});
