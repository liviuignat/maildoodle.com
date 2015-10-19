import * as React from 'react';
import ComponentBase from './ComponentBase';

class AppComponent extends ComponentBase {
  constructor(props, context) {
    super(props, context);
  }

  handleClick(e) {
    e.preventDefault();

    const leftNav = this.refs['leftNav'];
    leftNav.toggle();
  }

  isNode() {
    return typeof window === 'undefined';
  }

  render() {
    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <title>c24 reactes6</title>
          <meta name="description" content="" />
          <meta name="viewport" content="width=device-width" />
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css?family=Roboto:400,300,300italic,400italic,700,700italic,500,500italic" rel="stylesheet" type="text/css" />
          <link rel="stylesheet" href="/styles/main.css" />
          <script src="https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.js"></script>
        </head>
        <body>
          { this.props.children }
          <script src="/scripts/vendor.js"></script>
          <script src="/app.js"></script>
        </body>
      </html>
    );
  }
}

AppComponent.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default AppComponent;
