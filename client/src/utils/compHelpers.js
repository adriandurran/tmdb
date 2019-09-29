import { intersection } from 'lodash';

export const compsHolderCheck = (courses, comp) => {
  if (courses === null || comp === null) {
    return null;
  }

  let arrUserCoursesId = courses.map((course) => course._course._id);
  let curlength = arrUserCoursesId.length;
  let arrCompCoursesId = comp.courses.map((course) => course._id);
  if (arrCompCoursesId.length <= curlength) {
    let compare = intersection(arrUserCoursesId, arrCompCoursesId);
    if (compare.length >= arrCompCoursesId.length) {
      return true;
    }
  }
  return false;
};

export const courseForCompsCheck = (course, userCourses) => {
  if (userCourses.length === 0) {
    return false;
  }
  const doneCourse = userCourses.filter(
    (ucourse) => course._id === ucourse._course._id
  );

  if (doneCourse.length > 0) {
    return true;
  }

  return false;
};
