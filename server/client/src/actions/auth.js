import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get(`/auth/tmdb/current_user`, {
    withCredentials: true
  });
  console.log(res.data);
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitNewUser = values => async dispatch => {
  const { firstName, lastName, email, userId, password } = values;
  const newUser = {
    userId,
    firstName,
    lastName,
    username: email,
    password
  };
  const res = await axios.post(`/auth/tmdb/register`, {
    data: { newUser }
  });
  return res.data;
};

export const loginUser = values => async dispatch => {
  const { email, password } = values;
  const userDet = { username: email, password: password };

  const res = await axios.post('/auth/tmdb/login', userDet, {
    withCredentials: true
  });
  console.log(res.data);
  dispatch(fetchUser());
};
