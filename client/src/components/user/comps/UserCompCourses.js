import React from 'react';
import Moment from 'react-moment';
import { List } from 'semantic-ui-react';

import {
  checkCourseHasExpireDate,
  expireDate,
  expireMonths
} from '../../../utils/datehelpers';

import { getUserCoursesForComp } from '../../../utils/arrayhelpers';

const UserCompCourses = ({ competency, userCourses }) => {
  const ucs = getUserCoursesForComp(competency, userCourses);

  return (
    <>
      {ucs.map((uc) => {
        return (
          <List.Item
            key={uc._id}
            style={
              expireMonths(uc.passDate, uc._course.validity) <= 3
                ? {
                    color: 'orange'
                  }
                : { color: 'black' }
            }
          >
            {checkCourseHasExpireDate(uc._course) ? (
              <span>
                {uc._course.courseName} &nbsp; expires &nbsp;
                <Moment fromNow>
                  {expireDate(uc.passDate, uc._course.validity)}
                </Moment>
              </span>
            ) : (
              <span>{uc._course.courseName} &nbsp; does not expire </span>
            )}
          </List.Item>
        );
      })}
    </>
  );
};

export default UserCompCourses;
