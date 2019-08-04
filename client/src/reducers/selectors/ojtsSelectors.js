import { createSelector } from 'reselect';

export const selectOJTS = (state) => state.ojts;
export const selectOJTTypes = (state) => state.ojtTypes;

export const selectOJTTypesForDropDown = createSelector(
  selectOJTTypes,
  (types) => {
    return types.map((type) => {
      return { key: type._id, value: type._id, text: type.ojtType };
    });
  }
);

export const selectOJTSForDropDown = createSelector(
  selectOJTS,
  (ojts) => {
    return ojts.map((ojt) => {
      return {
        key: ojt._id,
        value: ojt._id,
        text: `${ojt.ojtName} -- ${ojt.ojtType} -- ${ojt.hours}`
      };
    });
  }
);
