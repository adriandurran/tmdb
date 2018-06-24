import { createSelector } from 'reselect';
import _ from 'lodash';
import moment from 'moment';

import {
  coursesCurrentVerified,
  coursesExpired,
  coursesVerify
} from './utils/courseFilters';

import { selectCompetencies } from './compSelectors';

// get the current user.....t
export const selectCurrentUser = state => state.auth.user;

// get the user roles for the current/logged in user
export const selectUserRoles = state => state.auth.user.roles;

// match up the courses to the user
export const selectUserCourses = state => state.auth.user.courses;

// get the user courses that are current
// this one can be altered
// need to include non expired courses
// split into 3
// expired courses
// current courses
// courses awaiting verification

// current active verified courses
export const selectUserCoursesCurrent = createSelector(
  selectUserCourses,
  usercourses => {
    return coursesCurrentVerified(usercourses);
  }
);

// courses that are expired
export const selectUserCoursesExpired = createSelector(
  selectUserCourses,
  usercourses => {
    return coursesExpired(usercourses);
  }
);

// courses that are waiting verification
export const selectUserCoursesVerify = createSelector(
  selectUserCourses,
  usercourses => {
    return coursesVerify(usercourses);
  }
);

// get unique competencies for a given role for a user
// need to filter by required competencies
export const selectUserRoleComps = createSelector(selectUserRoles, roles => {
  return _.uniqBy(_.flatten(roles.map(role => role.competencies)), '_id');
});

// compare users current courses to competencies to find what competencies he has
export const selectUserCompetenciesCurrent = createSelector(
  selectUserCoursesCurrent,
  selectCompetencies,
  (usercourses, comps) => {
    let arrUserCoursesId = usercourses.map(course => course._course._id);
    let curlength = arrUserCoursesId.length;

    return comps.filter(comp => {
      if (comp.courses.length <= curlength) {
        let arrCompCoursesId = comp.courses.map(course => course._id);

        let compare = _.intersection(arrUserCoursesId, arrCompCoursesId);
        if (compare.length >= comp.courses.length) {
          return true;
        }
      }
      return false;
    });
  }
);
