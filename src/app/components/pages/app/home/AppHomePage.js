import * as React from 'react';
import ProtectedPageBase from './../ProtectedPageBase';

class AppHomePage extends ProtectedPageBase {
  constructor(props, context) {
    super(props, context);

    this.state = {
      user: this.context.user
    };
  }

  render() {
    return (
      <div>
        <h3>Hi { this.state.user.getDisplayName() }, you are now logged in. Please use the menu on the left corner.</h3>
      </div>
    );
  }
}

AppHomePage.contextTypes = {
  user: React.PropTypes.object,
  isLoggedIn: React.PropTypes.bool
};

export default AppHomePage;
