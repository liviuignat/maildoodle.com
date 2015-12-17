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
        <CodeEditor
          mode={{
            name: 'javascript',
            json: true
          }}
          value="{value: 'not yet implemented'}" />
      </div>
    );
  }
}
