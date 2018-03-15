import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import SessionPage from './SessionPage';
import LoginForm from '../../components/Login/LoginForm';
import { browserHistory } from 'react-router';
import { Divider, Dialog } from 'material-ui';
import { typography } from 'material-ui/styles';
import { grey800 } from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton/FlatButton';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      showModal: false
    };

    this.handleLogIn = this.handleLogIn.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleLogIn( isLoggedIn ) {
    this.setState({ isLoggedIn }, () => {
      if ( isLoggedIn )
        browserHistory.push('/dashboard');
      else
      this.setState({ showModal: true });
    });
  }

  handleClose() {
    this.setState({ showModal: false });
  }

  render() {
    const actions = [
      <FlatButton
          key={0}
          label="Aceptar"
          primary={true}
          onClick={this.handleClose}
      />
    ];
    return (
      <SessionPage>
        <div>
            <Dialog
              title="Credenciales inválidas"
              actions={actions}
              modal={false}
              open={this.state.showModal}
              onRequestClose={this.handleClose}
            >
              No se ha podido iniciar sesión, verifique sus credenciales.
            </Dialog>
          <Paper style={styles.paper}>
              <h3 style={styles.formHeader}>
                Inicio de sesión
              </h3>
              <Divider />
            <LoginForm isLoggedIn={this.handleLogIn} />
          </Paper>
        </div>
      </SessionPage>
      
    );

  }
}

const styles = {
  paper: {
    padding: 20,
    overflow: 'auto'
  },
  formHeader: {
    fontSize: 20,
    fontWeight: typography.fontWeightMedium,
    color: grey800,
    paddingBottom: '12px'
  }
};

export default LoginPage;
