import {
  FETCH_COMPS,
  DELETE_COMP_TYPE,
  FETCH_COMP_TYPES,
  FETCH_COMPETENCY,
  CLEAR_COMPETENCY
} from '../../actions/types';

const INITIAL_STATE_A = [];
const INITIAL_STATE_O = {};

export const compsReducer = (state = INITIAL_STATE_A, action) => {
  switch (action.type) {
    case FETCH_COMPS:
      return action.payload;
    default:
      return state;
  }
};

export const compTypesReducer = (state = INITIAL_STATE_A, action) => {
  switch (action.type) {
    case FETCH_COMP_TYPES:
      return action.payload;
    case DELETE_COMP_TYPE:
      return state.filter(type => type._id !== action.payload);
    default:
      return state;
  }
};

export const competencyReducer = (state = INITIAL_STATE_O, action) => {
  switch (action.type) {
    case CLEAR_COMPETENCY:
      return INITIAL_STATE_O;
    case FETCH_COMPETENCY:
      return action.payload;

    default:
      return state;
  }
};
