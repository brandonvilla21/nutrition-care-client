import React, { Component, PropTypes } from 'react';
import PageBase from '../../components/PageBase';
import { TextField } from 'material-ui';
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';
import axios from 'axios';
import urlConfig from '../../url-config';

class FoodForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: '',
            carbohydrates: '',
            proteins: '',
            fats: '',
            calories: '',
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
        const url = `${urlConfig.baseUrl}/foods`;
        const config = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}
        };

        axios.post(url, this.state, config)
            .then( response => {
                if (response.status === 200) {
                    this.props.onSubmitted(true);
                    this.clearState();
                }
            })
            .catch(() => this.props.onSubmitted(false));

    }
    
    disableButton() {
        return  this.state.description === '' 
                || this.state.calories === ''
                || this.state.carbohydrates === ''
                || this.state.fats === ''
                || this.state.proteins === '';
    }
    
    clearState() {
        this.setState({
            description: '',
            carbohydrates: '',
            proteins: '',
            fats: '',
            calories: '',
        });
    }

    render() {
        return(
            <PageBase
                title="Registrar un alimento"
                navigation="Alimentos / Registro">
                
                <form onSubmit={this.handleSubmit}>
                <TextField
                    hintText="Descripción"
                    floatingLabelText="Descripción"
                    value={this.state.description}
                    name="description"
                    onChange={this.handleChange}
                    fullWidth={true} />

                <TextField
                    hintText="Carbohidratos"
                    type="number"
                    floatingLabelText="Carbohidratos"
                    value={this.state.carbohydrates}
                    name="carbohydrates"
                    onChange={this.handleChange}
                    fullWidth={true} />

                <TextField
                    hintText="Proteínas"
                    floatingLabelText="Proteínas"
                    type="number"
                    value={this.state.proteins}
                    name="proteins"
                    onChange={this.handleChange}                    
                    fullWidth={true} />

                <TextField
                    hintText="Grasas"
                    floatingLabelText="Grasas"
                    type="number"
                    value={this.state.fats}
                    name="fats"
                    onChange={this.handleChange}                    
                    fullWidth={true} />

                <TextField
                    hintText="Calorías"
                    floatingLabelText="Calorías"
                    type="number"
                    value={this.state.calories}
                    name="calories"
                    onChange={this.handleChange}                    
                    fullWidth={true} />

                <RaisedButton
                    label="Registrar alimento"
                    primary={true}
                    type="submit"
                    disabled={this.disableButton()}
                    style={styles.button} />
                </form>

            </PageBase>
        );
    }
}
FoodForm.propTypes = {
    onSubmitted: PropTypes.func
};
  
const styles = {
    button: {
        margin: 10,
        float: 'right'
    }
};

export default FoodForm;
