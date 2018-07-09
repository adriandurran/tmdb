import { UPDATE_PROGRESS, CLEAR_PROGRESS } from '../../actions/types';

const INITIAL_STATE = 0;

export const progressReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_PROGRESS:
      return action.payload;

    case CLEAR_PROGRESS:
      return INITIAL_STATE;

    default:
      return state;
  }
};
