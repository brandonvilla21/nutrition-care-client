import React, { Component } from 'react';
import PageBase from '../../components/PageBase';
import { TextField } from 'material-ui';
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';
import FileUpload from '../FileUpload';

class ExerciceForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            image: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
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
        // Send the information to API
    }

    handleUpload( event ) {
        /**
         * For upload images:
         *  https://gist.github.com/AshikNesin/e44b1950f6a24cfcd85330ffc1713513
         */
        this.setState({ image: event.target.files[0] });
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
                
                <FileUpload
                    title="Agrega una imagen"
                    onUpload={this.handleUpload} />

                <RaisedButton
                    label="Registrar ejercicio"
                    primary={true}
                    type="submit"
                    style={styles.button} />
                </form>

            </PageBase>
        );
    }
}

export default ExerciceForm;

const styles = {
    button: {
        margin: 10,
        float: 'right'
    },

};