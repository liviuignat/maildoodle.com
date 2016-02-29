import React, { Component } from 'react';
// import { RaisedButton } from './../../components';
import config from './../../../config';

export default class Home extends Component {
  render() {
    const style = require('./HomePage.scss');
    const appName = config.app.title;
    console.log(appName);

    return (
      <div className={style.HomePage}>
        <div className={style.HomePage_titleContainer}>
          <div className={style.HomePage_title}>
            Email templates will never be the same.
          </div>

          <div className={style.HomePage_subTitle}>
            Handle all your email templates in the cloud and lift the pain out of your developers
          </div>

          <ul className={style.HomePage_actions}>
            <li><a href="/auth/sign-up" className={style.HomePage_signUpButton}>Sign Up</a></li>
            <li><a href="#" className={style.HomePage_learnMoreButton}>Learn More</a></li>
          </ul>
        </div>

        <div className={style.HomePage_secondSection}>&nbsp;</div>
      </div>
    );
  }
}
