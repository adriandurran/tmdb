import axios from 'axios';
import { reset } from 'redux-form';

import { FETCH_DEPTS, ADMIN_ADD_DEPT, FETCH_DEPT, CLEAR_DEPT } from './types';

export const fetchDepts = () => async dispatch => {
  const res = await axios.get('/api/tmdb/dept');
  dispatch({ type: FETCH_DEPTS, payload: res.data });
};

export const fetchDept = id => async dispatch => {
  dispatch(clearDept());
  const res = await axios.get(`/api/tmdb/dept/${id}`);
  dispatch({ type: FETCH_DEPT, payload: res.data });
};

export const clearDept = () => dispatch => {
  dispatch({ type: CLEAR_DEPT });
};

export const adminAddDept = dept => async dispatch => {
  try {
    const newDept = await axios.post('/api/tmdb/dept', dept);
    // add new dept to reducers
    dispatch({ type: ADMIN_ADD_DEPT, payload: newDept.data });
    // clear redux form
    dispatch(reset('addDept'));
  } catch (error) {
    // add messaging?
    console.log(error);
  }
};

export const adminUpdateDept = (id, dept) => async dispatch => {
  try {
    const res = await axios.put(`/api/tmdb/dept/${id}`, dept);
    if (res.status === 200) {
      dispatch({ type: FETCH_DEPT, payload: res.data });
      dispatch(fetchDepts());
    }
    return res;
  } catch (error) {
    console.log(error);
  }
};
