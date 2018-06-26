import { createSelector } from 'reselect';

// courses
export const selectCourses = state => state.courses;

// course
export const selectCourse = state => state.course;

// get course types
export const selectCourseTypes = state => state.courseTypes;

export const selectCourseTypesForDropDown = createSelector(
  selectCourseTypes,
  types => {
    return types.map(type => {
      return { key: type._id, value: type.courseType, text: type.courseType };
    });
  }
);

// get the course levels
export const selectCourseLevels = state => state.courseLevels;

export const selectCourseLevelsForDropDown = createSelector(
  selectCourseLevels,
  levels => {
    return levels.map(level => {
      return {
        key: level._id,
        value: level.courseLevel,
        text: level.courseLevel
      };
    });
  }
);

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
