import * as React from 'react';
import ComponentBase from './ComponentBase';

class Layout extends ComponentBase {
  constructor(props, context) {
    super(props, context);
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
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css?family=Roboto:400,300,300italic,400italic,700,700italic,500,500italic" rel="stylesheet" type="text/css" />

          <link rel="stylesheet" href="https://storage.googleapis.com/code.getmdl.io/1.0.5/material.indigo-pink.min.css" />
          <script src="https://storage.googleapis.com/code.getmdl.io/1.0.5/material.min.js"></script>

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

export default Layout;
