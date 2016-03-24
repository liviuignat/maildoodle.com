import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

export default class Breadcrumbs extends Component {
  static propTypes = {
    delimitator: PropTypes.any,
    links: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      href: PropTypes.string
    })).isRequired
  };

  static defaultProps = {
    delimitator: <span>&nbsp;/&nbsp;</span>
  };

  render() {
    const style = require('./Breadcrumbs.scss');
    const {links, delimitator} = this.props;

    return (
      <div className={style.breadcrumbs} {...this.props}>
        {links.map((link, index) => (
          <span key={index}>
            {index < links.length - 1 ? <Link className={style.link} to={link.href}>{link.text}</Link> : <span>{link.text}</span>}
            {index < links.length - 1 ? delimitator : null}
          </span>
        ))}
      </div>
    );
  }
}
