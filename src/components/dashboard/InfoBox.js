import React, { PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import {white, grey800} from 'material-ui/styles/colors';
import {typography} from 'material-ui/styles';

class InfoBox extends React.Component {

  render() {
    const {color, title, value, Icon, action} = this.props;

    const styles = {
      content: {
        padding: '5px 20px 5px 30px',
        marginLeft: 110,
        height: 120
      },
      action: {
        display: 'block',
        margin: '30px 0',
        textAlign: 'right'
      },
      number: {
        display: 'block',
        fontWeight: typography.fontWeightMedium,
        fontSize: 18,
        color: grey800
      },
      text: {
        fontSize: 20,
        fontWeight: typography.fontWeightLight,
        color: grey800
      },
      iconSpan: {
        float: 'left',
        height: 130,
        width: 130,
        textAlign: 'center',
        backgroundColor: color
      },
      icon: {
        height: 68,
        width: 68,
        marginTop: 35,
        maxWidth: '100%'
      }
    };

    return (
      <Paper>
        <div>
          <span style={styles.iconSpan}>
            <Icon color={white}
                  style={styles.icon}
            />
          </span>

          <div style={styles.content}>
            <span style={styles.text}>{title}</span>
            <span style={styles.number}>{value}</span>
            <div style={styles.action}>
              {action}
            </div>
          </div>
        </div>
      </Paper>
      );
  }
}

InfoBox.propTypes = {
  Icon: PropTypes.any, // eslint-disable-line
  color: PropTypes.string,
  title: PropTypes.string,
  value: PropTypes.string,
  action: PropTypes.func
};

export default InfoBox;
