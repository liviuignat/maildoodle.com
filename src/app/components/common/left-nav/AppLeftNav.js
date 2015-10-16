import * as React from 'react';
import ComponentBase from './../../ComponentBase';
import { LeftNav } from './../material-ui/index';
import { logoutAction } from './../../../actions/index';

class AppLeftNav extends ComponentBase {
  static contextTypes: React.ValidationMap = {
    router: React.PropTypes.func.isRequired
  };

  menuItems = [
    { text: 'My account', route: '/app/my-account'},
    { text: 'Dashboard', route: '/app' },
    { text: 'Logout', action: () => this.logout() }
  ];

  constructor(props, context) {
    super(props, context);
  }

  toggle(e) {
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
        <LeftNav
            ref='leftNav'
            docked={false}
            menuItems={this.menuItems}
            selectedIndex={this.getSelectedIndex.bind(this)()}
            onChange={this.onLeftNavChange.bind(this)} />
      </div>
    );
  }
}

export default AppLeftNav;