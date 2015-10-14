import * as React from 'react';
import config from './../../../app.config';
import ComponentBase from './../../ComponentBase';
import { Link } from 'react-router';
import { AppBar, Avatar } from './../material-ui/index';
import { history } from './../../../history';
import { logoutAction } from './../../../actions/index';
import { currentUserStore } from './../../../stores/index';

interface IAppHeaderState {
  isLoggedIn: boolean;
}

class AppHeader extends ComponentBase<any, IAppHeaderState> {
  react = React;

  constructor(props: any, context: any) {
    super(props, context);

    this.state = {
      isLoggedIn: currentUserStore.getIsLoggedIn()
    };

    currentUserStore.addLoginListener(() => {
      this.setState({
        isLoggedIn: currentUserStore.getIsLoggedIn()
      });
    });

    currentUserStore.addLogoutListener(() => {
      this.setState({
        isLoggedIn: currentUserStore.getIsLoggedIn()
      });
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
        <AppBar
          title={<Link className='AppHeader-homeLink' to='/'>{ config.title }</Link>}
          showMenuIconButton={this.state.isLoggedIn}
          iconElementRight={this.renderButtonsRight()}
          onLeftIconButtonTouchTap={this.props.onLeftIconButtonTouchTap}
          />
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
