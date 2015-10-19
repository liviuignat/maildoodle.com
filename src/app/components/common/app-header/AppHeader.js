import * as React from 'react';
import config from './../../../app.config';
import ComponentBase from './../../ComponentBase';
import { Link } from 'react-router';
import { history } from './../../../history';
import { logoutAction } from './../../../actions/index';
import { currentUserStore } from './../../../stores/index';

class AppHeader extends ComponentBase {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isLoggedIn: currentUserStore.getIsLoggedIn()
    };
  }

  componentDidMount() {
    currentUserStore.addLoginListener(this.onLogin.bind(this));
    currentUserStore.addLoginListener(this.onLogout.bind(this));
  }

  componentWillUnmount() {
    currentUserStore.removeChangeListener(this.onLogin.bind(this));
    currentUserStore.removeChangeListener(this.onLogout.bind(this));
  }

  onLogin() {
    this.setState({
      isLoggedIn: currentUserStore.getIsLoggedIn()
    });
  }

  onLogout() {
    this.setState({
      isLoggedIn: currentUserStore.getIsLoggedIn()
    });
  }

  logout() {
    logoutAction.execute()
      .then(() => {
        history.replaceState(null, '/');
      });
  }

  render() {
    return (
      <header className="AppHeader mdl-layout__header">
        <div className="mdl-layout__header-row">
          <Link className="AppHeader-homeLink mdl-layout-title" to="/">Home</Link>
          <div className="AppHeader-navigationContainer">
            <nav className="mdl-navigation">
              <Link className="AppHeader-navigationLink mdl-navigation__link"
                to="/auth/login">Login</Link>
            </nav>
          </div>
          <div className="mdl-layout-spacer"></div>
        </div>
      </header>
    );
  }

  renderButtonsRight() {
    if (this.state.isLoggedIn) {
      return (
        <div>
          <Avatar src={ currentUserStore.getUserPhoto() } />
        </div>
      );
    } else {
      return (
        <div>
          <Link className='AppHeader-navigationLink' to='/auth/login'>Login</Link>
        </div>
      );
    }
  }
}

export default AppHeader;
