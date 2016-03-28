import isError from 'lodash/isError';

export default function errorToStringMiddleware() {
  return ({dispatch, getState}) => {
    return next => action => {
      if (typeof action === 'function') {
        return action(dispatch, getState);
      }

      const {error, ...rest} = action;

      if (error && isError(error)) {
        const errorMessage = error.message;
        next({...rest, error: errorMessage});
      }

      return next(action);
    };
  };
}
