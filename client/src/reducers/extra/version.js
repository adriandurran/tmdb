import { FETCH_VERSION } from '../../actions/types';

const INITIAL_STATE_O = {};

export const versionReducer = (state = INITIAL_STATE_O, action) => {
  switch (action.type) {
    case FETCH_VERSION:
      return action.payload;

    default:
      return state;
  }
};
