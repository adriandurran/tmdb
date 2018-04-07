import axios from 'axios';
import { reset } from 'redux-form';

import {
  FETCH_ROLES,
  ADD_NEW_ROLE,
  CLEAR_COMPS_FROM_ROLEBUILDER
} from './types';

export const fetchRoles = () => async dispatch => {
  const res = await axios.get('/api/roles');
  dispatch({ type: FETCH_ROLES, payload: res.data });
};

export const adminAddNewRole = role => async dispatch => {
  const res = await axios.post('/api/roles', role);
  dispatch({ type: ADD_NEW_ROLE, payload: res.data });
  dispatch(reset('rolebuilder'));
  dispatch({ type: CLEAR_COMPS_FROM_ROLEBUILDER });
};
