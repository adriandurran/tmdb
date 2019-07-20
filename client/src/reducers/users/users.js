import {
  FETCH_ALL_USERS,
  ADMIN_USER_META,
  ADMIN_SEARCH_RESULT,
  ADMIN_CLEAR_SEARCH,
  ADMIN_EDIT_USER_ROLE,
  ADMIN_REMOVE_REGISTRATION
} from '../../actions/types';

const INITIAL_STATE_A = [];
const INITIAL_STATE_O = {};

export const allUsersReducer = (state = INITIAL_STATE_A, action) => {
  switch (action.type) {
    case FETCH_ALL_USERS:
      return action.payload;
    case ADMIN_USER_META:
      const origUsers = state.filter(
        (users) => users._id !== action.payload._id
      );
      return [...origUsers, action.payload];
    case ADMIN_REMOVE_REGISTRATION:
      return state.filter((users) => users._id !== action.payload);
    default:
      return state;
  }
};

export const userSearchResultReducer = (state = INITIAL_STATE_O, action) => {
  switch (action.type) {
    case ADMIN_SEARCH_RESULT:
      return action.payload;
    case ADMIN_CLEAR_SEARCH:
      return INITIAL_STATE_O;
    case ADMIN_EDIT_USER_ROLE:
      return action.payload;
    default:
      return state;
  }
};
