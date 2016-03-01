import React, { Component } from 'react';
import { Link } from 'react-router';

export default class AppFooter extends Component {
  render() {
    const currentYear = new Date().getFullYear();

    return (
      <footer className={"AppFooter"}>
        <Link to="/">{currentYear} © emailtemplates.com</Link>
      </footer>
    );
  }
}
