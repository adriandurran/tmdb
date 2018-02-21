import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = empId => async dispatch => {
  const res = await axios.get(`/api/users/${empId}`);
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitUser = values => async dispatch => {
  const { firstname, lastname, email, empId } = values;
  const newUser = {
    id: empId,
    firstname,
    lastname,
    email,
    verified: false
  };
  const res = await axios.post(`/api/users`, newUser);
  return res.data;
};
