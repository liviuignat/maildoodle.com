import * as React from 'react';
import ComponentBase from './../../../ComponentBase';
import { currentUserStore } from './../../../../stores';

class AppHomePage extends ComponentBase {
  constructor(props, context) {
    super(props, context);

    console.log(context);

    this.state = {
      currentUser: context.user
    };
  }

  render() {
    return (
      <div>
        <h1>Hi { this.state.currentUser.firstName }, you are now logged in. Please use the menu on the left corner.</h1>
      </div>
    );
  }
}

AppHomePage.contextTypes = {
  user: React.PropTypes.object,
  isLoggedIn: React.PropTypes.bool
};

export default AppHomePage;
