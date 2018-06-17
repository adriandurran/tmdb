import { createSelector } from 'reselect';
import _ from 'lodash';
import moment from 'moment';

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

// competencies
export const selectCompetencies = state => state.comps;
export const selectCompetenciesForDropDown = createSelector(
  selectCompetencies,
  comps => {
    return comps.map(comp => {
      // this is temp until a comp has a comptype
      let compy = '';
      if (!_.isEmpty(comp.compType)) {
        compy = comp.compType.compType.toUpperCase();
      }
      return {
        key: comp._id,
        value: comp._id,
        text: `${comp.compName} -- ${compy}`
      };
    });
  }
);
// get competency types
export const selectCompetencyTypes = state => state.compTypes;
export const selectCompetencyTypesForDropDown = createSelector(
  selectCompetencyTypes,
  compTypes => {
    return compTypes.map(type => {
      return {
        key: type._id,
        value: type._id,
        text: type.compType
      };
    });
  }
);

// courses
export const selectCourses = state => state.courses;

// course
export const selectCourse = state => state.course;

export const selectCoursesForSearch = createSelector(selectCourses, courses => {
  return courses
    .filter(course => course.validity > 0 || course.validity === undefined)
    .map(course => {
      let validDetails = '';
      if (course.validity !== undefined) {
        validDetails = `Valid for ${course.validity} months`;
      } else {
        validDetails = 'No expiry date';
      }
      return {
        key: course._id,
        value: course._id,
        title: course.courseName,
        description: `${course.type} ${course.level} -- ${validDetails}`
      };
    });
});

export const selectCoursesForDropDown = createSelector(
  selectCourses,
  courses => {
    return courses.map(course => {
      let validDetails = '';
      let disFlag = false;
      if (course.validity >= 0) {
        if (course.validity > 0) {
          validDetails = `Valid for ${course.validity} months`;
        }
        if (course.validity === 0) {
          validDetails = 'Course has expired - DO NOT USE';
          disFlag = true;
        }
      } else {
        validDetails = 'No expiry date';
      }
      return {
        key: course._id,
        value: course._id,
        text: `${course.courseName} -- ${validDetails}`,
        disabled: disFlag
      };
    });
  }
);
// get course types
export const selectCourseTypes = state => state.courseTypes;
// get the course levels
export const selectCourseLevels = state => state.courseLevels;

// ************ USER ************************

// get the current user.....t
export const selectCurrentUser = state => state.auth.user;

// get the user to manage (admin function)
export const selectUserManage = state => state.user;

// // get all users that require verification
// export const selectAllUsersVerify = createSelector(selectAllUsers, allusers =>
//   allusers.filter(user => user.verified === false)
// );

// // get all users that are verified
// export const selectAllUsersActive = createSelector(selectAllUsers, allusers =>
//   allusers.filter(user => user.verified === true)
// );

// // get the users for the search that are active
// export const selectAllUsersForSearch = createSelector(
//   selectAllUsersActive,
//   allusers => {
//     return allusers.map(user => {
//       return {
//         title: `${user.firstName} ${user.lastName}`,
//         description: user.username,
//         key: user._id
//       };
//     });
//   }
// );

// // all active users for serach but not admins
// export const selectAllUsersForSearchNoAdmins = createSelector(
//   selectAllUsersActive,
//   allusers => {
//     return allusers
//       .filter(user => !user.isAdmin && !user.isSuperAdmin)
//       .map(user => {
//         return {
//           title: `${user.firstName} ${user.lastName}`,
//           description: user.username,
//           key: user._id
//         };
//       });
//   }
// );

// // get all users that are admins && active
// export const selectAllUsersAdmins = createSelector(selectAllUsers, allusers =>
//   allusers.filter(user => user.verified === true && user.isAdmin === true)
// );

// get the user roles for the current/logged in user
export const selectUserRoles = state => state.auth.user.roles;

// this is for the user being managed
export const selectAdminUserRoles = state => state.user.roles;

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
            .add(course.validity, 'months')
            .isAfter(today) &&
            course.verified) ||
          (course.validity === undefined && course.verified)
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
        .add(course.validity, 'months')
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
// export const selectCompBuilderCourses = state => state.compCourses;
// export const selectCompBuilderCourseNames = createSelector(
//   selectCourses,
//   selectCompBuilderCourses,
//   (courses, compcourses) => {
//     return _.filter(courses, x => _.includes(_.map(compcourses, '_id'), x._id));
//   }
// );

// // get the comps for the role builder
// export const selectRoleBuilderComps = state => state.roleComps;
// export const selectRoleBuilderCompNames = createSelector(
//   selectCompetencies,
//   selectRoleBuilderComps,
//   (comps, rolecomps) => {
//     return _.filter(comps, x => _.includes(_.map(rolecomps, '_id'), x._id));
//   }
// );

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
