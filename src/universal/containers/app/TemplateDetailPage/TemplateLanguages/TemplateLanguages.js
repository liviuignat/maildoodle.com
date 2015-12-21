import React, { Component, PropTypes } from 'react';
import {
  Tabs,
  Tab,
  CodeEditor
} from './../../../../components';

export default class TemplateLanguages extends Component {
  static propTypes = {
    template: PropTypes.object.isRequired,
    projectLanguages: PropTypes.array.isRequired
  }

  renderLanguage(language) {
    const { objectId, name } = language;
    return (
      <Tab label={name} key={objectId}>
        <CodeEditor
          mode={{
            name: 'javascript',
            json: true
          }}
          value="{}" />
      </Tab>
    );
  }

  render() {
    const { projectLanguages } = this.props;

    return (
      <Tabs>
        { projectLanguages && projectLanguages.map(::this.renderLanguage) }
      </Tabs>
    );
  }
}
