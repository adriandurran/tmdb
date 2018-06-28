import axios from 'axios';
import { reset } from 'redux-form';

import { FETCH_DEPTS, ADMIN_ADD_DEPT } from './types';

export const fetchDepts = () => async dispatch => {
  const res = await axios.get('/api/tmdb/dept');
  dispatch({ type: FETCH_DEPTS, payload: res.data });
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
