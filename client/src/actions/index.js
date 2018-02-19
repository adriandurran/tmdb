import axios from 'axios';
import {
  FETCH_ROLES,
  FETCH_COURSES,
  FETCH_COMPS,
  FETCH_USER_ROLES,
  ADD_PASS,
  SAVE_USER
} from './types';

export const fetchRoles = () => async dispatch => {
  console.log('fetchRoles');
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

// export const addPass2 = (userId, courseId, passDate) => async dispatch => {
export const addPass = state => dispatch => {
  console.log('addPass', state);
  // const data = dispatch({ type: ADD_PASS, courseId: courseId, passDate: passDate });
  // const res = await axios.put(`/api/users/${userId}`, {});
  // dispatch({ type: SAVE_USER, success: res.status === 201 });
  dispatch({ type: SAVE_USER, success: false });
};
