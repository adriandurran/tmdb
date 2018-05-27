import axios from 'axios';
import { reset } from 'redux-form';
import {
  FETCH_USER,
  FETCH_USER_ROLES,
  FETCH_ALL_USERS,
  ADMIN_USER_META,
  ADMIN_SEARCH_RESULT,
  ADMIN_CLEAR_SEARCH,
  ADMIN_ADD_USER_ROLE
} from './types';

export const patchUserCourses = (user, courses) => async dispatch => {
  const res = await axios.patch(`/api/users/${user.id}`, { courses });
  dispatch({ type: FETCH_USER, payload: res.data });
  dispatch(reset('courseadder'));
  return res.data;
};

export const fetchUserRoles = roles => async dispatch => {
  dispatch({ type: FETCH_USER_ROLES, payload: roles });
};

export const addUserRole = (role, user) => async dispatch => {
  const res = await axios.patch(`/api/admin/users/${user}/roles`, { role });
  console.log(res.data);
};

export const fetchAllUsers = () => async dispatch => {
  const res = await axios.get('/api/admin/allusers');
  dispatch({ type: FETCH_ALL_USERS, payload: res.data });
};

export const fetchUser = id => async dispatch => {
  const res = await axios.get(`/api/admin/users/${id}`);
  dispatch({ type: ADMIN_SEARCH_RESULT, payload: res.data });
};

export const clearSearchResult = () => async dispatch => {
  dispatch({ type: ADMIN_CLEAR_SEARCH });
};

export const adminVerifyUser = (user, verify) => async dispatch => {
  const res = await axios.patch(`/api/admin/users/${user}/verify`, { verify });
  if (res.status === 200) {
    // update redux
    dispatch({ type: ADMIN_USER_META, payload: res.data });
  } else {
    // do nothing but need to communicate this soon
    console.log(res.data);
  }
};

export const adminAdminiUser = (user, admin) => async dispatch => {
  const res = await axios.patch(`/api/admin/users/${user}/admin`, { admin });
  if (res.status === 200) {
    dispatch({ type: ADMIN_USER_META, payload: res.data });
  } else {
    // do nothing but need to communicate this soon
    console.log(res.data);
  }
};
