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
      <header>
        header
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
      return <Link className='AppHeader-navigationLink' to='/auth/login'>Login</Link>;
    }
  }
}

export default AppHeader;
