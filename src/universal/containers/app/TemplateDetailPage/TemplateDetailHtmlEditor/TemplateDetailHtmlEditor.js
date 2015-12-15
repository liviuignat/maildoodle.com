import React, { Component, PropTypes } from 'react';
import {
  CodeEditor,
} from './../../../../components';

export default class TemplateDetailHtmlEditor extends Component {
  static propTypes = {
    template: PropTypes.object.isRequired
  }

  render() {
    // const { template } = this.props;

    return (
      <div>
        <CodeEditor value="<div>not yet implemented</div>" />
      </div>
    );
  }
}
