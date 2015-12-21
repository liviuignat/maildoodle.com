import React, { Component, PropTypes } from 'react';
import {
  CodeEditor,
} from './../../../../components';

export default class TemplateDetailHtmlEditor extends Component {
  static propTypes = {
    template: PropTypes.object.isRequired
  }

  render() {
    return (
      <div>
        <CodeEditor value="<div>html editor not yet implemented</div>" />
      </div>
    );
  }
}
