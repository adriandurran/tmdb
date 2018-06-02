import {
  FETCH_COMPS,
  // ADD_COMP_TYPE,
  // DELETE_COMP_TYPE,
  FETCH_COMP_TYPES
} from '../../actions/types';

const INITIAL_STATE = [];

export const compsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_COMPS:
      return action.payload;
    default:
      return state;
  }
};

export const compTypesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_COMP_TYPES:
      return action.payload;
    default:
      return state;
  }
};
