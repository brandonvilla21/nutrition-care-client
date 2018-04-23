import React, { Component } from 'react';
import { MuiThemeProvider } from 'material-ui/styles';
import ThemeDefault from '../theme-default';
import CreateProgressPage from './user/UserInfo/CreateProgressPage';
import { Dialog, FlatButton } from 'material-ui';

class FirstProgressPage extends Component {
    constructor() {
        super();
        this.state = {
            open: true,
        };

        this.onClose = this.onClose.bind(this);
    }
    
    onClose() {
        this.setState({ open: false });
    }

    render() {
        const actions = [
            <FlatButton
              key={0}
              label="Aceptar"
              primary={true}
              onClick={this.onClose}
            />
        ];
        return (
            <MuiThemeProvider muiTheme={ThemeDefault}>
                <div style={styles.container}>
                <Dialog
                    title="Bienvenido a Nutrition Care"
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                    onRequestClose={this.onClose}
                >
                    Bienvenido a Nutrition Care. Registra tu primer progreso para iniciar en la plataforma.
                </Dialog>
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