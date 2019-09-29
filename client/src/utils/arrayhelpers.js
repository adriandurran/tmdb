import { flatten } from 'lodash';

export const compExist = (req, curs) => {
  // filter the users competencies to see if the required competency is there
  let isThere = curs.filter((comp) => comp._id === req._id);
  if (isThere.length > 0) {
    return true;
  }
  return false;
};

// should this be on a selector?????
export const getUserCoursesForComp = (comp, usercourses) => {
  let arrCompCoursesId = comp.courses.map((course) => course._id);
  let arrUCourse = [];
  // eslint-disable-next-line
  for (let x in arrCompCoursesId) {
    let uCourse = usercourses.filter(
      (course) => course._course._id === arrCompCoursesId[x]
    );

    if (uCourse) {
      arrUCourse.push(uCourse);
    }
  }
  return flatten(arrUCourse);
};
