import {
  FETCH_FEEDBACK_TYPES,
  FETCH_FEEDBACK,
  FETCH_FEEDBACK_FILTER
} from '../../actions/types';

const INITIAL_STATE_A = [];

export const feebackTypeReducer = (state = INITIAL_STATE_A, action) => {
  switch (action.type) {
    case FETCH_FEEDBACK_TYPES:
      return action.payload;

    default:
      return state;
  }
};

export const feedbackReducer = (state = INITIAL_STATE_A, action) => {
  switch (action.type) {
    case FETCH_FEEDBACK:
      return action.payload;
    case FETCH_FEEDBACK_FILTER:
      return state.filter(fb => fb.feedbackType._id === action.payload);

    default:
      return state;
  }
};
