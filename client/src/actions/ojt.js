import axios from 'axios';

import { FETCH_OJTS, FETCH_OJT_TYPES } from './types';

export const fetchOJTS = () => async (dispatch) => {
  const res = await axios.get('/api/tmdb/ojts');
  dispatch({ type: FETCH_OJTS, payload: res.data });
};

export const fetchOJTTypes = () => async (dispatch) => {
  const res = await axios.get('/api/tmdb/ojts/types');
  dispatch({ type: FETCH_OJT_TYPES, payload: res.data });
};
