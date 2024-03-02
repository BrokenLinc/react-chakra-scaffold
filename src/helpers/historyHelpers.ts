import { History } from '@@api/helpers/history';
import _ from 'lodash';
import { SetOptional } from 'type-fest';

export const getHistoryModifiedByLabel = (
  history: SetOptional<History, '_seq'>
) => {
  const modifiedByFullName = _.compact([
    history.modifiedByFirstName,
    history.modifiedByLastName,
  ]).join(' ');
  return modifiedByFullName || history.modifiedByEmail || undefined;
};
