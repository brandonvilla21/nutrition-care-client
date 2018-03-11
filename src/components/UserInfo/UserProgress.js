import React, { Component, PropTypes } from 'react';
import { typography } from 'material-ui/styles';
import { Divider } from 'material-ui';
import ProgressInfo from './ProgressInfo';

class UserProgress extends Component {
    constructor(props) {
        super(props);
        
    }

    render() {
        const { weight, height, date, fatPercentage, fatKg, muscleKg } = this.props;
      return (
        <div>
            <p style={styles.header}>
                Progreso inicial
            </p>
            <p>
                Dada su estatura de {height} centímetros, un peso de {weight} kilogramos y con un porcentaje
                de grasa de {fatPercentage}% calculado, se determina que usted el día de hoy en relación a la información
                obtenida, cuenta con {fatKg} kilogramos de grasa y {muscleKg} kilogramos de masa magra.
            </p>
            <p>
                A continucación se muestra de su progreso inicial que sera registrado para ser comparado
                con el progreso de los días proximos.
            </p>
            <Divider />
            <ProgressInfo
                infoName="Fecha"
                infoResult={date}
            />

            <ProgressInfo
                infoName="Peso (kg)"
                infoResult={weight}
            />

            <ProgressInfo
                infoName="% de grasa"
                infoResult={fatPercentage}
            />
            <ProgressInfo
                infoName="Grasa corporal (kg)"
                infoResult={fatKg}
            />

            <ProgressInfo
                infoName="Masa muscular (kg)"
                infoResult={muscleKg}
            />
        </div>
      );
    }
}
const styles = {
    container: {
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap'
    },
    header: {
        fontSize: 20,
        fontWeight: typography.fontWeightLight,
        marginBottom: 20
    }
};

UserProgress.propTypes = {
    date: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    weight: PropTypes.string,
    height: PropTypes.string,
    fatPercentage: PropTypes.string,
    fatKg: PropTypes.string,
    muscleKg: PropTypes.string
};

export default UserProgress;