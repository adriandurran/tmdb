import axios from 'axios';
import { FETCH_USER } from './types';
import { fetchCourses, fetchCourseLevels, fetchCourseTypes } from './courses';

export const fetchUser = () => async dispatch => {
  const res = await axios.get(`/auth/tmdb/current_user`);
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
  const res = await axios.post(`/auth/tmdb/register`, {
    data: { newUser }
  });
  return res.data;
};

export const loginUser = values => async dispatch => {
  const { email, password } = values;
  const userDet = { username: email, password: password };

  const res = await axios.post('/auth/tmdb/login', userDet);
  dispatch(fetchUser());
  if (res.data.verified) {
    // load up the courses, course types , roles, and competencies
    dispatch(fetchCourses);
    dispatch(fetchCourseLevels);
    dispatch(fetchCourseTypes);
  }
  return res.data;
};
