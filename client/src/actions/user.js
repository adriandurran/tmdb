import axios from 'axios';
import { reset } from 'redux-form';
import { FETCH_USER, FETCH_USER_ROLES } from './types';

export const patchUserCourses = (user, courses) => async dispatch => {
  const res = await axios.patch(`/api/users/${user.id}`, { courses });
  dispatch({ type: FETCH_USER, payload: res.data });
  dispatch(reset('courseadder'));
  return res.data;
};

export const fetchUserRoles = roles => async dispatch => {
  dispatch({ type: FETCH_USER_ROLES, payload: roles });
};
