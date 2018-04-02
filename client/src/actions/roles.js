import axios from 'axios';
import { FETCH_ROLES } from './types';

export const fetchRoles = () => async dispatch => {
  const res = await axios.get('/api/roles');
  dispatch({ type: FETCH_ROLES, payload: res.data });
};
