import { FETCH_USER } from '../../actions/types';

const auth = (state = { user: {} }, action) => {
  switch (action.type) {
    case FETCH_USER:
      return { user: action.payload || false };
    default:
      return state;
  }
};

export default auth;
