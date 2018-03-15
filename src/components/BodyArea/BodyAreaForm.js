import React, { Component, PropTypes } from 'react';
import PageBase from '../../components/PageBase';
import { TextField, RaisedButton } from 'material-ui';
import axios from 'axios';
import urlConfig from '../../url-config';

class BodyAreaForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.disableButton = this.disableButton.bind(this);
    }

    handleChange( event ) {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        });
    }

    handleSubmit( event ) {
        event.preventDefault();
        const url = `${urlConfig.baseUrl}/bodyareas`;
        const config = urlConfig.axiosConfig;
        config.method = 'POST';

        axios.post(url, this.state, config)
            .then( response => {
                if (response.status === 200) {
                    this.props.onSubmitted(true);
                    this.clearState();
                } else
                    this.props.onSubmitted(false);
            })
            .catch(() => this.props.onSubmitted(false));
    }
        
    disableButton() {
        return  this.state.description === '';
    }
    
    clearState() {
        this.setState({
            description: '',
        });
    }

    render() {
        return(
            <PageBase
                title="Registrar un área del cuerpo"
                navigation="Áreas del cuerpo / Registro">
                
                <form onSubmit={this.handleSubmit}>
                <TextField
                    hintText="Descripción"
                    floatingLabelText="Descripción"
                    value={this.state.description}
                    name="description"
                    onChange={this.handleChange}
                    fullWidth={true} />

                <RaisedButton
                    label="Registrar área del cuerpo"
                    primary={true}
                    type="submit"
                    disabled={this.disableButton()}
                    style={styles.button} />
                </form>

            </PageBase>
        );
    }
}
BodyAreaForm.propTypes = {
    onSubmitted: PropTypes.func
};

const styles = {
    button: {
        margin: 10,
        float: 'right'
    },

};
  
export default BodyAreaForm;