import moment from 'moment';

export const coursesCurrentVerified = courses => {
  if (courses === undefined) {
    return null;
  }

  let today = moment(new Date(), 'YYYY-MM-DD').format();
  return courses
    .filter(course => {
      if (
        (moment(course.passDate, 'YYYY-MM-DD')
          .add(course._course.validity, 'months')
          .isAfter(today) &&
          course.verified) ||
        (course._course.validity === undefined ||
          course._course.validity === null ||
          (course._course.validity === '' && course.verified))
      ) {
        return true;
      }

      return false;
    })
    .map(course => course);
};

export const coursesExpired = courses => {
  if (courses === undefined) {
    return null;
  }
  return courses.filter(course => {
    return (
      course.validity &&
      moment(course.passDate, 'YYYY-MM-DD')
        .add(course._course.validity, 'months')
        .isBefore(Date.now())
    );
  });
};

export const coursesVerify = courses => {
  if (courses === undefined) {
    return null;
  }
  return courses.filter(course => !course.verified);
};

// returns the user id and only their expired courses
export const coursesExpiredActiveUser = users => {
  return users.reduce((result, user) => {
    let currentCourses = coursesExpired(user.courses);
    if (currentCourses.length > 0) {
      result.push({
        _id: user._id,
        currentCourses
      });
    }
    return result;
  }, []);
};

// returns the user id and only their active courses
export const coursesActiveUser = users => {
  return users.reduce((result, user) => {
    let currentCourses = coursesCurrentVerified(user.courses);
    if (currentCourses.length > 0) {
      result.push({
        _id: user._id,
        currentCourses
      });
    }
    return result;
  }, []);
};
