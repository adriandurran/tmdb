import { createSelector } from 'reselect';
import _ from 'lodash';

import {
  coursesCurrentVerified,
  coursesExpired,
  coursesVerify
} from './utils/courseFilters';

import { compsUserCurrent } from './utils/compHelpers';

import { selectCompetencies } from './compSelectors';

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

// MANAGED USER MANAGED USER

// get the user to manage (admin function)
export const selectUserManage = state => state.user;
// get the courses for the current managed user
export const selectUserManageCourses = state => state.user.courses;

// this is for the user being managed
export const selectAdminUserRoles = state => state.user.roles;

// get unique competencies for a given role for a user being managed by admin
// need to filter by required ----- doing this on the component already
export const selectAdminUserRoleComps = createSelector(
  selectAdminUserRoles,
  roles => {
    if (roles === undefined) {
      return null;
    }
    return _.uniqBy(_.flatten(roles.map(role => role.competencies)), '_id');
  }
);

// Current and verified courses
export const selectUserManageCoursesCurrent = createSelector(
  selectUserManageCourses,
  usercourses => {
    return coursesCurrentVerified(usercourses);
  }
);

//  expired courses
export const selectUserManageCoursesExpired = createSelector(
  selectUserManageCourses,
  usercourses => {
    return coursesExpired(usercourses);
  }
);

// courses waiting for verification
export const SelectUserManageCoursesVerify = createSelector(
  selectUserManageCourses,
  usercourses => {
    return coursesVerify(usercourses);
  }
);

// compare users current courses to competencies to find what competencies he has
export const selectUserManageCompetenciesCurrent = createSelector(
  selectUserManageCoursesCurrent,
  selectCompetencies,
  (courses, comps) => {
    return compsUserCurrent(courses, comps);
  }
);
