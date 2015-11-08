import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom/server';
import serialize from 'serialize-javascript';
import DocumentMeta from 'react-document-meta';

/**
 * Wrapper component containing HTML metadata and boilerplate tags.
 * Used in server-side code only to wrap the string output of the
 * rendered route component.
 *
 * The only thing this component doesn't (and can't) include is the
 * HTML doctype declaration, which is added to the rendered output
 * by the server.js file.
 */
export default class Html extends Component {
  static propTypes = {
    assets: PropTypes.object,
    component: PropTypes.node,
    store: PropTypes.object
  }

  render() {
    const {assets, component, store} = this.props;
    const content = component ? ReactDOM.renderToString(component) : '';

    return (
      <html lang="en-us">
        <head>
          {DocumentMeta.renderAsReact()}

          <link rel="shortcut icon" href="/favicon.ico" />

          {/* styles (will be present only in production with webpack extract text plugin) */}
          {Object.keys(assets.styles).map((style, key) =>
            <link href={assets.styles[style]} key={key} media="screen, projection"
                  rel="stylesheet" type="text/css" charSet="UTF-8"/>
          )}

          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css?family=Roboto:400,300,300italic,400italic,700,700italic,500,500italic" rel="stylesheet" type="text/css" />

          <link rel="stylesheet" href="https://storage.googleapis.com/code.getmdl.io/1.0.5/material.indigo-pink.min.css" />
          <script src="https://storage.googleapis.com/code.getmdl.io/1.0.5/material.min.js"></script>

          {/* (will be present only in development mode) */}
          {/* outputs a <style/> tag with all bootstrap styles + App.scss + it could be CurrentPage.scss. */}
          {/* can smoothen the initial style flash (flicker) on page load in development mode. */}
          {/* ideally one could also include here the style for the current page (Home.scss, About.scss, etc) */}
          { Object.keys(assets.styles).length === 0 ? <style dangerouslySetInnerHTML={{__html: require('../theme/bootstrap.config.js') + require('./../containers/AppContainer/AppContainer.scss')._style}}/> : null }
        </head>
        <body>
          <div id="content" dangerouslySetInnerHTML={{__html: content}}/>
          <script dangerouslySetInnerHTML={{__html: `window.__data=${serialize(store.getState())};`}} charSet="UTF-8"/>
          <script src={assets.javascript.main} charSet="UTF-8"/>
        </body>
      </html>
    );
  }
}
