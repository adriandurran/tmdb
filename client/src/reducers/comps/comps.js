import {
  FETCH_COMPS,
  DELETE_COMP_TYPE,
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
    case DELETE_COMP_TYPE:
      return state.filter(type => type._id !== action.payload);
    default:
      return state;
  }
};
