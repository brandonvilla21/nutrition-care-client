import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {white, blue500} from 'material-ui/styles/colors';

const themeDefault = getMuiTheme({
  palette: {
  },
  appBar: {
    height: 57,
    color: blue500
  },
  drawer: {
    width: 230,
    color: white
  },
  raisedButton: {
    primaryColor: blue500,
  }
});


export default themeDefault;