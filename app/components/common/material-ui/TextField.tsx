import { TextField } from 'material-ui';
import { extend } from './utils';
import { textField } from './../../styles';

class AppRaisedButton extends TextField {
  constructor(props: any, context: any) {
    super(props, context);

    this.getStyles = () => extend(super.getStyles(), textField);
  }
}

export default AppRaisedButton;