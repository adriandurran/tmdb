import axios from 'axios';
import { reset } from 'redux-form';

import {
  FETCH_COURSES,
  FETCH_COURSE_TYPE,
  FETCH_COURSE_LEVEL,
  ADD_NEW_COURSE,
  ADD_COURSE_FOR_COMPBUILDER,
  REMOVE_COURSE_FOR_COMPBUILDER
} from './types';

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

export const adminAddNewCourse = course => async dispatch => {
  const res = await axios.post('/api/courses', course);

  dispatch({ type: ADD_NEW_COURSE, payload: res.data });
  dispatch(reset('coursebuilder'));
};

export const addCourseForCompBuilder = id => async dispatch => {
  dispatch({ type: ADD_COURSE_FOR_COMPBUILDER, payload: { id } });
};

export const removeCourseForCompBuilder = id => async dispatch => {
  dispatch({ type: REMOVE_COURSE_FOR_COMPBUILDER, payload: id });
};