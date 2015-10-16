import { Dispatcher } from 'flux';

class DispatcherPayload {
  constructor(type, payload) {
    this.type = type;
    this.payload = payload;
  }
}

class AppDispatcher extends Dispatcher {
  constructor() {
    super();
  }

  dispatch(type, payload) {
    const data = new DispatcherPayload(type, payload);
    super.dispatch(data);
  }

  register(callback) {
    return super.register(callback);
  }

  unregister(id) {
    return super.unregister(id);
  }

  isDispatching() {
    return super.isDispatching();
  }
}

export const appDispatcher = new AppDispatcher();
