import moment from 'moment';

export const coursesCurrentVerified = courses => {
  let today = moment(new Date(), 'YYYY-MM-DD').format();
  return courses
    .filter(course => {
      if (
        (moment(course.passDate, 'YYYY-MM-DD')
          .add(course._course.validity, 'months')
          .isAfter(today) &&
          course.verified) ||
        (course._course.validity === undefined && course.verified)
      ) {
        return true;
      }

      return false;
    })
    .map(course => course);
};

export const coursesExpired = courses => {
  return courses.filter(course =>
    moment(course.passDate, 'YYYY-MM-DD')
      .add(course._course.validity, 'months')
      .isBefore(Date.now())
  );
};

export const coursesVerify = courses => {
  return courses.filter(course => !course.verified);
};
