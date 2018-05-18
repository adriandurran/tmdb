import { FETCH_ALL_USERS, ADMIN_USER_META } from '../../actions/types';

const INITIAL_STATE = [];

export const allUsersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ALL_USERS:
      return action.payload;
    case ADMIN_USER_META:
      const origUsers = state.filter(users => users._id !== action.payload._id);
      return [...origUsers, action.payload];

    default:
      return state;
  }
};
