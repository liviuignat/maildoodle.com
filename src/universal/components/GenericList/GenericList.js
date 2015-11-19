import React, { Component, PropTypes } from 'react';
import {
  FloatingActionButton,
  List,
  ListItem,
  ListDivider,
  IconButton,
  IconMenu,
  MenuItem,
  FontIcon
} from './../index';

export default class GenericList extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    subheader: PropTypes.string,
    primaryText: PropTypes.func.isRequired,
    secondaryText: PropTypes.func,
    onRowClick: PropTypes.func.isRequired,
    onEditPressed: PropTypes.func.isRequired,
    onDeletePressed: PropTypes.func.isRequired,
    onAddPressed: PropTypes.func.isRequired
  };

  handleEvent(item, callback) {
    return () => callback(item);
  }

  render() {
    const {
      items,
      subheader,
      onEditPressed,
      onDeletePressed,
      onAddPressed,
      onRowClick,
      primaryText,
      secondaryText
    } = this.props;

    const listItemIconMenu = (item) => (
      <IconMenu
        iconButtonElement={
          <IconButton tooltip="more...">
            <FontIcon className="material-icons">more_vert</FontIcon>
          </IconButton>
        }>
        <MenuItem primaryText="Edit" onClick={::this.handleEvent(item, onEditPressed)}/>
        <MenuItem primaryText="Delete" onClick={::this.handleEvent(item, onDeletePressed)}/>
      </IconMenu>
    );

    const listItem = (item, index) => (
      <div key={index}>
        <ListDivider />
        <ListItem
          rightIconButton={listItemIconMenu(item)}
          primaryText={(
            <div onClick={::this.handleEvent(item, onRowClick)}>
              {primaryText(item)}
            </div>)}
          secondaryText={secondaryText && (
            <div onClick={::this.handleEvent(item, onRowClick)}>
              {secondaryText(item)}
            </div>)}
          secondaryTextLines={1}/>
      </div>
    );

    return (
      <div>
        <div style={{
          position: 'relative',
          height: '20px'
        }}>
          <FloatingActionButton
            primary
            mini
            style={{
              margin: '0 16px',
              position: 'absolute',
              right: '0'
            }}
            onClick={::this.handleEvent({}, onAddPressed)}>
            <span>+</span>
          </FloatingActionButton>
        </div>

        <List subheader={subheader}>
          {items.map(listItem)}
        </List>
      </div>
    );
  }
}
