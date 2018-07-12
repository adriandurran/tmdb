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
