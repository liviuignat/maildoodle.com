import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import ExecuteOnce from 'universal/helpers/ExecuteOnce';
import {getDesignerPreview} from 'universal/redux/reducers/currentDesigner';
import {
  CodeEditor,
  Paper,
  RaisedButton,
  TextField
} from 'universal/components';

const CODE = `
import React from 'react';

export default class MainComponent extends React.Component {
  static propTypes = {
    pageTitle: React.PropTypes.string,
    fullName: React.PropTypes.string,
    email: React.PropTypes.string
  };

  render() {
    return (
      <div style={{backgroundColor: 'white', padding: 16}}>
        <h1 style={{color: 'green'}}>{this.props.pageTitle}</h1>
        <p>Name: {this.props.fullName}</p>
        <p>Email: {this.props.fullName}</p>
      </div>
    );
  }
}
`;

@connect(
  state => ({
    preview: state.currentDesigner.preview,
    isLoadingPreview: state.currentDesigner.isLoadingPreview
  }), {
    getDesignerPreview
  })
export default class ReactDesignerPage extends Component {
  static propTypes = {
    preview: PropTypes.object.isRequired,
    isLoadingPreview: PropTypes.bool.isRequired,
    getDesignerPreview: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.executeOnce = new ExecuteOnce();
    this.state = {
      component: CODE,
      data: {}
    };
  }

  handleCodeEditorChange(component) {
    this.setState({component});
  }

  handlePropertyFieldChange(prop) {
    return (evt) => {
      const {value} = evt.target;
      const {data} = this.state;
      data[prop] = value;
      this.setState({data});
    };
  }

  handleRunButtonClick() {
    const {component, data} = this.state;
    this.props.getDesignerPreview({component, data});
  }

  renderPropTypes(propTypes = []) {
    return propTypes.map((prop, index) => {
      const {name} = prop;
      const value = this.state.data[name];
      return (
        <div key={index}>
          <TextField fullWidth
            value={value}
            hintText={name}
            floatingLabelText={name}
            onChange={::this.handlePropertyFieldChange(name)} />
        </div>
      );
    });
  }

  render() {
    const style = require('./ReactDesignerPage.scss');
    const {preview} = this.props;
    const {html, propTypes} = preview;

    return (
      <div>
        <RaisedButton
          labelText="Run code"
          fullWidth
          primary
          onClick={::this.handleRunButtonClick}
          type="button" />

        <div className={style.ReactDesignerPage_container}>
          <div className={style.ReactDesignerPage_editor}>
            <CodeEditor
              mode={{
                name: 'javascript'
              }}
              value={this.state.component}
              lineNumbers
              matchBrackets
              height={600}
              onChange={::this.handleCodeEditorChange} />
          </div>

          {propTypes && propTypes.length && <Paper className={style.ReactDesignerPage_properties}>
            <h3>Edit properties</h3>
            {this.renderPropTypes(propTypes)}
          </Paper>}
        </div>

        <Paper className={style.ReactDesignerPage_results}
            dangerouslySetInnerHTML={{__html: html}} />
      </div>
    );
  }
}
