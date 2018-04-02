import axios from 'axios';
import { reset } from 'redux-form';

import { ADD_NEW_COMP, CLEAR_COURSES_FROM_COMPBUILDER } from './types';

export const adminAddNewComp = comp => async dispatch => {
  const res = await axios.post('/api/competencies', comp);
  dispatch({ type: ADD_NEW_COMP, payload: res.data });
  dispatch(reset('compbuilder'));
  dispatch({ type: CLEAR_COURSES_FROM_COMPBUILDER });
};
