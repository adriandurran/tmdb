import { FETCH_ROLES } from '../../actions/types';

const INITIAL_STATE = [];

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_ROLES:
      return action.payload;

    default:
      return state;
  }
}
