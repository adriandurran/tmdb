import _ from 'lodash';

export const compsHolderCheck = (courses, comp) => {
  if (courses === null || comp === null) {
    return null;
  }

  let arrUserCoursesId = courses.map((course) => course._course._id);
  let curlength = arrUserCoursesId.length;
  let arrCompCoursesId = comp.courses.map((course) => course._id);
  if (arrCompCoursesId.length <= curlength) {
    let compare = _.intersection(arrUserCoursesId, arrCompCoursesId);
    if (compare.length >= arrCompCoursesId.length) {
      return true;
    }
  }
  return false;
};
