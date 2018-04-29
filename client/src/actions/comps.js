import axios from 'axios';
import { reset } from 'redux-form';

import {
  FETCH_COMPS
  // ADD_COMP_FOR_ROLEBUILDER,
  // REMOVE_COMP_FOR_ROLEBUILDER
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

// export const addCompForRoleBuilder = id => async dispatch => {
//   dispatch({ type: ADD_COMP_FOR_ROLEBUILDER, payload: { id } });
// };

// export const removeCompForRoleBuilder = id => async dispatch => {
//   dispatch({ type: REMOVE_COMP_FOR_ROLEBUILDER, payload: id });
// };
