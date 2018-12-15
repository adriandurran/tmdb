import axios from 'axios';

import { FETCH_OJTS } from './types';

export const fetchOJTS = () => async (dispatch) => {
  const ojts = axios.get('/api/tmdb/ojts');
  dispatch({ type: FETCH_OJTS, payload: ojts.data });
};
