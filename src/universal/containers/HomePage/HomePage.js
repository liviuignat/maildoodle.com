import React, { Component } from 'react';
import config from './../../../config';

export default class Home extends Component {
  render() {
    return (
      <div>
        <h3>Welcome to { config.app.title }</h3>
      </div>
    );
  }
}
