import {ROUTER_DID_CHANGE} from 'redux-router/lib/constants';
import getDataDependencies from '../../helpers/getDataDependencies';
import {startLoading, endLoading} from '../../redux/reducers/appLoading';

const locationsAreEqual = (locA, locB) => (locA.pathname === locB.pathname) && (locA.search === locB.search);

export default ({getState, dispatch}) => next => action => {
  if (action.type === ROUTER_DID_CHANGE && action.payload) {
    if (getState().router && locationsAreEqual(action.payload.location, getState().router.location)) {
      return next(action);
    }

    dispatch(startLoading());

    const {components, location, params} = action.payload;
    const promise = new Promise((resolve) => {
      const resolvation = (param1, param2) => {
        dispatch(endLoading());
        resolve(param1, param2);
      };

      const doTransition = () => {
        next(action);
        Promise.all(getDataDependencies(components, getState, dispatch, location, params, true))
          .then(resolvation, resolvation);
      };

      Promise.all(getDataDependencies(components, getState, dispatch, location, params))
        .then(doTransition, doTransition);
    });

    if (__SERVER__) {
      // router state is null until ReduxRouter is created so we can use this to store
      // our promise to let the server know when it can render
      getState().router = promise;
    }

    return promise;
  }

  return next(action);
};
