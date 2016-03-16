import Colors from 'material-ui/lib/styles/colors';
import ColorManipulator from 'material-ui/lib/utils/color-manipulator';
import Spacing from 'material-ui/lib/styles/spacing';

export function getMuiTheme() {
  return {
    spacing: Spacing,
    zIndex: 100,
    fontFamily: 'Roboto, sans-serif',
    palette: {
      primary1Color: Colors.blueGrey400,
      primary2Color: Colors.cyan700,
      primary3Color: Colors.lightBlack,
      accent1Color: Colors.green700,
      accent2Color: Colors.grey100,
      accent3Color: Colors.grey500,
      textColor: Colors.darkBlack,
      alternateTextColor: Colors.white,
      canvasColor: Colors.white,
      borderColor: Colors.grey300,
      disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3),
      pickerHeaderColor: Colors.cyan800,
    },
    userAgent: 'all'
  };
}
