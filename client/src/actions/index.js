import axios from 'axios';
import {
  FETCH_USER,
  FETCH_ROLES,
  FETCH_COURSES,
  FETCH_COMPS,
  FETCH_USER_ROLES,
} from './types';

export const fetchRoles = () => async dispatch => {
  const res = await axios.get('/api/roles');
  dispatch({ type: FETCH_ROLES, payload: res.data });
};

export const fetchUserRoles = roles => async dispatch => {
  dispatch({ type: FETCH_USER_ROLES, payload: roles });
};

export const fetchCourses = () => async dispatch => {
  const res = await axios.get('/api/courses');
  dispatch({ type: FETCH_COURSES, payload: res.data });
};

export const fetchComps = () => async dispatch => {
  const res = await axios.get('/api/competencies');
  dispatch({ type: FETCH_COMPS, payload: res.data });
};

export const patchUserCourses = (user, courses) => async dispatch => {
  const res = await axios.patch(`/api/users/${user.id}`, {courses: courses});
  dispatch({ type: FETCH_USER, payload: res.data });
};