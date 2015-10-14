/// <reference path='./../defs/tsd.d.ts' />

interface ICurrentUser {
  getIsLoggedIn(): boolean;
  getUserData(): ICurrentUserData;
  getEmail(): string;
  getDisplayName(): string;
  getUserPhoto(): string;
}

interface ICurrentUserData {
  email: string;
  emailVerified: boolean;
  sessionToken: string;
  firstName?: string;
  lastName?: string;

  updatedAt: Date;
}

interface IMyAccountUpdateModel {
  firstName: string;
  lastName: string;
}

interface ILoginModel {
  email: string;
  password: string;
}

interface ICreateUserModel {
  email: string;
  password: string;
}

interface IDispatcherPayload<T> {
  type: string;
  payload: T;
}

interface IFormFieldDataInput {
  value?: any;
  error?: string;
  validators?: any[];
}

interface IFormFieldData {
  value?: any;
  error?: string;
  validators?: any[];
}

interface IValidator {
  message: string;
  getIsValid(value: any): boolean;
}

interface IFormValidatorResponse {
  isValid: boolean;
  formData: any;
}

declare namespace __MaterialUI {
  class BaseMaterialComponent<P, S> extends __React.Component<P, S> {
    getStyles(): void;
  }

  interface BaseMaterialProps<T> extends __React.Props<T> {
    style?: any;
  }

  namespace Lists {
    interface ListProps extends BaseMaterialProps<List> {
    }
  }
}

declare module 'events' {
  export class EventEmitter {
    on: any;
    emit: any;
  }
}

declare module 'react-tap-event-plugin' {
  export default function injectTapEventPlugin(): any;
}

declare module 'history/lib/createBrowserHistory' {
  export default function createBrowserHistory(): any;
}

declare module 'parse' {
  export const User: any;
  export const Query: any;
  export const initialize: any;
}

declare module 'react-router' {
  export const Router: any;
  export const Route: any;
  export const IndexRoute: any;
  export const Link: any;
}