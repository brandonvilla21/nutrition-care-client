import React, { Component, PropTypes } from 'react';
import { MuiThemeProvider } from 'material-ui/styles';
import ThemeDefault from '../theme-default';
import CreateProgressPage from './user/UserInfo/CreateProgressPage';

class FirstProgressPage extends Component {
    constructor() {
        super();
        
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={ThemeDefault}>
                <div style={styles.container}>
                    <CreateProgressPage />
                </div>
            </MuiThemeProvider>
        );
    }

}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
};

export default FirstProgressPage;