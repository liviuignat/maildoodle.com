import React, { Component, PropTypes } from 'react';
import {
  CodeEditor,
} from './../../../../components';

export default class TemplateDetailHtmlEditor extends Component {
  static propTypes = {
    template: PropTypes.object.isRequired,
    updateDevelopmentVersion: PropTypes.func.isRequired
  }

  handleChange(html) {
    this.props.updateDevelopmentVersion({
      html
    });
  }

  render() {
    const { html } = this.props.template.developmentVersion;

    return (
      <div>
        <CodeEditor
          value={html}
          onChange={::this.handleChange} />
      </div>
    );
  }
}
