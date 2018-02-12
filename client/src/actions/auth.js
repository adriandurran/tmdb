import axios from 'axios';
import { FETCH_USER, FETCH_USER_ROLES } from './types';

export const fetchUser = userId => async dispatch => {
  const res = await axios.get(`/api/users/${userId}`);
  dispatch({ type: FETCH_USER, payload: res.data });
};
