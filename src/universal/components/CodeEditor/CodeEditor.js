import React, { Component, PropTypes } from 'react';

export default class CodeEditor extends Component {
  static propTypes = {
    mode: PropTypes.any,
    height: PropTypes.any,
    theme: PropTypes.string,
    value: PropTypes.string,
    readOnly: PropTypes.bool,
    lineNumbers: PropTypes.bool,
    matchBrackets: PropTypes.bool,
    onChange: PropTypes.func
  };

  static defaultProps = {
    mode: 'htmlmixed',
    theme: 'night',
    value: '',
    lineNumbers: false,
    matchBrackets: false,
    readOnly: false,
    height: 0
  };

  componentDidMount() {
    if (this.codeMirror) {
      if (this.props.height) {
        this.codeMirror.setSize('auto', 600);
      } else {
        this.codeMirror.setSize('auto', 'auto');
      }
    }
  }

  get codeMirror() {
    if (this.refs.codemirror) {
      return this.refs.codemirror.getCodeMirror();
    }
    return null;
  }

  get codeEditor() {
    const { mode, value, readOnly, theme, lineNumbers, matchBrackets } = this.props;

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
            theme: theme,
            lineNumbers: lineNumbers,
            matchBrackets: matchBrackets,
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
      </div>
    );
  }
}
