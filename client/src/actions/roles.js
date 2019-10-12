import axios from 'axios';
import { reset } from 'redux-form';

import { FETCH_ROLES, FETCH_ROLE, CLEAR_ROLE } from './types';

export const fetchRoles = () => async (dispatch) => {
  const res = await axios.get('/api/tmdb/roles');
  dispatch({ type: FETCH_ROLES, payload: res.data });
};

export const clearRole = () => (dispatch) => {
  dispatch({ type: CLEAR_ROLE });
};

export const fetchRole = (id) => async (dispatch) => {
  dispatch(clearRole());
  const res = await axios.get(`/api/tmdb/roles/${id}`);
  dispatch({ type: FETCH_ROLE, payload: res.data });
};

export const adminAddNewRole = (role) => async (dispatch) => {
  try {
    const res = await axios.post('/api/tmdb/roles', role);
    if (res.status === 200) {
      dispatch(reset('rolebuilder'));
      dispatch(fetchRoles());
      return true;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const adminUpdateRole = (id, role) => async (dispatch) => {
  const res = await axios.put(`/api/tmdb/roles/${id}`, role);
  if (res.status === 200) {
    dispatch({ type: FETCH_ROLE, payload: res.data });
    dispatch(fetchRoles());
  }

  return res;
};
