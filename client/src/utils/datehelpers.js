import moment from 'moment';
import _ from 'lodash';

export const checkCompExpireDate = (comp, usercourses) => {
  let arrCompCoursesId = comp.courses.map(course => course._id);
  let arrUCourse = [];
  for (let x in arrCompCoursesId) {
    let uCourse = usercourses.filter(
      course => course._course._id === arrCompCoursesId[x]
    );

    if (uCourse) {
      arrUCourse.push(uCourse);
    }
  }
  arrUCourse = _.flatten(arrUCourse);

  for (let x in arrUCourse) {
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

export const expireDate = (date1, valid) => {
  return moment(date1).add(valid, 'months');
};
