import { ApiAction } from '@shared/types';

export type ActionTree = {
  [key: string]: string | ApiAction | ActionTree;
};

export type ActionModel = {
  [key: string]: ActionType;
};

export type ActionType = 'api' | 'plain' | ActionModel;

export const apiAction = (base: string, action: string): ApiAction => {
  return {
    REQUEST: `${base}.${action}.REQUEST`,
    SUCCESS: `${base}.${action}.SUCCESS`,
    FAILURE: `${base}.${action}.FAILURE`
  };
};

export const actionTree = (base: string) => (
  model: ActionModel
): ActionTree => {
  const tree: ActionTree = {};

  return Object.keys(model).reduce((acc, cur) => {
    switch (model[cur]) {
      case 'plain':
        acc[cur] = `${base}.${cur}`;
        break;
      case 'api':
        acc[cur] = apiAction(base, cur);
        break;
      default:
        if (typeof model[cur] === 'object') {
          acc[cur] = actionTree(`${base}.${cur}`)(model[cur] as ActionModel);
        }
        break;
    }

    return acc;
  }, tree);
};

export const a: { [key: string]: ActionType } = {
  api: 'api',
  plain: 'plain'
};
