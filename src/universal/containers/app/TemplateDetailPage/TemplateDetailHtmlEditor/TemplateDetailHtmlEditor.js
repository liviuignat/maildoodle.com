import React, { Component, PropTypes } from 'react';
import ExecuteOnce from './../../../../helpers/ExecuteOnce';
import {
  CodeEditor,
} from './../../../../components';

export default class TemplateDetailHtmlEditor extends Component {
  static propTypes = {
    isReadOnly: PropTypes.bool.isRequired,
    template: PropTypes.object.isRequired,
    updateDevelopmentVersion: PropTypes.func.isRequired
  };

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
    const { html } = this.props.template.currentVersion;
    return currentHtml !== html;
  }

  render() {
    const {isReadOnly} = this.props;
    const { html } = this.props.template.currentVersion;

    return (
      <div>
        <CodeEditor
          readOnly={isReadOnly}
          value={html}
          lineNumbers
          matchBrackets
          height={600}
          onChange={::this.handleChange} />
      </div>
    );
  }
}
