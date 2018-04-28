import axios from 'axios';
import { reset } from 'redux-form';

import {
  ADD_NEW_COMP,
  CLEAR_COURSES_FROM_COMPBUILDER,
  FETCH_COMPS,
  ADD_COMP_FOR_ROLEBUILDER,
  REMOVE_COMP_FOR_ROLEBUILDER
} from './types';

export const adminAddNewComp = comp => async dispatch => {
  const res = await axios.post('/api/competencies', comp);
  dispatch({ type: ADD_NEW_COMP, payload: res.data });
  dispatch(reset('compbuilder'));
  dispatch({ type: CLEAR_COURSES_FROM_COMPBUILDER });
};

export const fetchComps = () => async dispatch => {
  const res = await axios.get('/api/competencies');
  dispatch({ type: FETCH_COMPS, payload: res.data });
};

export const addCompForRoleBuilder = id => async dispatch => {
  dispatch({ type: ADD_COMP_FOR_ROLEBUILDER, payload: { id } });
};

export const removeCompForRoleBuilder = id => async dispatch => {
  dispatch({ type: REMOVE_COMP_FOR_ROLEBUILDER, payload: id });
};