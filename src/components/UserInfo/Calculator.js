import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import { typography } from 'material-ui/styles';
import { RadioButtonGroup, RadioButton } from 'material-ui';
import FlatButton from 'material-ui/FlatButton/FlatButton';

class Calculator extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isCalculated: false
        };

        this.renderContent = this.renderContent.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.setState({ isCalculated: true });
    }
    renderContent() {
        if ( !this.state.isCalculated ) {
            return (
                <div style={styles.container}>
                    <TextField
                        disabled={true}
                        hintText="Indice de Masa Corporal (IMC)"
                        floatingLabelText="Indice de Masa Corporal (IMC)"
                        value={this.props.bmi}
                    />
    
                    <TextField
                        hintText="Edad"
                        floatingLabelText="Edad"
                        type="number"
                        value={this.props.age}
                    />
    
                    <p style={styles.indications}>
                        Seleccione un género
                    </p>
                    <RadioButtonGroup  name="gender" defaultSelected={1}>
                        <RadioButton
                            value={1}
                            label="Hombre"
                            name="Hombre"
                            style={styles.radioButton}
                        />
                        <RadioButton
                            value={0}
                            label="Mujer"
                            name="Mujer"
                            style={styles.radioButton}
                        />
                    </RadioButtonGroup>
    
                    <FlatButton
                        label="Calcular % de grasa"
                        primary={true}
                        onClick={this.handleClick}
                    />
                </div>
            );
        } else {
            // Show the fat percentage
            return <h1>Calculated!</h1>;
        }
    }

    render() {
        return this.renderContent();
    }
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column'
    },
    radioHeader: {
        fontSize: 12,
        fontWeight: typography.fontWeightLight,
        marginBottom: 15,
    },
    radioButton: {
        marginBottom: 16
    },
};
Calculator.propTypes = {
    bmi: PropTypes.number,
    age: PropTypes.string
};

export default Calculator;