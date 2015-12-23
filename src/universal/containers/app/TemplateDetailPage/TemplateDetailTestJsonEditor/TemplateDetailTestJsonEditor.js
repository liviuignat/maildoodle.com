import React, { Component, PropTypes } from 'react';
import {
  CodeEditor,
} from './../../../../components';

export default class TemplateDetailTestJsonEditor extends Component {
  static propTypes = {
    template: PropTypes.object.isRequired,
    updateDevelopmentVersion: PropTypes.func.isRequired
  }

  handleChange(sampleJson) {
    if (!this.isJsonChanged(sampleJson)) {
      return;
    }

    this.props.updateDevelopmentVersion({
      sampleJson
    });
  }

  isJsonChanged(json) {
    const { sampleJson } = this.props.template.developmentVersion;
    return json !== sampleJson;
  }

  render() {
    const { sampleJson } = this.props.template.developmentVersion;

    return (
      <div>
        <CodeEditor
          mode={{
            name: 'javascript',
            json: true
          }}
          value={sampleJson}
          onChange={::this.handleChange} />
      </div>
    );
  }
}
