import axios from 'axios';

import { FETCH_VERSION } from './types';

export const fetchLatestVersion = () => async dispatch => {
  const res = await axios.get('/api/tmdb/extra/version/latest');
  dispatch({ type: FETCH_VERSION, payload: res.data });
};
