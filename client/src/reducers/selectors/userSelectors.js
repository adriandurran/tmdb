import { createSelector } from 'reselect';
import _ from 'lodash';
import moment from 'moment';

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
    let today = moment(new Date(), 'YYYY-MM-DD').format();
    return usercourses
      .filter(course => {
        if (
          (moment(course.passDate, 'YYYY-MM-DD')
            .add(course._course.validity, 'months')
            .isAfter(today) &&
            course.verified) ||
          (course._course.validity === undefined && course.verified)
        ) {
          return true;
        }

        return false;
      })
      .map(course => course);
  }
);

// courses that are expired
export const selectUserCoursesExpired = createSelector(
  selectUserCourses,
  usercourses => {
    return usercourses.filter(course =>
      moment(course.passDate, 'YYYY-MM-DD')
        .add(course._course.validity, 'months')
        .isBefore(Date.now())
    );
  }
);

// courses that are waiting verification
export const selectUserCoursesVerify = createSelector(
  selectUserCourses,
  usercourses => {
    return usercourses.filter(course => !course.verified);
  }
);

// get unique competencies for a given role for a user
export const selectUserRoleComps = createSelector(selectUserRoles, roles => {
  return _.uniqBy(_.flatten(roles.map(role => role.competencies)), '_id');
});

// compare users current courses to competencies to find what competencies he has
export const selectUserCompetenciesCurrent = createSelector(
  selectUserCoursesCurrent,
  selectCompetencies,
  (curcourses, comps) => {
    let curlength = curcourses.length;
    return comps.filter(comp => {
      if (comp.courses.length <= curlength) {
        let compare = _.intersection(curcourses, comp.courses);
        if (compare.length >= comp.courses.length) {
          return true;
        }
      }
      return false;
    });
  }
);
