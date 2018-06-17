import { createSelector } from 'reselect';

// all users
export const selectAllUsers = state => state.allusers;

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
    return allusers.filter(user => {
      return user.courses.length > 0 && !user.courses.verified;
    });
  }
);
