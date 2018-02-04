import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = userId => async dispatch => {
  const res = await axios.get(`/api/users/${userId}`);
  dispatch({ type: FETCH_USER, payload: res.data });
};
