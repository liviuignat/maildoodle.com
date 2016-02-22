import React, { Component, PropTypes } from 'react';
import {
  List,
  ListItem,
  Divider,
  IconButton,
  IconMenu,
  MenuItem,
  FontIcon
} from './../../../../components';

export default class TemplateVersionsList extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    subheader: PropTypes.string,
    primaryText: PropTypes.func.isRequired,
    secondaryText: PropTypes.func,
    onViewPressed: PropTypes.func.isRequired,
    onSetProductionPressed: PropTypes.func.isRequired
  };

  handleEvent(item, callback) {
    return () => callback(item);
  }

  render() {
    const {
      items,
      subheader,
      primaryText,
      secondaryText,
      onViewPressed,
      onSetProductionPressed
    } = this.props;

    const listItemIconMenu = (item) => (
      <IconMenu
        iconButtonElement={
          <IconButton tooltip="more...">
            <FontIcon className="material-icons">more_vert</FontIcon>
          </IconButton>
        }>
        <MenuItem primaryText="View" onClick={::this.handleEvent(item, onViewPressed)}/>
        <MenuItem primaryText="Set Production" onClick={::this.handleEvent(item, onSetProductionPressed)}/>
      </IconMenu>
    );

    const listItem = (item, index) => (
      <div key={index}>
        <Divider />
        <ListItem
          rightIconButton={listItemIconMenu(item)}
          primaryText={(<div>{primaryText(item)}</div>)}
          secondaryText={secondaryText && (<div>{secondaryText(item)}</div>)}
          secondaryTextLines={secondaryText ? 1 : 0}/>
      </div>
    );

    return (
      <div>
        <List subheader={subheader}>
          {items.map(listItem)}
        </List>
      </div>
    );
  }
}
