import axios from 'axios';
import { reset } from 'redux-form';

import {
  FETCH_COURSES,
  FETCH_COURSE,
  FETCH_COURSE_TYPE,
  FETCH_COURSE_LEVEL,
  ADD_NEW_COURSE,
  ADD_COURSE_TYPE,
  DELETE_COURSE_TYPE,
  ADD_COURSE_LEVEL,
  DELETE_COURSE_LEVEL,
  CLEAR_COURSE
} from './types';

export const fetchCourses = () => async dispatch => {
  const res = await axios.get('/api/tmdb/courses');
  dispatch({ type: FETCH_COURSES, payload: res.data });
};

export const fetchCourseTypes = () => async dispatch => {
  const res = await axios.get('/api/tmdb/courses/course-types');
  dispatch({ type: FETCH_COURSE_TYPE, payload: res.data });
};

export const addCourseType = type => async dispatch => {
  const res = await axios.post('/api/tmdb/courses/course-types', type);
  dispatch({ type: ADD_COURSE_TYPE, payload: res.data });
  dispatch(reset('courseTypes'));
};

export const deleteCourseType = id => async dispatch => {
  const res = await axios.delete('/api/tmdb/courses/course-types', {
    params: { id }
  });
  if (res.status === 200) {
    dispatch({ type: DELETE_COURSE_TYPE, payload: id });
  } else {
    console.log('not deleted');
  }
};

export const fetchCourseLevels = () => async dispatch => {
  const res = await axios.get('/api/tmdb/courses/course-levels');
  dispatch({ type: FETCH_COURSE_LEVEL, payload: res.data });
};

export const addCourseLevel = level => async dispatch => {
  const res = await axios.post('/api/tmdb/courses/course-levels', level);
  dispatch({ type: ADD_COURSE_LEVEL, payload: res.data });
  dispatch(reset('courseLevels'));
};

export const deleteCourseLevel = id => async dispatch => {
  const res = await axios.delete('/api/tmdb/courses/course-levels', {
    params: { id }
  });
  if (res.status === 200) {
    dispatch({ type: DELETE_COURSE_LEVEL, payload: id });
  } else {
    console.log('not deleted');
  }
};

export const adminAddNewCourse = course => async dispatch => {
  const res = await axios.post('/api/tmdb/courses', course);

  dispatch({ type: ADD_NEW_COURSE, payload: res.data });
  dispatch(reset('coursebuilder'));
};

export const clearCourseSearchResult = () => dispatch => {
  dispatch({ type: CLEAR_COURSE });
};

export const clearCourse = () => dispatch => {
  dispatch({ type: CLEAR_COURSE });
};

export const fetchCourse = id => async dispatch => {
  dispatch(clearCourse());
  const res = await axios.get(`/api/tmdb/courses/${id}`);
  dispatch({ type: FETCH_COURSE, payload: res.data });
};

export const adminUpdateCourse = (id, course) => async dispatch => {
  try {
    const res = await axios.put(`/api/tmdb/courses/${id}`, course);
    if (res.status === 200) {
      dispatch({ type: FETCH_COURSE, payload: res.data });

      // load all the courses up
      dispatch(fetchCourses());
      return res;
    }
  } catch (error) {
    return error;
  }
};
