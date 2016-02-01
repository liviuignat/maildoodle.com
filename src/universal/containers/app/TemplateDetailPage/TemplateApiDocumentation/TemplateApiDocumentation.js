import React, { Component, PropTypes } from 'react';
import {
  Paper,
  CodeEditor
} from './../../../../components';

export default class TemplateDetailHtmlEditor extends Component {
  static propTypes = {
    project: PropTypes.object.isRequired,
    template: PropTypes.object.isRequired
  };

  render() {
    const style = require('./TemplateApiDocumentation.scss');
    const {project, template} = this.props;
    const currentVersionJsonString = template.currentVersion.sampleJson;
    const currentVersionJson = JSON.parse(currentVersionJsonString);
    const exampleJson = {
      layoutId: '[OPTIONAL LAYOUT ID]',
      versionId: '[OPTIONAL TEMPLATE ID]',
      languageKey: '[OPTIONAL LANGUAGE KEY]',
      json: currentVersionJson
    };

    return (
      <Paper className={style.TemplateApiDcoumentation_sampleContent}>
        <h3>API DOCUMENTATION</h3>
        <div className={style.TemplateApiDocumentation_sampleSubsection}>
          <div><b>Link:</b></div>
          <code>
            {`[POST] /app/projects/${project.objectId}/templates/${template.objectId}/generate`}
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
            value={JSON.stringify(exampleJson, null, 2)} />
        </div>
      </Paper>
    );
  }
}
