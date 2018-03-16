import React, { PropTypes } from 'react';
import { MuiThemeProvider } from 'material-ui/styles';
import ThemeDefault from '../../theme-default';

const SessionPage = (props) => {
    const styles = {
        loginContainer: {
          minWidth: 320,
          maxWidth: 400,
          height: 'auto',
          position: 'absolute',
          top: '20%',
          left: 0,
          right: 0,
          margin: 'auto'
        }
    };
    
    return (
        <MuiThemeProvider muiTheme={ThemeDefault}>
            <div style={styles.loginContainer}>
                {props.children}
            </div>
        </MuiThemeProvider>
    );
};

SessionPage.propTypes = {
    children: PropTypes.node.isRequired
};

export default SessionPage;