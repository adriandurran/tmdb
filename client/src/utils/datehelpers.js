import moment from 'moment';
import _ from 'lodash';

export const checkCourseHasExpireDate = (course) => {
  console.log(course);
  if (
    course.validity === undefined ||
    course.validity === '' ||
    course.validity === null
  ) {
    return false;
  }

  return true;
};

export const checkCompExpireDate = (comp, usercourses) => {
  let arrCompCoursesId = comp.courses.map((course) => course._id);
  let arrUCourse = [];
  for (let x in arrCompCoursesId) {
    let uCourse = usercourses.filter(
      (course) => course._course._id === arrCompCoursesId[x]
    );

    if (uCourse) {
      arrUCourse.push(uCourse);
    }
  }
  arrUCourse = _.flatten(arrUCourse);

  for (let x in arrUCourse) {
    if (!checkCourseHasExpireDate(arrUCourse[x]._course)) {
      return false;
    }

    let dateCheck = moment(arrUCourse[x].passDate).add(
      arrUCourse[x]._course.validity,
      'months'
    );

    let now = moment(Date.now());

    if (dateCheck.diff(now, 'months') <= 3) {
      return true;
    }
  }
  return false;
};

export const checkCompExpireDate0 = (comp, usercourses) => {
  let arrCompCoursesId = comp.courses.map((course) => course._id);
  let arrUCourse = [];
  for (let x in arrCompCoursesId) {
    let uCourse = usercourses.filter(
      (course) => course._course._id === arrCompCoursesId[x]
    );

    if (uCourse) {
      arrUCourse.push(uCourse);
    }
  }
  arrUCourse = _.flatten(arrUCourse);

  for (let x in arrUCourse) {
    if (!checkCourseHasExpireDate(arrUCourse[x]._course)) {
      return false;
    }

    let dateCheck = moment(arrUCourse[x].passDate).add(
      arrUCourse[x]._course.validity,
      'months'
    );

    let now = moment(Date.now());

    if (dateCheck.diff(now, 'months') <= 0) {
      return true;
    }
  }
  return false;
};

export const expireDate = (date1, valid) => {
  return moment(date1).add(valid, 'months');
};

export const expireMonths = (date1, valid) => {
  if (valid === undefined || valid === '' || valid === null) {
    return 99;
  }
  let expDate = moment(date1).add(valid, 'months');
  return expDate.diff(moment(Date.now()), 'months');
};
