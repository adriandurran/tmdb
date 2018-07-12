import axios from 'axios';
import { reset } from 'redux-form';

import { FETCH_VERSION, FETCH_VERSIONS } from './types';

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
