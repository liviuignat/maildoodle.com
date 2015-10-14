import { Dispatcher } from 'flux';

class DispatcherPayload<T> implements IDispatcherPayload<T> {
  constructor(public type: string, public payload: T) {
  }
}

class AppDispatcher extends Dispatcher<any> {
  constructor() {
    super();
  }

  dispatch<TPayload>(type: string, payload?: TPayload) {
    const data = new DispatcherPayload<TPayload>(type, payload);
    super.dispatch(data);
  }

  register<TPayload>(callback: (payload: TPayload) => void): string {
    return super.register(callback);
  }

  unregister(id: string): void {
    super.unregister(id);
  }

  isDispatching(): boolean {
    return super.isDispatching();
  }
}

export const appDispatcher = new AppDispatcher();
