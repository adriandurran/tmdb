import { FETCH_VERSION, FETCH_VERSIONS } from '../../actions/types';

const INITIAL_STATE_O = {};
const INITIAL_STATE_A = [];

export const versionReducer = (state = INITIAL_STATE_O, action) => {
  switch (action.type) {
    case FETCH_VERSION:
      return action.payload;

    default:
      return state;
  }
};

export const versionsReducer = (state = INITIAL_STATE_A, action) => {
  switch (action.type) {
    case FETCH_VERSIONS:
      return action.payload;

    default:
      return state;
  }
};
