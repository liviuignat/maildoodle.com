import React, {Component} from 'react';
import {AppFooter} from './../../components';

export default class DocumentationPage extends Component {
  render() {
    const style = require('./DocumentationPage.scss');

    return (
      <div className={style.DocumentationPage}>

        <AppFooter />
      </div>
    );
  }
}
