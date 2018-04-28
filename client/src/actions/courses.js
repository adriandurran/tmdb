import axios from 'axios';
import { reset } from 'redux-form';

import {
  FETCH_COURSES,
  FETCH_COURSE_TYPE,
  FETCH_COURSE_LEVEL,
  ADD_NEW_COURSE,
  ADD_COURSE_FOR_COMPBUILDER,
  REMOVE_COURSE_FOR_COMPBUILDER,
  ADD_COURSE_TYPE,
  DELETE_COURSE_TYPE,
  ADD_COURSE_LEVEL,
  DELETE_COURSE_LEVEL
} from './types';

export const fetchCourses = () => async dispatch => {
  const res = await axios.get('/api/courses');
  dispatch({ type: FETCH_COURSES, payload: res.data });
};

export const fetchCourseTypes = () => async dispatch => {
  const res = await axios.get('/api/course-types');
  dispatch({ type: FETCH_COURSE_TYPE, payload: res.data });
};

export const addCourseType = type => async dispatch => {
  const res = await axios.post('/api/course-types', type);
  dispatch({ type: ADD_COURSE_TYPE, payload: res.data });
  dispatch(reset('courseTypes'));
};

export const deleteCourseType = id => async dispatch => {
  const res = await axios.delete('/api/course-types', { params: { id } });
  if (res.status === 200) {
    dispatch({ type: DELETE_COURSE_TYPE, payload: id });
  } else {
    console.log('not deleted');
  }
};

export const fetchCourseLevels = () => async dispatch => {
  const res = await axios.get('/api/course-levels');
  dispatch({ type: FETCH_COURSE_LEVEL, payload: res.data });
};

export const addCourseLevel = level => async dispatch => {
  const res = await axios.post('/api/course-levels', level);
  dispatch({ type: ADD_COURSE_LEVEL, payload: res.data });
  dispatch(reset('courseLevels'));
};

export const deleteCourseLevel = id => async dispatch => {
  const res = await axios.delete('/api/course-levels', { params: { id } });
  if (res.status === 200) {
    dispatch({ type: DELETE_COURSE_LEVEL, payload: id });
  } else {
    console.log('not deleted');
  }
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
