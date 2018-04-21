import { FETCH_COURSE_TYPE } from '../../actions/types';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_COURSE_TYPE:
      return action.payload;

    default:
      return state;
  }
};
