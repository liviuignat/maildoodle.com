import * as React from 'react';
import ComponentBase from './../../ComponentBase';
import { logoutAction } from './../../../actions/index';

class AppLeftNav extends ComponentBase {
  constructor(props, context) {
    super(props, context);

    this.menuItems = [
      { text: 'My account', route: '/app/my-account' },
      { text: 'Dashboard', route: '/app' },
      { text: 'Logout', action: () => this.logout() }
    ];
  }

  toggle() {
    const leftNav = this.refs['leftNav'];
    leftNav.toggle();
  }

  getSelectedIndex() {
    let currentItem;

    if (!this.props.location) {
      console.warn('Warning: AppLeftNav has no routing info, navigation might fail');
      return null;
    }

    for (let i = this.menuItems.length - 1; i >= 0; i--) {
      currentItem = this.menuItems[i];
      const isCurrentRoute =
        this.props.location.pathname === currentItem.route ||
        this.props.location.pathname === currentItem.route + '/';

      if (isCurrentRoute) {
        return i;
      }
    }
  }

  onLeftNavChange(e, key, payload) {
    if (payload.route) {
      this.props.history.pushState(null, payload.route);
    } else if (payload.action) {
      payload.action.bind(this)();
    }
  }

  logout() {
    logoutAction.execute()
      .then(() => {
        this.props.history.pushState(null, '/');
      });
  }

  render() {
    return (
      <div>
        left-nav
      </div>
    );
  }
}

AppLeftNav.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default AppLeftNav;