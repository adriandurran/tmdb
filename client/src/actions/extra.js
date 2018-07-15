import axios from 'axios';
import { reset } from 'redux-form';

import {
  FETCH_VERSION,
  FETCH_VERSIONS,
  FETCH_FEEDBACK_TYPES,
  FETCH_FEEDBACK,
  FETCH_FEEDBACK_FILTER
} from './types';

export const fetchLatestVersion = () => async dispatch => {
  const res = await axios.get('/api/tmdb/extra/version/latest');
  dispatch({ type: FETCH_VERSION, payload: res.data });
};

export const fetchVersions = () => async dispatch => {
  const res = await axios.get('/api/tmdb/extra/version');
  dispatch({ type: FETCH_VERSIONS, payload: res.data });
};

export const addNewVersion = version => async dispatch => {
  try {
    const res = await axios.post('/api/tmdb/extra/version', version);
    if (res.status === 200) {
      dispatch(fetchVersions());
      dispatch(reset('addVersion'));
      dispatch(fetchLatestVersion());
    }
  } catch (error) {
    console.log(error);
  }
};

export const addFeedbackType = type => async dispatch => {
  try {
    const res = await axios.post('/api/tmdb/extra/feedbacktype', type);
    if (res.status === 200) {
      dispatch(fetchFeedbackTypes());
      dispatch(reset('addFeedbackType'));
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteFeedbackType = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/tmdb/extra/feedbacktype/${id}`);
    if (res.status === 200) {
      dispatch(fetchFeedbackTypes());
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchFeedbackTypes = () => async dispatch => {
  const res = await axios.get('/api/tmdb/extra/feedbacktype');
  dispatch({ type: FETCH_FEEDBACK_TYPES, payload: res.data });
};

export const fetchFeedback = () => async dispatch => {
  const res = await axios.get('/api/tmdb/extra/feedback');
  dispatch({ type: FETCH_FEEDBACK, payload: res.data });
};

export const addFeedback = fb => async dispatch => {
  try {
    const res = await axios.post('/api/tmdb/extra/feedback', fb);
    if (res.status === 200) {
      dispatch(fetchFeedback());
      dispatch(reset('newFeedback'));
    }
  } catch (error) {
    console.log(error);
  }
};

export const filterFeedback = id => async dispatch => {
  const res = await axios.get(`/api/tmdb/extra/feedback/type/${id}`);
  dispatch({ type: FETCH_FEEDBACK, payload: res.data });
};
