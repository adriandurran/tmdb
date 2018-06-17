import { createSelector } from 'reselect';
import _ from 'lodash';

// all users
export const selectAllUsers = state => state.allusers;

// get the user to manage (admin function)
export const selectUserManage = state => state.user;

// this is for the user being managed
export const selectAdminUserRoles = state => state.user.roles;

// get all users that require verification
export const selectAllUsersVerify = createSelector(selectAllUsers, allusers =>
  allusers.filter(user => user.verified === false)
);

// get all users that are verified
export const selectAllUsersActive = createSelector(selectAllUsers, allusers =>
  allusers.filter(user => user.verified === true)
);

// get the users for the search that are active
export const selectAllUsersForSearch = createSelector(
  selectAllUsersActive,
  allusers => {
    return allusers.map(user => {
      return {
        title: `${user.firstName} ${user.lastName}`,
        description: user.username,
        key: user._id
      };
    });
  }
);

// all active users for serach but not admins
export const selectAllUsersForSearchNoAdmins = createSelector(
  selectAllUsersActive,
  allusers => {
    return allusers
      .filter(user => !user.isAdmin && !user.isSuperAdmin)
      .map(user => {
        return {
          title: `${user.firstName} ${user.lastName}`,
          description: user.username,
          key: user._id
        };
      });
  }
);

// get all users that are admins && active
export const selectAllUsersAdmins = createSelector(selectAllUsers, allusers =>
  allusers.filter(user => user.verified === true && user.isAdmin === true)
);

// COURSES

// get courses awaiting verification from all users
export const selectAllUsersCoursesVerify = createSelector(
  selectAllUsers,
  allusers => {
    const usersVerifyCourses = allusers.filter(user => {
      return user.courses.length > 0 && !user.courses.verified;
    });
    const VeriList = [];
    usersVerifyCourses.map(user => {
      for (let x in user.courses) {
        let tmpC = {};
        if (!user.courses[x].verified) {
          tmpC = {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            course: user.courses[x]
          };

          VeriList.push(tmpC);
        }
      }
    });
    return VeriList;
  }
);

// get unique competencies for a given role for a user being managed by admin
export const selectAdminUserRoleComps = createSelector(
  selectAdminUserRoles,
  roles => {
    if (roles === undefined) {
      return null;
    }
    return _.uniqBy(_.flatten(roles.map(role => role.competencies)), '_id');
  }
);
