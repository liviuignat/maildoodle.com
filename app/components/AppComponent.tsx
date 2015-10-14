import * as React from 'react';
import ComponentBase from './ComponentBase';
import { AppHeader, AppLeftNav } from './common/index';

class AppComponent extends ComponentBase<any, any> {
  static contextTypes: React.ValidationMap<any> = {
    router: React.PropTypes.func.isRequired
  };

  constructor(props: any, context: any) {
    super(props, context);
  }

  handleClick(e: any) {
    e.preventDefault();

    const leftNav: any = this.refs['leftNav'];
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

export default AppComponent;