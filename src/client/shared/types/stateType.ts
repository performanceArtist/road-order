import { Reducer } from 'redux';

export type StateType<TReducerOrMap extends any> = TReducerOrMap extends Reducer<any, any>
  ? ReturnType<TReducerOrMap>
  : TReducerOrMap extends Record<any, any>
  ? {
    [K in keyof TReducerOrMap]: StateType<TReducerOrMap[K]>;
  }
  : never;
