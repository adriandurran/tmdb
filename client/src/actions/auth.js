import axios from 'axios';
import { reset } from 'redux-form';

import { FETCH_USER } from './types';
import { fetchCourses, fetchCourseLevels, fetchCourseTypes } from './courses';

export const fetchUser = () => async dispatch => {
  const res = await axios.get(`/api/tmdb/auth/current_user`);
  dispatch({ type: FETCH_USER, payload: res.data });
  // need to dispatch the other actions here?
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
  const res = await axios.post(`/api/tmdb/auth/register`, {
    data: { newUser }
  });
  return res.data;
};

export const loginUser = values => async dispatch => {
  const { email, password } = values;
  const userDet = { username: email, password: password };

  const res = await axios.post('/api/tmdb/auth/login', userDet);
  dispatch(fetchUser());
  if (res.data.verified) {
    // load up the courses, course types , roles, and competencies
    dispatch(fetchCourses);
    dispatch(fetchCourseLevels);
    dispatch(fetchCourseTypes);
  }
  return res.data;
};

export const resetUserPassword = (id, password) => async dispatch => {
  try {
    const res = await axios.post(`/api/tmdb/user/${id}/password/reset`, {
      password
    });
    if (res.status === 200) {
      // also clear redux form
      dispatch(reset('resetPwd'));
      // send message password changed
      return res;
      // log out ??
    }
  } catch (error) {
    console.log(error);
    // send message about error
  }
};
