import { createSelector } from 'reselect';
import _ from 'lodash';

import {
  coursesCurrentVerified,
  coursesExpired,
  coursesVerify,
  coursesActiveUser,
  coursesExpiredActiveUser
} from './utils/courseFilters';

import { compsUserCurrent, compsHolderCheck } from './utils/compHelpers';
import { coursesUserVerify } from './utils/courseFilters';

import { selectRole } from './roleSelectors';
import { selectCompetencies, selectCompetency } from './compSelectors';
import { selectCourse } from './courseSelectors';
import { selectDept } from './deptSelectors';

// all users
export const selectAllUsers = (state) => state.allusers;

// get all users that require verification
export const selectAllUsersVerify = createSelector(
  selectAllUsers,
  (allusers) => {
    const allUsersVerify = allusers.filter((user) => user.verified === false);
    return allUsersVerify.sort((a, b) =>
      a.firstName.localeCompare(b.firstName)
    );
  }
);

// get all users that are verified
export const selectAllUsersActive = createSelector(
  selectAllUsers,
  (allusers) => allusers.filter((user) => user.verified === true)
);

// get the users for the search that are active
export const selectAllUsersForSearch = createSelector(
  selectAllUsersActive,
  (allusers) => {
    const allUsersArray = allusers.map((user) => {
      return {
        title: `${user.firstName} ${user.lastName}`,
        description: user.username,
        key: user._id
      };
    });

    return allUsersArray.sort((a, b) => a.title.localeCompare(b.title));
  }
);

// all active users for serach but not admins
export const selectAllUsersForSearchNoAdmins = createSelector(
  selectAllUsersActive,
  (allusers) => {
    const allUsersNoAdminArray = allusers
      .filter((user) => !user.isAdmin && !user.isSuperAdmin)
      .map((user) => {
        return {
          title: `${user.firstName} ${user.lastName}`,
          description: user.username,
          key: user._id
        };
      });
    return allUsersNoAdminArray.sort((a, b) => a.title.localeCompare(b.title));
  }
);

// get all users that are admins && active
export const selectAllUsersAdmins = createSelector(
  selectAllUsers,
  (allusers) =>
    allusers.filter((user) => user.verified === true && user.isAdmin === true)
);

// COURSES

// get courses awaiting verification from all users
export const selectAllUsersCoursesVerify = createSelector(
  selectAllUsers,
  (allusers) => {
    return allusers
      .filter((user) => {
        return user.courses.length > 0 && !user.courses.verified;
      })
      .reduce((ctr, userObj) => {
        ctr = ctr.concat(coursesUserVerify(userObj));
        return ctr;
      }, []);
  }
);

// MANAGED USER MANAGED USER

// get the user to manage (admin function)
export const selectUserManage = (state) => state.user;
// get the courses for the current managed user
export const selectUserManageCourses = (state) => state.user.courses;

// this is for the user being managed
export const selectAdminUserRoles = (state) => state.user.roles;

// get unique competencies for a given role for a user being managed by admin
// need to filter by required ----- doing this on the component already
export const selectAdminUserRoleComps = createSelector(
  selectAdminUserRoles,
  (roles) => {
    if (roles === undefined) {
      return null;
    }
    return _.uniqBy(_.flatten(roles.map((role) => role.competencies)), '_id');
  }
);

// return the comps organised by role
export const selectAdminUserRoleCompsOrg = createSelector(
  selectAdminUserRoles,
  (roles) => {
    if (roles === undefined) {
      return null;
    }
    return roles.map((role) => role.competencies);
  }
);

// Current and verified courses
export const selectUserManageCoursesCurrent = createSelector(
  selectUserManageCourses,
  (usercourses) => {
    return coursesCurrentVerified(usercourses);
  }
);

//  expired courses
export const selectUserManageCoursesExpired = createSelector(
  selectUserManageCourses,
  (usercourses) => {
    return coursesExpired(usercourses);
  }
);

// courses waiting for verification
export const selectUserManageCoursesVerify = createSelector(
  selectUserManageCourses,
  (usercourses) => {
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

// find all users who hold a given competency
export const selectUsersCompetencyHolders = createSelector(
  selectAllUsersActive,
  selectCompetency,
  (users, comp) => {
    // first of all get a list of all users that have current courses.
    // return only current courses
    let allUsersCurrent = coursesActiveUser(users);
    // compare ?intersection? with competency courses to see if they have the comp
    let compHolders = allUsersCurrent
      .filter((user) => compsHolderCheck(user.currentCourses, comp))
      .map((user) => user._id);

    // return these users. full details
    return users.filter((user) => {
      return _.includes(compHolders, user._id);
    });
  }
);

export const selectUsersCourseHolders = createSelector(
  selectAllUsersActive,
  selectCourse,
  (users, course) => {
    // get all the indate courses for a user
    // need to think about the courses on the users.....if it changes they have historical course
    // until all users are updated.......incl current user.....done this in actions
    let allUsersCurrent = coursesActiveUser(users);

    // return only users who have the course
    let courseHolders = allUsersCurrent
      .filter((user) => {
        return _.includes(
          user.currentCourses.map((course) => course._course._id),
          course._id
        );
      })
      .map((user) => user._id);

    return users.filter((user) => {
      return _.includes(courseHolders, user._id);
    });
  }
);

export const selectUsersCourseHoldersExpired = createSelector(
  selectAllUsersActive,
  selectCourse,
  (users, course) => {
    // get all the indate courses for a user
    // need to think about the courses on the users.....if it changes they have historical course
    // until all users are updated.......incl current user.....done this in actions
    let allUsersCurrent = coursesExpiredActiveUser(users);

    // return only users who have the course
    let courseHolders = allUsersCurrent
      .filter((user) => {
        return _.includes(
          user.currentCourses.map((course) => course._course._id),
          course._id
        );
      })
      .map((user) => user._id);

    return users.filter((user) => {
      return _.includes(courseHolders, user._id);
    });
  }
);

export const selectUsersRoleHolders = createSelector(
  selectAllUsersActive,
  selectRole,
  (users, role) => {
    return users.filter((user) => {
      return _.includes(user.roles.map((role) => role._id), role._id);
    });
  }
);

export const selectAllUsersActiveNoDept = createSelector(
  selectAllUsersActive,
  (users) => {
    return users.filter((user) => _.isEmpty(user.department.dept));
  }
);

export const selectAllUsersActiveDept = createSelector(
  selectAllUsersActive,
  (users) => {
    return users.filter((user) => !_.isEmpty(user.department.dept));
  }
);

export const selectUsersInDept = createSelector(
  selectAllUsersActiveDept,
  selectDept,
  (users, dept) => {
    return users.filter((user) => user.department.dept._id === dept._id);
  }
);

export const selectUniqueRolesInDept = createSelector(
  selectUsersInDept,
  (users) => {
    return _.uniqBy(_.flatten(users.map((user) => user.roles)), '_id');
  }
);
