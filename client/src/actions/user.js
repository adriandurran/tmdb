import axios from 'axios';
import { FETCH_USER } from './types';

export const patchUserCourses = (user, courses) => async dispatch => {
  const res = await axios.patch(`/api/users/${user.id}`, { courses });
  dispatch({ type: FETCH_USER, payload: res.data });
  return res.data;
};
