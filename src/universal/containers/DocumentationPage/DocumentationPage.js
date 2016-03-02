import React, {Component} from 'react';
import {AppFooter} from './../../components';

export default class DocumentationPage extends Component {
  render() {
    const style = require('./DocumentationPage.scss');

    return (
      <div className={style.DocumentationPage}>
        <div className={style.main_container}>
          <section>
            <h1>Handle and edit your email templates</h1>
          </section>

          <section>
            <h1>Handle and edit your email layouts</h1>
          </section>

          <section>
            <h1>REST API access</h1>
          </section>
        </div>

        <AppFooter />
      </div>
    );
  }
}
