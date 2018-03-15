import React, { Component } from 'react';
import SessionPage from './SessionPage';
import Paper from 'material-ui/Paper/Paper';
import { typography } from 'material-ui/styles';
import RegisterForm from '../../components/Registration/RegisterForm';
import { Divider, Dialog } from 'material-ui';
import { grey800 } from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton/FlatButton';

class RegisterPage extends Component {
  constructor() {
    super();
    this.state = {
      isSubmitted: false,
    };

    this.isSubmitted = this.isSubmitted.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  handleClose() {
    this.setState({ isSubmitted: false });
  }
  isSubmitted( isSubmitted ) {
    this.setState({ isSubmitted });
  }
  
  render() {
    const actions = [
      <FlatButton
          key={0}
          label="Iniciar sesión"
          primary={true}
          href="/login"
          onClick={this.handleClose}
      />
    ];
    return (
      <SessionPage >
        <div>
          <Dialog
            title="Registro exitoso"
            actions={actions}
            modal={false}
            open={this.state.isSubmitted}
            onRequestClose={this.handleClose}
          >
            Has realizado el registro con éxito, ahora puedes iniciar sesión
          </Dialog>
          <Paper style={styles.paper}>
            <h3 style={styles.formHeader}>
              Registro a la página
            </h3>
            <Divider />
            <RegisterForm isSubmitted={this.isSubmitted}/>
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

export default RegisterPage;