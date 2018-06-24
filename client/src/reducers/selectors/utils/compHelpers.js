import _ from 'lodash';

export const compsUserCurrent = (courses, comps) => {
  if (courses === null || comps === null) {
    return null;
  }
  let arrUserCoursesId = courses.map(course => course._course._id);
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
};
