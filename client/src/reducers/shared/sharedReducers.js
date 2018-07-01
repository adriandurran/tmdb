import { UPDATE_PROGRESS } from '../../actions/types';

const INITIAL_STATE = 0;

export const progressReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_PROGRESS:
      return action.payload;

    default:
      return state;
  }
};
