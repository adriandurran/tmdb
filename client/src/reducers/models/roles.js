import { FETCH_ROLES, FETCH_USER_ROLES } from '../../actions/types';

const INITIAL_STATE = {
  userRoles: [],
  fullRoles: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_ROLES:
      return Object.assign({}, state, {
        fullRoles: action.payload
      });
    case FETCH_USER_ROLES:
      return Object.assign({}, state, { userRoles: action.payload });

    default:
      return state;
  }
}
