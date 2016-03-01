import React, {Component, PropTypes} from 'react';
import {Paper} from './../../components';
import {Link} from 'react-router';

export default class HomePageCard extends Component {
  static propTypes = {
    imageSrc: PropTypes.string.isRequired,
    titleText: PropTypes.string.isRequired,
    bodyText: PropTypes.string.isRequired,
    actionText: PropTypes.string.isRequired,
    actionUrl: PropTypes.string.isRequired
  };

  render() {
    const style = require('./HomePage.scss');
    const {imageSrc, titleText, bodyText, actionText, actionUrl} = this.props;

    return (
      <Paper className={style.HomePage_card}>
        <img className={style.HomePage_cardHeader}
          src={imageSrc} />
        <div className={style.HomePage_cardContent}>
          <div className={style.HomePage_cardTitle}>{titleText}</div>
          <div className={style.HomePage_cardBody}>{bodyText}</div>
        </div>
        <Link className={style.HomePage_cardAction} to={actionUrl}>{actionText}</Link>
      </Paper>
    );
  }
}
