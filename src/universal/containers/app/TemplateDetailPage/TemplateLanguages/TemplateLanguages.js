import React, { Component, PropTypes } from 'react';
import {
  Tabs,
  Tab,
  CodeEditor
} from 'universal/components';

export default class TemplateLanguages extends Component {
  static propTypes = {
    isReadOnly: PropTypes.bool.isRequired,
    template: PropTypes.object.isRequired,
    projectLanguages: PropTypes.array.isRequired
  };

  renderLanguage(language) {
    const { objectId, name } = language;
    const {isReadOnly} = this.props;
    return (
      <Tab label={name} key={objectId}>
        <CodeEditor
          value="{}"
          readOnly={isReadOnly}
          mode={{
            name: 'javascript',
            json: true
          }}
          lineNumbers
          matchBrackets
          height={600} />
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
