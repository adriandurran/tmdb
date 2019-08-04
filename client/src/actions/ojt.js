import axios from 'axios';
import { reset } from 'redux-form';

import { FETCH_OJTS, FETCH_OJT_TYPES, ADD_NEW_OJT_TYPE } from './types';

export const fetchOJTS = () => async (dispatch) => {
  const res = await axios.get('/api/tmdb/ojts');
  dispatch({ type: FETCH_OJTS, payload: res.data });
};

export const fetchOJTTypes = () => async (dispatch) => {
  const res = await axios.get('/api/tmdb/ojts/types');
  dispatch({ type: FETCH_OJT_TYPES, payload: res.data });
};

export const addOJTType = (type) => async (dispatch) => {
  const res = await axios.post('/api/tmdb/ojts/types', type);
  dispatch({ type: ADD_NEW_OJT_TYPE, payload: res.data });
  dispatch(reset('ojtTypes'));
};
