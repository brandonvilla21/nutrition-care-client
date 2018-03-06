import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import { Divider } from 'material-ui';
import {typography} from 'material-ui/styles';

const HeightWeight = (props) => {
    let { height, weight, onChange } = props;

    return (
        <div>
            <p style={styles.indications}>
                Ingrese su estatura en centímetros y su peso en kilogramos.
                Ejemplo: Estatura: <strong>170</strong>, Peso: <strong>70</strong>
            </p>
            <div style={styles.container}>
                <TextField
                    
                    hintText="Estatura (cm)"
                    floatingLabelText="Estatura (cm)"
                    type="number"                
                    name="height"
                    value={height}
                    onChange={onChange}
                />
                <TextField
                    
                    hintText="Peso (kg)"
                    floatingLabelText="Peso (kg)"
                    type="number"
                    name="weight"
                    value={weight}
                    onChange={onChange}
                />
            </div>

        </div>
    );
};
const styles = {
    container: {
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap'
    },
    // textFiled: {
    //     marginLeft: '8px',
    //     marginRight: '8px'
    // },
    indications: {
        fontSize: 16,
        fontWeight: typography.fontWeightLight,
        marginBottom: 20
    },
}
HeightWeight.propTypes = {
    onChange: PropTypes.func,
    height: PropTypes.string,
    weight: PropTypes.string
};

export default HeightWeight;