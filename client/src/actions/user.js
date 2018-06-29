import axios from 'axios';
import { reset } from 'redux-form';
import {
  FETCH_USER,
  FETCH_USER_ROLES,
  FETCH_ALL_USERS,
  ADMIN_USER_META,
  ADMIN_SEARCH_RESULT,
  ADMIN_CLEAR_SEARCH,
  ADMIN_EDIT_USER_ROLE,
  CLEAR_COURSE,
  ADD_USER_PROFILE_IMAGE
} from './types';

export const addUserCourse = (user, course) => async dispatch => {
  const res = await axios.patch(`/api/tmdb/user/${user}/course`, { course });
  dispatch({ type: FETCH_USER, payload: res.data });
  dispatch({ type: CLEAR_COURSE });
  dispatch(reset('newUserCourse'));
  // return res.data;
};

export const adminVerifyUserCourse = (user, course) => async dispatch => {
  const res = await axios.patch(`/api/tmdb/user/${user}/verify-course`, {
    course
  });
  if (res.status === 200) {
    // update redux
    dispatch({ type: ADMIN_USER_META, payload: res.data });
  } else {
    // do nothing but need to communicate this soon
    console.log(res.data);
  }
};

export const fetchUserRoles = roles => async dispatch => {
  dispatch({ type: FETCH_USER_ROLES, payload: roles });
};

export const editUserRole = (role, user, action) => async dispatch => {
  const res = await axios.patch(`/api/tmdb/user/admin/users/${user}/roles`, {
    role,
    action
  });
  if (res.status === 200) {
    // update the temp user
    dispatch({ type: ADMIN_EDIT_USER_ROLE, payload: res.data });
  } else {
    console.log(res.data);
  }
};

export const fetchAllUsers = () => async dispatch => {
  const res = await axios.get('/api/tmdb/user/admin/allusers');
  dispatch({ type: FETCH_ALL_USERS, payload: res.data });
};

export const fetchUser = id => async dispatch => {
  const res = await axios.get(`/api/tmdb/user/admin/users/${id}`);
  dispatch({ type: ADMIN_SEARCH_RESULT, payload: res.data });
};

export const clearSearchResult = () => async dispatch => {
  dispatch({ type: ADMIN_CLEAR_SEARCH });
};

export const adminVerifyUser = (user, verify) => async dispatch => {
  const res = await axios.patch(`/api/tmdb/user/admin/users/${user}/verify`, {
    verify
  });
  if (res.status === 200) {
    // update redux
    dispatch({ type: ADMIN_USER_META, payload: res.data });
  } else {
    // do nothing but need to communicate this soon
    console.log(res.data);
  }
};

export const adminAdminiUser = (user, admin) => async dispatch => {
  const res = await axios.patch(`/api/tmdb/user/admin/users/${user}/admin`, {
    admin
  });
  if (res.status === 200) {
    dispatch({ type: ADMIN_USER_META, payload: res.data });
  } else {
    // do nothing but need to communicate this soon
    console.log(res.data);
  }
};

export const adminAssignDept = (user, department) => async dispatch => {
  try {
    const res = await axios.patch(
      `/api/tmdb/user/admin/users/${user}/department`,
      { department }
    );
    // update the user......hate this const
    dispatch({ type: ADMIN_SEARCH_RESULT, payload: res.data });
    // get all users......and then edge case current user
    dispatch(fetchAllUsers());
    // hate this is so confusing
    dispatch({ type: FETCH_USER, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const updateUserProfile = (id, profile) => async dispatch => {
  try {
    const res = await axios.patch(`/api/tmdb/user/${id}`, { profile });
    if (res.status === 200) {
      dispatch({ type: FETCH_USER, payload: res.data });
      return res;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const addUserProfileImage = (id, image) => async dispatch => {
  const formData = new FormData();
  formData.append('id', id);
  formData.append('userImage', image);
  try {
    const res = await axios.post(`/api/tmdb/user/${id}/image`, formData);
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getUserProfileImage = (id, imageId) => async dispatch => {
  try {
    const res = await axios.get(`/api/tmdb/user/image/${imageId}`, {
      responseType: 'arraybuffer'
    });

    const imgFile = new Blob([res.data]);
    const imgUrl = URL.createObjectURL(imgFile);

    const payload = {
      id,
      imgUrl
    };

    dispatch({ type: ADD_USER_PROFILE_IMAGE, payload });
  } catch (error) {
    console.log(error);
    return error;
  }
};
