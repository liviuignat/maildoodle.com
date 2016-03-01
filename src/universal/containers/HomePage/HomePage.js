import React, {Component} from 'react';
import {Link} from 'react-router';
import HomePageCard from './HomePageCard';
import config from './../../../config';

export default class HomePage extends Component {
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
            <li><Link to="/auth/sign-up" className={style.HomePage_signUpButton}>Sign Up</Link></li>
            <li><Link to="/learn-more" className={style.HomePage_learnMoreButton}>Learn More</Link></li>
          </ul>
        </div>

        <div className={style.HomePage_secondSection}>

          <h1>We help you increase productivity</h1>

          <div className={style.HomePage_cardContainer}>
            <HomePageCard
              imageSrc="http://getmdl.io/templates/android-dot-com/images/more-from-1.png"
              titleText="Multiple templates"
              bodyText="Easily create multiple html templates and edit them directly in the browser."
              actionText="learn more >"/>

            <HomePageCard
              imageSrc="http://getmdl.io/templates/android-dot-com/images/more-from-4.png"
              titleText="Different layouts"
              bodyText="Create multiple page layouts and handle your campaign easily."
              actionText="learn more >"/>

            <HomePageCard
              imageSrc="http://getmdl.io/templates/android-dot-com/images/more-from-3.png"
              titleText="Test in the cloud"
              bodyText="You can test your templates just with one click of the button."
              actionText="learn more >"/>
          </div>
        </div>
      </div>
    );
  }
}
