import React, { Component, PropTypes } from 'react';

export default class CodeEditor extends Component {
  static propTypes = {
    mode: PropTypes.any,
    value: PropTypes.string,
    readOnly: PropTypes.bool,
    onChange: PropTypes.func
  };

  static defaultProps = {
    mode: 'htmlmixed',
    value: '',
    readOnly: false
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
    const { mode, value, readOnly } = this.props;

    if (__CLIENT__) {
      const CodeMirror = require('./lib/react-codemirror');
      require('./lib/modes/htmlmixed');

      return (
        <CodeMirror
          ref="codemirror"
          value={value}
          options={{
            readOnly: readOnly,
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
          }}
          {...this.props} />
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
