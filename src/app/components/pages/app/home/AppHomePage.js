import * as React from 'react';
import ComponentBase from './../../../ComponentBase';

class AppHomePage extends ComponentBase {
  constructor(props, context) {
    super(props, context);

    this.state = {
      user: this.context.user
    };
  }

  render() {
    return (
      <div>
        <span>Hi { this.state.user.getDisplayName() }, you are now logged in. Please use the menu on the left corner.</span>
      </div>
    );
  }
}

AppHomePage.contextTypes = {
  user: React.PropTypes.object,
  isLoggedIn: React.PropTypes.bool
};

export default AppHomePage;
