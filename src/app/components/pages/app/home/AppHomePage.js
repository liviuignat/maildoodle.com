import * as React from 'react';
import ComponentBase from './../../../ComponentBase';

class AppHomePage extends ComponentBase {
  constructor(props, context) {
    super(props, context);

    this.state = {
      currentUser: context.user
    };
  }

  render() {
    return (
      <div>
        <h1>Hi { this.state.currentUser.getDisplayName() }, you are now logged in. Please use the menu on the left corner.</h1>
      </div>
    );
  }
}

AppHomePage.contextTypes = {
  user: React.PropTypes.object,
  isLoggedIn: React.PropTypes.bool
};

export default AppHomePage;
