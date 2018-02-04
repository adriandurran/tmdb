import axios from 'axios';
import { FETCH_USER, FETCH_ROLES, FETCH_COURSES } from './types';

export const fetchUser = userId => async dispatch => {
  const res = await axios.get(`/api/users/${userId}`);
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchRoles = () => async dispatch => {
  const res = await axios.get('/api/roles');
  dispatch({ type: FETCH_ROLES, payload: res.data });
};

export const fetchCourses = () => async dispatch => {
  const res = await axios.get('/api/courses');
  dispatch({ type: FETCH_COURSES, payload: res.data });
};
