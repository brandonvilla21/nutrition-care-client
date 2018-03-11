import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import { typography } from 'material-ui/styles';

class FatPercentage extends Component {
    constructor(props) {
        super(props);
        /**
         * Deurenberg formula
         * 
         * (1.2 * 22.74) + ( 0.23 * 21) - (10.8 *1) - 5.4    
         * NOTE: 1.2 - 0.23 - 10.8 - 5.4 = Are constants
         */
        this.state = {
            fatPercentage: 0,
            gender: 0,
            bmi: props.weight * (Math.pow(props.height, 2)),
            age: '',
        };
    }
    render() {
        return (
            <div>
                <p style={styles.indications}>
                    Ingrese su porcentaje de grasa, si no tiene conocimiento de cual
                    es, puede utilizar la <strong>calculadora</strong> para obtener una aproximación
                </p>
                <div style={styles.container}>
                    <TextField
                        hintText="% de grasa"
                        floatingLabelText="% de grasa"
                        type="number"                
                        name="fatPercentage"
                        value={this.props.fatPercentage}
                        onChange={this.props.onChange}
                    />

                    {/* <Calculator 
                        bmi={this.state.bmi}
                        age={this.state.age}
                    /> */}
                </div>
    
            </div>
        );
    }
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
    },
    indications: {
        fontSize: 16,
        fontWeight: typography.fontWeightLight,
        marginBottom: 20
    }
};
FatPercentage.propTypes = {
    height: PropTypes.string,
    weight: PropTypes.string,
    fatPercentage: PropTypes.string,
    onChange: PropTypes.func
};

export default FatPercentage;