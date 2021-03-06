import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { grey500 } from 'material-ui/styles/colors';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import TextField from 'material-ui/TextField';
import urlConfig from '../../url-config';
import Axios from 'axios';
import jwtDecode from 'jwt-decode';
import { Link } from 'react-router';

class LoginForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
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
        const url = `${urlConfig.baseUrl}/auth/login`;
        const config = urlConfig.axiosConfig;
        config.method = 'POST';
        Axios.post(url, this.state, config)
            .then( res => {
                if ( res.status == 200 ) {
                    this.setLoginLocalStorage(res.data);

                    const user_id = jwtDecode(res.data.access_token).user_id;
                    localStorage.setItem('user_id', JSON.stringify(user_id));
                
                    this.props.isLoggedIn(true);
                } else
                    this.props.isLoggedIn(false);
            })
            .catch( err => { throw err.response.data || err; } );
    }

    setLoginLocalStorage( data ) {
        // Save in config-url token to prevent use prev token
        const auth = "Bearer " + data.access_token;
        urlConfig.axiosConfig.headers.Authorization = auth;

        localStorage.setItem('access_token', data.access_token);
        const decode = jwtDecode(data.access_token);
        const user = {
            id: decode.user_id,
            name: decode.user_name,
            email: decode.user_email
        };
        localStorage.setItem('user', JSON.stringify(user));
        
        this.theHack( user );
    }

    theHack( user ) {
        if ( user.email === 'admin@admin.com' )
            localStorage.setItem('admin', 'admin');
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <TextField
                hintText="E-mail"
                floatingLabelText="E-mail"
                name="email"
                value={this.state.email}
                onChange={this.handleInputChange}
                fullWidth={true}
                />
                <TextField
                hintText="Password"
                floatingLabelText="Password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChange}
                fullWidth={true}
                type="password"
                />

                <div>
                <RaisedButton
                    label="Iniciar Sesión"
                    primary={true}
                    type="submit"
                    style={styles.loginBtn}/>
                
                <FlatButton
                    label="Registrarme"
                    containerElement={<Link to="/register" />}
                    style={styles.flatButton}
                    icon={<PersonAdd />} />
                </div>
            </form>
        );

    }
}

const styles = {
  flatButton: {
    color: grey500,
    float: 'left'
  },
  loginBtn: {
    float: 'right'
  }
};

LoginForm.propTypes = {
    isLoggedIn: PropTypes.func 
};

export default LoginForm;
