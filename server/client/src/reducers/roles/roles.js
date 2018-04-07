import {
  FETCH_ROLES,
  ADD_COMP_FOR_ROLEBUILDER,
  REMOVE_COMP_FOR_ROLEBUILDER,
  ADD_NEW_ROLE,
  CLEAR_COMPS_FROM_ROLEBUILDER
} from '../../actions/types';

const INITIAL_STATE = [];

export const rolesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ROLES:
      return action.payload;
    case ADD_NEW_ROLE:
      return [...state, action.payload];
    default:
      return state;
  }
};

export const roleBuilderComps = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_COMP_FOR_ROLEBUILDER:
      return [...state, action.payload];
    case REMOVE_COMP_FOR_ROLEBUILDER:
      return state.filter(({ id }) => id !== action.payload);
    case CLEAR_COMPS_FROM_ROLEBUILDER:
      return INITIAL_STATE;
    default:
      return state;
  }
};
