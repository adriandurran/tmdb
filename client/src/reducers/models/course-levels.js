import { FETCH_COURSE_LEVEL } from '../../actions/types';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_COURSE_LEVEL:
      return action.payload;

    default:
      return state;
  }
};
