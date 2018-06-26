import axios from 'axios';
import { reset } from 'redux-form';

import {
  FETCH_COMPS,
  DELETE_COMP_TYPE,
  FETCH_COMP_TYPES,
  CLEAR_COMPETENCY,
  FETCH_COMPETENCY
} from './types';

export const adminAddNewComp = comp => async dispatch => {
  const res = await axios.post('/api/tmdb/competencies', comp);
  if (res.status === 200) {
    dispatch(reset('compbuilder'));
    dispatch(fetchComps());
  } else {
    console.log(res.status, res.data);
  }
};

export const adminUpdateComp = (id, comp) => async dispatch => {
  const res = await axios.put(`/api/tmdb/competencies/${id}`, comp);
  if (res.status === 200) {
    // add comp to comp reducer
    dispatch({ type: FETCH_COMPETENCY, payload: res.data });
    // fetch all the comps (in the background)
    dispatch(fetchComps());
    // send message?
  }
  // change nothing but send message if it has failed
  return res;
};

export const fetchComps = () => async dispatch => {
  const res = await axios.get('/api/tmdb/competencies');
  dispatch({ type: FETCH_COMPS, payload: res.data });
};

export const fetchCompTypes = () => async dispatch => {
  const res = await axios.get('/api/tmdb/competencies/type');
  dispatch({ type: FETCH_COMP_TYPES, payload: res.data });
};

export const adminAddCompType = comptype => async dispatch => {
  console.log(comptype);
  const res = await axios.post('/api/tmdb/competencies/type', comptype);
  if (res.status === 200) {
    dispatch(reset('compTypes'));
    dispatch(fetchCompTypes());
  } else {
    console.log(res.status, res.data);
  }
};

export const adminDeleteCompType = id => async dispatch => {
  const res = await axios.delete('/api/tmdb/competencies/type', {
    params: { id }
  });
  if (res.status === 200) {
    dispatch({ type: DELETE_COMP_TYPE, payload: id });
  } else {
    console.log('not deleted');
  }
};

export const clearCompetency = () => dispatch => {
  dispatch({ type: CLEAR_COMPETENCY });
};

export const fetchCompetency = id => async dispatch => {
  // clear the competency
  dispatch(clearCompetency());
  // add the competency
  const res = await axios.get(`/api/tmdb/competencies/${id}`);

  dispatch({ type: FETCH_COMPETENCY, payload: res.data });
};
