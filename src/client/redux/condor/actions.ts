import { actionTree, a } from '@shared/utils/redux';
import { CondorValue } from '@root/client/shared/types';

export const CONDOR = actionTree('CONDOR')({
  UPDATE: a.plain
});

export const updateCondor = (payload: CondorValue) => ({
  type: CONDOR.UPDATE,
  payload
});
