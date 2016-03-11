import React, {Component} from 'react';
import {AppFooter, Paper} from './../../components';

export default class DocumentationPage extends Component {

  renderImageWithDescription({image, title, description, rtl}) {
    const style = require('./DocumentationPage.scss');
    const descriptionClass =
      rtl ? style.ScreenshotImage_description__right : style.ScreenshotImage_description__left;

    return (
      <div className={style.ScreenshotImage_container}>
        <div className={descriptionClass}>
          <div className={style.ScreenshotImage_title}>{title}</div>
          <div className={style.ScreenshotImage_text}>
            {description}
          </div>
        </div>
        <img className={style.ScreenshotImage_templatesList} src={image} />
        <div className="clearfix" />
      </div>
    );
  }

  render() {
    const style = require('./DocumentationPage.scss');
    const templatesListImage = require('./images/templates-list.png');
    const templatesOverviewImage = require('./images/template-overview.png');
    const templatesHtmlEditImage = require('./images/template-html-edit.png');
    const templatesTestJsonEditImage = require('./images/template-test-json-edit.png');

    return (
      <div className={style.DocumentationPage}>
        <Paper className={style.main_container}>
          <div>
            <div className={style.MainSectionTitle}>Handle and edit your email templates</div>

            {::this.renderImageWithDescription({
              image: templatesListImage,
              title: 'Save you templates in the cloud',
              description: (
              <ul>
                <li>Easily save and edit your templates</li>
                <li>Create different master layouts where you can setup different header and footer</li>
              </ul>)
            })}

            {::this.renderImageWithDescription({
              rtl: true,
              image: templatesOverviewImage,
              title: 'Overview of each template',
              description: (
              <ul>
                <li>View your template information in one place</li>
                <li>See the history of your templates and switch between them</li>
                <li>Preview your templates as HTML or PDF to view the end result</li>
              </ul>)
            })}

            {::this.renderImageWithDescription({
              image: templatesHtmlEditImage,
              title: 'Edit html templates',
              description: (
              <ul>
                <li>Edit your emails using the online editor</li>
                <li>Control the production changes by chosing when to put them in production</li>
                <li>Safely preview your changes and choose when they are live</li>
              </ul>)
            })}

            {::this.renderImageWithDescription({
              rtl: true,
              image: templatesTestJsonEditImage,
              title: 'Edit test data as JSON',
              description: (
              <ul>
                <li>Edit email JSON data to test your email output</li>
              </ul>)
            })}
          </div>

          <div>
            <div className={style.MainSectionTitle}>REST API access</div>
          </div>
        </Paper>

        <AppFooter />
      </div>
    );
  }
}
