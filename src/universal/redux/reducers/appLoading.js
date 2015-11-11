const ROUTER_TRANSITION = 'es6-templates/auth/ROUTER_TRANSITION';
const ROUTER_TRANSITION_SUCCESS = 'es6-templates/auth/ROUTER_TRANSITION_SUCCESS';

const initialState = {
  isLoading: false
};

export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ROUTER_TRANSITION:
      return {
        ...state,
        isLoading: true
      };
    case ROUTER_TRANSITION_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
}

export function startLoading() {
  return {
    type: ROUTER_TRANSITION
  };
}

export function endLoading() {
  return {
    type: ROUTER_TRANSITION_SUCCESS
  };
}
