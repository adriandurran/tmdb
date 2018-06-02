import axios from 'axios';
import { reset } from 'redux-form';

import {
  FETCH_COMPS,
  ADD_COMP_TYPE,
  // DELETE_COMP_TYPE,
  FETCH_COMP_TYPES
} from './types';

export const adminAddNewComp = comp => async dispatch => {
  const res = await axios.post('/api/competencies', comp);
  if (res.status === 200) {
    dispatch(reset('compbuilder'));
    dispatch(fetchComps());
  } else {
    console.log(res.status, res.data);
  }
};

export const fetchComps = () => async dispatch => {
  const res = await axios.get('/api/competencies');
  dispatch({ type: FETCH_COMPS, payload: res.data });
};

export const fetchCompTypes = () => async dispatch => {
  const res = await axios.get('/api/competencies/type');
  dispatch({ type: FETCH_COMP_TYPES, payload: res.data });
};

export const adminAddCompType = comptype => async dispatch => {
  const res = await axios.post('/api/competencies/type', comptype);
  if (res.status === 200) {
    dispatch(reset('compType'));
    dispatch(fetchComps());
  } else {
    console.log(res.status, res.data);
  }
};
