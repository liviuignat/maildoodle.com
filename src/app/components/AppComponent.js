import * as React from 'react';
import ComponentBase from './ComponentBase';
import { AppHeader, AppLeftNav } from './common/index';

class AppComponent extends ComponentBase {

  constructor(props, context) {
    super(props, context);
  }

  handleClick(e) {
    e.preventDefault();

    const leftNav = this.refs['leftNav'];
    leftNav.toggle();
  }

  render() {
    return (
      <div>
        <AppLeftNav
          ref='leftNav'
          location={this.props.location}
          history={this.props.history}/>

        <AppHeader onLeftIconButtonTouchTap={this.handleClick.bind(this)} />

        <section className='AppContainer'>
          {this.props.children}
        </section>

      </div>
    );
  }
}

AppComponent.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default AppComponent;