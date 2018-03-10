import React, { Component, PropTypes } from 'react';
import PageBase from '../../components/PageBase';
import { TextField } from 'material-ui';
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';
import FileBase64 from 'react-file-base64';
import { typography } from 'material-ui/styles';
import axios from 'axios';
import urlConfig from '../../url-config';

class ExerciceForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            base64_image: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getFiles = this.getFiles.bind(this);
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
        const url = `${urlConfig.baseUrl}/exercises`;
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

    getFiles( file ) {
        this.setState({ base64_image: file.base64 });
    }
        
    disableButton() {
        return  this.state.name === '' 
                || this.state.base64_image === '';
    }
    
    clearState() {
        this.setState({
            name: '',
            base64_image: ''
        });
    }

    render() {
        return(
            <PageBase
                title="Registrar un ejercicio"
                navigation="Alimentos / Registro">
                
                <form onSubmit={this.handleSubmit}>
                <TextField
                    hintText="Nombre"
                    floatingLabelText="Nombre"
                    value={this.state.name}
                    name="name"
                    onChange={this.handleChange}
                    fullWidth={true} />

                    <h3 style={styles.imageTitle}>Agrega una imagen</h3>
                    <FileBase64 
                        multiple={false}
                        onDone={this.getFiles}
                    />
                <RaisedButton
                    label="Registrar ejercicio"
                    primary={true}
                    type="submit"
                    disabled={this.disableButton()}
                    style={styles.button} />
                </form>

            </PageBase>
        );
    }
}
ExerciceForm.propTypes = {
    onSubmitted: PropTypes.func
};

const styles = {
    button: {
        margin: 10,
        float: 'right'
    },
    imageTitle: {
        fontSize: 20,
        fontWeight: typography.fontWeightLight,
        marginBottom: 20,
        marginTop: 15
    }

};
  
export default ExerciceForm;