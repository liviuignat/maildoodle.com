import React, { Component } from 'react';
import { Link } from 'react-router';

export default class AppFooter extends Component {
  render() {
    const style = require('./AppFooter.scss');
    const currentYear = new Date().getFullYear();

    return (
      <footer className={style.AppFooter}>
        <Link to="/">{currentYear} © maildoodle.com</Link>
      </footer>
    );
  }
}
