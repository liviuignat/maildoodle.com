import React, { Component, PropTypes } from 'react';
import ExecuteOnce from './../../../../helpers/ExecuteOnce';
import {
  CodeEditor,
} from './../../../../components';

export default class TemplateDetailHtmlEditor extends Component {
  static propTypes = {
    template: PropTypes.object.isRequired,
    updateDevelopmentVersion: PropTypes.func.isRequired
  }

  constructor(props, context) {
    super(props, context);
    this.executeOnce = new ExecuteOnce();
  }

  handleChange(html) {
    if (!this.isHtmlChanged(html)) {
      return;
    }

    this.executeOnce.execute(() => {
      this.props.updateDevelopmentVersion({
        html
      });
    }, 2000);
  }

  isHtmlChanged(currentHtml) {
    const { html } = this.props.template.developmentVersion;
    return currentHtml !== html;
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
