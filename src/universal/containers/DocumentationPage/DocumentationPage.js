import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {AppFooter, CodeEditor, CompanyName, Paper} from 'universal/components';

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

  renderApiDocumentation(exampleJson) {
    const style = require('./DocumentationPage.scss');
    const json = JSON.stringify(exampleJson, null, 2);

    return (
      <div className={style.RestApi_codeContainer}>
        <div className={style.TemplateApiDocumentation_sampleSubsection}>
          <div><b>Link:</b></div>
          <code>
            {`[POST] /app/projects/:projectId/templates/:templateId/generate`}
          </code>
        </div>
        <div className={style.TemplateApiDocumentation_sampleSubsection}>
          <div><b>Headers:</b></div>
          <code>
            <div>Api-Secret:   '[API SECRET FROM MY ACCOUNT]'</div>
            <div>Content-Type: 'application/json'</div>
          </code>
        </div>
        <div className={style.TemplateApiDocumentation_sampleSubsection}>
          <div><b>Payload:</b></div>
          <CodeEditor
            readOnly
            theme=""
            mode={{
              name: 'javascript',
              json: true
            }}
            value={json} />
        </div>
      </div>);
  }

  render() {
    const style = require('./DocumentationPage.scss');
    const templatesListImage = require('./images/templates-list.png');
    const templatesOverviewImage = require('./images/template-overview.png');
    const templatesHtmlEditImage = require('./images/template-html-edit.png');
    const templatesTestJsonEditImage = require('./images/template-test-json-edit.png');

    return (
      <div className={style.DocumentationPage}>
        <Helmet title="maildoodle - documentation" />
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

          <div className={style.RestApi_container}>
            <div className={style.MainSectionTitle} id="rest-api-access">REST API access</div>

            <div className={style.RestApi_description}>
              <CompanyName/> helps you organize, edit and helps in all the process required for you to maintain your email templates.
              We provide REST API access to those emails, so you can easily create your email content, and use your internal system to send those emails.
              We don not send any email for you, at least not we do not plan this for the near future.
              <p>All you need to generate a template is to make a POST API call to a specific url, by passing the JSON payload with the data required to generate that template.
                Keep in mind that if the data is incorrect or incomplete, the template generator will throw an error.</p>
            </div>

            <div className={style.RestApi_title}>Basic REST API call</div>
            <div className={style.RestApi_description}>
              <p><strong>IMPORTANT</strong>: this endpoint will deliver the template that you marked as <code>production</code> version.
                It is highly recommended to use this endpoint, so you don't need to handle from your application any versioning.</p>
            </div>
            {::this.renderApiDocumentation({
              json: '{ [JSON DATA NEEDED TO GENERATE THE TEMPLATE] }'
            })}

            <div className={style.RestApi_title}>REST API call with optional parameters</div>
            <div className={style.RestApi_description}>
              <p><strong>IMPORTANT</strong>: the optional parameters are not recommented to be used in you applications.
                This option is recommended to be used mostly for testing purposes.</p>
            </div>
            {::this.renderApiDocumentation({
              layoutId: '[OPTIONAL LAYOUT ID]',
              versionId: '[OPTIONAL TEMPLATE ID]',
              languageKey: '[OPTIONAL LANGUAGE KEY - not implemented yet]',
              json: '{ [JSON DATA NEEDED TO GENERATE THE TEMPLATE] }'
            })}
          </div>
        </Paper>

        <AppFooter />
      </div>
    );
  }
}
