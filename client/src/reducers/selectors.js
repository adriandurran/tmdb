import { createSelector } from 'reselect';
import _ from 'lodash';
import moment from 'moment';

import * as fromAuth from './users/authUser';

// concacanate the username....can be added to with rank etc...
export const selectUserName = state => fromAuth.selectUserName(state.auth);

// match up the user roles
export const selectUserRoles = state => state.auth.user.roles;
export const selectRoles = state => state.roles;
export const selectUserRoleNames = createSelector(
  selectUserRoles,
  selectRoles,
  (userRoles, rolesList) =>
    _.filter(rolesList, x => _.includes(userRoles, x.roleId))
);

// match up the courses to the user
export const selectUserCourses = state => state.auth.user.courses;
export const selectCourses = state => state.courses;
export const selectUserCourseNames = createSelector(
  selectUserCourses,
  selectCourses,
  (userCourses, coursesList) => {
    const filteredList = _.filter(userCourses, x =>
      _.includes(_.map(coursesList, 'courseId'), x.courseId)
    );
    return _.map(filteredList, obj => {
      return _.assign(obj, _.find(coursesList, { courseId: obj.courseId }));
    });
  }
);

// get the user courses that are current
export const selectUserCoursesCurrent = createSelector(
  selectUserCourseNames,
  usercourses => {
    let today = moment(new Date(), 'YYYY-MM-YY').format();
    return usercourses
      .filter(course => {
        if (
          moment(course.passDate, 'YYYY-MM-DD')
            .add(course.validity, 'months')
            .isAfter(today)
        ) {
          return true;
        }

        return false;
      })
      .map(course => {
        return course.courseId;
      });
  }
);

// competencies
export const selectCompetencies = state => state.comps;

// get competencies for a given role

export const selectUserRoleComps = createSelector(
  selectUserRoleNames,
  selectCompetencies,
  (roles, comps) => {
    const flatty = _.flatten(_.map(roles, 'compIds'));
    return comps.filter(x => flatty.includes(x.compId));
  }
);

// compare users current courses to competencies to find what competencies he has

export const selectUserCompetenciesCurrent = createSelector(
  selectUserCoursesCurrent,
  selectCompetencies,
  (curcourses, comps) => {
    let curlength = curcourses.length;
    return comps.filter(comp => {
      if (comp.courseIds.length <= curlength) {
        let compare = _.intersection(curcourses, comp.courseIds);
        if (compare.length >= comp.courseIds.length) {
          return true;
        }
      }
      return false;
    });
  }
);
