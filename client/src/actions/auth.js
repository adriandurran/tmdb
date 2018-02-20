import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = empId => async dispatch => {
  const res = await axios.get(`/api/users/${empId}`);
  dispatch({ type: FETCH_USER, payload: res.data });
};
