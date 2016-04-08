import React, { Component, PropTypes } from 'react';
import {tryParse} from 'universal/helpers/json';
import {
  Paper,
  CodeEditor
} from 'universal/components';

export default class TemplateDetailHtmlEditor extends Component {
  static propTypes = {
    project: PropTypes.object.isRequired,
    template: PropTypes.object.isRequired
  };

  get isLiveDocVisible() {
    if (!this.state) {
      return false;
    }
    return this.state.isLiveDocVisible;
  }
  set isLiveDocVisible(value) {
    this.setState({isLiveDocVisible: value});
  }

  toggleLiveDoc() {
    this.isLiveDocVisible = !this.isLiveDocVisible;
  }

  render() {
    const style = require('./TemplateApiDocumentation.scss');
    const {project, template} = this.props;
    const currentVersionJsonString = template.currentVersion.sampleJson;
    const currentVersionJson = tryParse({value: currentVersionJsonString});
    const exampleJson = JSON.stringify({
      layoutId: '[OPTIONAL LAYOUT ID]',
      versionId: '[OPTIONAL TEMPLATE ID]',
      languageKey: '[OPTIONAL LANGUAGE KEY]',
      json: {}
    }, null, 2).replace('{}', '{ [JSON OBJECT NEEDED TO GENERATE THE TEMPLATE] }');
    const liveExampleJson = JSON.stringify({
      layoutId: '[OPTIONAL LAYOUT ID]',
      versionId: '[OPTIONAL TEMPLATE ID]',
      languageKey: '[OPTIONAL LANGUAGE KEY]',
      json: currentVersionJson
    }, null, 2);

    return (
      <Paper className={style.TemplateApiDocumentation_sampleContent}>
        <div style={{
          'display': this.isLiveDocVisible ? 'none' : 'block'
        }}>
          <h3>
            API DOCUMENTATION &nbsp;
            <span className={style.TemplateApiDocumentation_toggleApi}
              onClick={::this.toggleLiveDoc}>
              show live docs
            </span>
          </h3>
          <div className={style.TemplateApiDocumentation_sampleSubsection}>
            <div><b>Link:</b></div>
            <code>
              {`[POST] /app/projects/:projectId/templates/:templateId/generate`}
            </code>
          </div>
          <div className={style.TemplateApiDocumentation_sampleSubsection}>
            <div><b>Headers:</b></div>
            <code>
              <div>X-Api-Token:   '[API SECRET FROM MY ACCOUNT]'</div>
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
              value={exampleJson} />
          </div>
        </div>

        <div style={{
          'display': this.isLiveDocVisible ? 'block' : 'none'
        }}>
          <h3>
            API DOCUMENTATION &nbsp;
            <span className={style.TemplateApiDocumentation_toggleApi}
              onClick={::this.toggleLiveDoc}>
              show normal docs
            </span>
          </h3>
          <div className={style.TemplateApiDocumentation_sampleSubsection}>
            <div><b>Link:</b></div>
            <code>
              {`[POST] /app/projects/${project.objectId}/templates/${template.objectId}/generate`}
            </code>
          </div>
          <div className={style.TemplateApiDocumentation_sampleSubsection}>
            <div><b>Headers:</b></div>
            <code>
              <div>X-Api-Token:   '[API SECRET FROM MY ACCOUNT]'</div>
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
              value={liveExampleJson} />
          </div>
        </div>
      </Paper>
    );
  }
}
