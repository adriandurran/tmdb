import { FETCH_ALL_USERS } from '../../actions/types';

const INITIAL_STATE = [];

export const allUsersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ALL_USERS:
      return action.payload;

    default:
      return state;
  }
};
