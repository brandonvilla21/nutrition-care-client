import React, { PropTypes } from 'react';
import { typography } from 'material-ui/styles';
import { RaisedButton } from 'material-ui';

const RoutineResume = (props) => {
    return (
        <div>
            <p style={styles.message}>
                Rutina completada, para guardar la información
                acerca de la rutina, por favor, de click en <strong> Guardar </strong>.
            </p>
            <div style={styles.raisedButtonContainer}>
                <RaisedButton
                        label="Guardar"
                        primary={true}
                        onClick={props.onSubmitRoutine} />
            </div>
            <RaisedButton
                    label="Regresar"
                    secondary={true}
                    style={styles.raisedButtonPrev}
                    value={0}
                    onClick={props.prevIndex} />
        </div>
    );
};

const styles = {
    message: {
        textAlign: 'center',
        fontSize: '18px',
        fontWeight: typography.fontWeightLight,
    },
    raisedButtonContainer: {
        textAlign: 'center'
    },
    raisedButtonPrev: {
        float: 'left'
    },

};

RoutineResume.propTypes = {
    days: PropTypes.array,
    prevIndex: PropTypes.func,
    onSubmitRoutine: PropTypes.func,
};

export default RoutineResume;