import React, { Component, PropTypes } from 'react';
import { TextField, RaisedButton, FlatButton } from 'material-ui';
import Person from 'material-ui/svg-icons/social/person';
import { grey500 } from 'material-ui/styles/colors';
import urlConfig from '../../url-config';
import Axios from 'axios';

class RegisterForm extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
          };
      
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleInputChange( event ) {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        });
    }

    handleSubmit( event ) {
        event.preventDefault();
        const url = `${urlConfig.baseUrl}/auth/register`;
        Axios.post(url, this.state, urlConfig.axiosConfig)
            .then( res => {
                if ( res.status == 200 )
                    this.props.isSubmitted(true);
                else
                    this.props.isSubmitted(false);
            })
            .catch( () => this.props.isSubmitted(false));
    }
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
              <TextField
                hintText="Nombre"
                floatingLabelText="Nombre"
                fullWidth={true}
                name="name"
                value={this.state.name}
                onChange={this.handleInputChange}
              />
              <TextField
                hintText="Email"
                floatingLabelText="Email"
                type="email"
                fullWidth={true}
                name="email"
                value={this.state.email}
                onChange={this.handleInputChange}
              />
              <TextField
                hintText="Password"
                floatingLabelText="Password"
                fullWidth={true}
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChange}
              />
              <TextField
                hintText="Confirmar password"
                floatingLabelText="Confirmar password"
                fullWidth={true}
                type="password"
                name="confirmPassword"
                value={this.state.confirmPassword}
                onChange={this.handleInputChange}
              />
              <div>
                <RaisedButton
                  label="Registrarme"
                  primary={true}
                  type="submit"
                  style={styles.loginBtn}/>

                <div style={styles.buttonsDiv}>
                  <FlatButton
                    label="Iniciar sesión"
                    href="/login"
                    style={styles.flatButton}
                    icon={<Person/>} />
                </div>
              </div>

        </form>
      );
    }
}
const styles = {
  loginBtn: {
    float: 'right'
  },
  buttonsDiv: {
    float: 'left'
  },
  flatButton: {
    color: grey500
  }
};

RegisterForm.propTypes = {
    isSubmitted: PropTypes.func 
};

export default RegisterForm;
