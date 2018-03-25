import axios from 'axios';

import { FETCH_COURSES, FETCH_COURSE_TYPE, FETCH_COURSE_LEVEL } from './types';

export const fetchCourses = () => async dispatch => {
  const res = await axios.get('/api/courses');
  dispatch({ type: FETCH_COURSES, payload: res.data });
};

export const fetchCourseTypes = () => async dispatch => {
  const res = await axios.get('/api/course-types');
  dispatch({ type: FETCH_COURSE_TYPE, payload: res.data });
};

export const fetchCourseLevels = () => async dispatch => {
  const res = await axios.get('/api/course-levels');
  dispatch({ type: FETCH_COURSE_LEVEL, payload: res.data });
};
