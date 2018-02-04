import { FETCH_COMPS } from '../actions/types';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_COMPS:
      return action.payload;

    default:
      return state;
  }
};
