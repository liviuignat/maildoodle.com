import React, { Component, PropTypes } from 'react';

export default class CodeEditor extends Component {
  static propTypes = {
    mode: PropTypes.any,
    value: PropTypes.string,
  };

  static defaultProps = {
    mode: 'htmlmixed',
    value: ''
  };

  componentDidMount() {
    if (this.codeMirror) {
      this.codeMirror.setSize('auto', 600);
    }
  }

  get codeMirror() {
    if (this.refs.codemirror) {
      return this.refs.codemirror.getCodeMirror();
    }
    return null;
  }

  get codeEditor() {
    const { mode, value } = this.props;

    if (__CLIENT__) {
      const CodeMirror = require('./lib/react-codemirror');
      require('./lib/modes/htmlmixed');

      return (
        <CodeMirror
          ref="codemirror"
          value={value}
          options={{
            mode: mode,
            theme: 'night',
            lineNumbers: true,
            matchBrackets: true,
            extraKeys: {
              'Enter': 'newlineAndIndentContinueComment',
              'F10': (cm) => {
                cm.setOption('fullScreen', !cm.getOption('fullScreen'));
              },
              'Esc': (cm) => {
                if (cm.getOption('fullScreen')) {
                  cm.setOption('fullScreen', false);
                }
              }
            }
          }} />
        );
    }

    return <div></div>;
  }

  render() {
    return (
      <div>
        {this.codeEditor}
        <p>* Press F10 to enter full screen and ESC to exit.</p>
      </div>
    );
  }
}
