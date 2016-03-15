import React, {Component, PropTypes} from 'react';
import {Paper} from './../../components';
import {Link} from 'react-router';

export default class HomePageCard extends Component {
  static propTypes = {
    imageSrc: PropTypes.string.isRequired,
    titleText: PropTypes.string.isRequired,
    bodyText: PropTypes.string.isRequired,
    actionText: PropTypes.string.isRequired,
    actionUrl: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired
  };

  render() {
    const style = require('./HomePageCard.scss');
    const {imageSrc, titleText, bodyText, actionText, actionUrl} = this.props;

    return (
      <div {...this.props}>
        <Paper className={style.card}>
          <img className={style.cardHeader}
            src={imageSrc} />
          <div className={style.cardContent}>
            <div className={style.cardTitle}>{titleText}</div>
            <div className={style.cardBody}>{bodyText}</div>
          </div>
          <Link className={style.cardAction} to={actionUrl}>{actionText}</Link>
        </Paper>
      </div>
    );
  }
}
