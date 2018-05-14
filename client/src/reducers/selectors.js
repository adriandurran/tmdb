import { createSelector } from 'reselect';
import _ from 'lodash';
import moment from 'moment';

import * as fromAuth from './users/authUser';

// roles
export const selectRoles = state => state.roles;

// competencies
export const selectCompetencies = state => state.comps;

// courses
export const selectCourses = state => state.courses;
export const selectCoursesForDropDown = createSelector(
  selectCourses,
  courses => {
    return courses.map(course => {
      return { key: course._id, value: course._id, text: course.coursename };
    });
  }
);
// get course types
export const selectCourseTypes = state => state.courseTypes;
// get the course levels
export const selectCourseLevels = state => state.courseLevels;

// ************ USER ************************

// concacanate the username....can be added to with rank etc...
export const selectUserName = state => fromAuth.selectUserName(state.auth);

// get the current user.....t
export const selectCurrentUser = state => state.auth.user;

export const selectAllUsers = state => state.allusers;

// match up the user roles
export const selectUserRoles = state => state.auth.user.roles;

export const selectUserRoleNames = createSelector(
  selectUserRoles,
  selectRoles,
  (userRoles, rolesList) =>
    _.filter(rolesList, x => _.includes(userRoles, x._id))
);

// match up the courses to the user
export const selectUserCourses = state => state.auth.user.courses;

export const selectUserCourseNames = createSelector(
  selectUserCourses,
  selectCourses,
  (userCourses, coursesList) => {
    const filteredList = _.filter(userCourses, x =>
      _.includes(_.map(coursesList, 'courseId'), x.courseId)
    );
    return _.map(filteredList, obj => {
      return _.assign(obj, _.find(coursesList, { _id: obj._id }));
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
            .isAfter(today) &&
          course.verified
        ) {
          return true;
        }

        return false;
      })
      .map(course => {
        return course._id;
      });
  }
);

// get competencies for a given role for a user

export const selectUserRoleComps = createSelector(
  selectUserRoleNames,
  selectCompetencies,
  (roles, comps) => {
    const flatty = _.flatten(_.map(roles, 'compIds'));
    return comps.filter(x => flatty.includes(x._id));
  }
);

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

// ************ END OF USER **************************************

// get courses for the compBuilder
export const selectCompBuilderCourses = state => state.compCourses;
export const selectCompBuilderCourseNames = createSelector(
  selectCourses,
  selectCompBuilderCourses,
  (courses, compcourses) => {
    return _.filter(courses, x => _.includes(_.map(compcourses, '_id'), x._id));
  }
);

// get the comps for the role builder
export const selectRoleBuilderComps = state => state.roleComps;
export const selectRoleBuilderCompNames = createSelector(
  selectCompetencies,
  selectRoleBuilderComps,
  (comps, rolecomps) => {
    return _.filter(comps, x => _.includes(_.map(rolecomps, '_id'), x._id));
  }
);

// get competencies for roles
export const selectRoleComps = createSelector(
  selectRoles,
  selectCompetencies,
  (roles, comps) => {
    const flatty = _.flatten(_.map(roles, 'compIds'));
    return comps.filter(x => flatty.includes(x._id));
  }
);

// get roles
