import * as React from 'react';
import ComponentBase from './../../../ComponentBase';
import { currentUserStore } from './../../../../stores/index';

class AppHomePage extends ComponentBase<any, any> {
  react = React;

  constructor(props: any) {
    super(props);

    this.props.menuStyle = {
       width: '100px',
       marginLeft: '-16px',
       marginTop: '-13px'
    };
  }

  render() {
    return (
      <div>
        <h1>Hi {currentUserStore.getDisplayName()}, you are now logged in. Please use the menu on the left corner.</h1>
      </div>
    );
  }
}

export default AppHomePage;
