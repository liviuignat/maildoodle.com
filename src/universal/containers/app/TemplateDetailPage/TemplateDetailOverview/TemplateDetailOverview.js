import React, { Component, PropTypes } from 'react';
import {
  RaisedButton,
  Paper,
  SelectField
} from './../../../../components';

export default class TemplateDetailOverview extends Component {
  static propTypes = {
    template: PropTypes.object.isRequired
  }

  render() {
    const style = require('./TemplateDetailOverview.scss');
    const { template } = this.props;

    return (
      <div className={style.TemplateDetailOverview}>
        <div className={style.TemplateDetailOverview_row}>
          <div className={style.TemplateDetailOverview_header}>TEMPLATE NAME</div>
          <div className={style.TemplateDetailOverview_cell}>{template.name}</div>
        </div>
        <div className={style.TemplateDetailOverview_row}>
          <div className={style.TemplateDetailOverview_header}>TEMPLATE DESCRIPTION</div>
          <div className={style.TemplateDetailOverview_cell}>{template.description}</div>
        </div>

        <br />

        <Paper className={style.TemplateDetailOverview_actionButtonGroup}>
          <div>
            <div>Choose a layout:</div>
            <SelectField menuItems={[{text: 'default'}]}/>
          </div>

          <div>
            <div>Choose a language:</div>
            <SelectField menuItems={[{text: 'default'}]}/>
          </div>

          <div>
            <div className={style.TemplateDetailOverview_actionButtonContainer}>
              <RaisedButton
                labelText="Save"
                primary />
            </div>

            <div className={style.TemplateDetailOverview_actionButtonContainer}>
              <RaisedButton
                labelText="Preview html"
                secondary />
            </div>

            <div className={style.TemplateDetailOverview_actionButtonContainer}>
              <RaisedButton
                labelText="Preview pdf"
                secondary />
            </div>
            <div className="clearfix"/>
          </div>
        </Paper>

        <br />

      </div>
    );
  }
}
