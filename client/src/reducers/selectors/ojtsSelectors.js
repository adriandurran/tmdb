import { createSelector } from 'reselect';

export const selectOJTS = (state) => state.ojts;

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
