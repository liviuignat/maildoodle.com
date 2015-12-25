import React, { Component, PropTypes } from 'react';
import ExecuteOnce from './../../../../helpers/ExecuteOnce';
import {
  CodeEditor,
} from './../../../../components';

export default class TemplateDetailTestJsonEditor extends Component {
  static propTypes = {
    template: PropTypes.object.isRequired,
    updateDevelopmentVersion: PropTypes.func.isRequired
  }

  constructor(props, context) {
    super(props, context);
    this.executeOnce = new ExecuteOnce();
  }

  handleChange(sampleJson) {
    if (!this.isJsonChanged(sampleJson)) {
      return;
    }

    this.executeOnce.execute(() => {
      this.props.updateDevelopmentVersion({
        sampleJson
      });
    }, 2000);
  }

  isJsonChanged(json) {
    const { sampleJson } = this.props.template.currentVersion;
    return json !== sampleJson;
  }

  render() {
    const { sampleJson } = this.props.template.currentVersion;

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
