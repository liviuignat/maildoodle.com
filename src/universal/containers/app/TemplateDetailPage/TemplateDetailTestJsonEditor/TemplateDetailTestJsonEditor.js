import React, { Component, PropTypes } from 'react';
import ExecuteOnce from './../../../../helpers/ExecuteOnce';
import {
  CodeEditor,
} from './../../../../components';

export default class TemplateDetailTestJsonEditor extends Component {
  static propTypes = {
    isReadOnly: PropTypes.bool.isRequired,
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
    const {isReadOnly} = this.props;
    const { sampleJson } = this.props.template.currentVersion;

    return (
      <div>
        <CodeEditor
          readOnly={isReadOnly}
          mode={{
            name: 'javascript',
            json: true
          }}
          lineNumbers
          matchBrackets
          height={600}
          value={sampleJson}
          onChange={::this.handleChange} />
      </div>
    );
  }
}
