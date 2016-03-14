import React, {Component} from 'react';
import {Link} from 'react-router';
import {AppFooter, HomePageCard} from './../../components';

export default class HomePage extends Component {
  render() {
    const style = require('./HomePage.scss');
    const more1Image = require('./images/more-from-1.png');
    const more2Image = require('./images/more-from-2.png');
    const more3Image = require('./images/more-from-3.png');
    const more4Image = require('./images/more-from-4.png');

    return (
      <div className={style.HomePage}>
        <div className={style.HomePage_titleContainer}>
          <div className={style.HomePage_title}>
            Email templates for your apps in the cloud.
          </div>

          <div className={style.HomePage_subTitle}>
            Handle all your custom email templates in one place and lift the pain out of your software.<br/>
          </div>

          <ul className={style.HomePage_actions}>
            <li><Link to="/auth/sign-up" className={style.HomePage_signUpButton}>Sign Up</Link></li>
            <li><Link to={{pathname: '/documentation'}} className={style.HomePage_learnMoreButton}>Learn More</Link></li>
          </ul>
        </div>

        <div className={style.HomePage_secondSection}>

          <h1>Have your templates in one place and increase productivity</h1>

          <div className={style.HomePage_cardListContainer}>
            <HomePageCard
              className={style.HomePage_cardContainer}
              imageSrc={more1Image}
              titleText="Multiple templates"
              bodyText="Easily create multiple HTML and PDF templates, manage and preview them directly in the browser."
              actionText="learn more >"
              actionUrl="/documentation"/>

            <HomePageCard
              className={style.HomePage_cardContainer}
              imageSrc={more4Image}
              titleText="Different layouts"
              bodyText="Create multiple page layouts and handle your different campaigns easily."
              actionText="learn more >"
              actionUrl="/documentation"/>

            <HomePageCard
              className={style.HomePage_cardContainer}
              imageSrc={more2Image}
              titleText="REST APIs"
              bodyText="Generate the content through our rest API, send them with your SMTP server."
              actionText="learn more >"
              actionUrl={{pathname: '/documentation', hash: '#rest-api-access'}}/>

            <HomePageCard
              className={style.HomePage_cardContainer}
              imageSrc={more3Image}
              titleText="Not an email service"
              bodyText="We don't send emails for you, instead we help you manage all your email content that your app is sending."
              actionText="learn more >"
              actionUrl="/documentation"/>
          </div>
        </div>

        <AppFooter />
      </div>
    );
  }
}
