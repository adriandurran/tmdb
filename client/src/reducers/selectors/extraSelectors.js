import { createSelector } from 'reselect';
import _ from 'lodash';

// latest version
export const selectLatestVersion = state => state.version;

// all versions
export const selectVersions = state => state.versions;
export const selectVersionsDateDesc = createSelector(
  selectVersions,
  versions => {
    return _.orderBy(versions, 'versionDate', 'desc');
  }
);

// feedbacktype

export const selectFeedbackTypes = state => state.feedbackTypes;
export const selectFeedbackTypesForDropDown = createSelector(
  selectFeedbackTypes,
  types => {
    return types.map(type => {
      return {
        key: type._id,
        value: type._id,
        text: type.feedbackType
      };
    });
  }
);

// feedback

export const selectFeedBack = state => state.feedback;
export const selectFeedBackDateDesc = createSelector(
  selectFeedBack,
  feedback => {
    return _.orderBy(feedback, 'feedbackDate', 'desc');
  }
);
