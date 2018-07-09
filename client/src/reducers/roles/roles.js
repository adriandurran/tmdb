import { FETCH_ROLES, CLEAR_ROLE, FETCH_ROLE } from '../../actions/types';

const INITIAL_STATE_A = [];
const INITIAL_STATE_O = {};

export const rolesReducer = (state = INITIAL_STATE_A, action) => {
  switch (action.type) {
    case FETCH_ROLES:
      return action.payload;

    default:
      return state;
  }
};

export const roleReducer = (state = INITIAL_STATE_O, action) => {
  switch (action.type) {
    case CLEAR_ROLE:
      return INITIAL_STATE_O;

    case FETCH_ROLE:
      return action.payload;

    default:
      return state;
  }
};
