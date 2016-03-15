import React, {Component, PropTypes} from 'react';

export default class Logo extends Component {
  static propTypes = {
    size: PropTypes.number.isRequired
  };

  render() {
    const {size} = this.props;
    const svg = require('./images/logo.svg');
    return (
      <img src={svg} width={size} height={size}/>
    );
  }
}
