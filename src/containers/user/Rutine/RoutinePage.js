import React, { Component, PropTypes } from 'react';
import urlConfig from '../../../url-config';
import axios from 'axios';
import PageBase from '../../../components/PageBase';
import typography from 'material-ui/styles/typography';
import { Divider } from 'material-ui';

class RoutinePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            routine: {},
            days: [
                {exercises: [] },
                {exercises: [] },
                {exercises: [] },
                {exercises: [] },
                {exercises: [] },
                {exercises: [] },
                {exercises: [] },
            ]
        };

        this.fetchRoutine = this.fetchRoutine.bind(this);
        this.formatRoutine = this.formatRoutine.bind(this);
        this.renderRoutine = this.renderRoutine.bind(this);
    }

    componentWillMount() {
        this.fetchRoutine();
    }

    fetchRoutine() {
        const { id } = this.props.params;
        const url = `${urlConfig.baseUrl}/routines/${id}`;
        axios.get(url)
            .then( res =>
                this.setState({routine: res.data.data},
                    () => this.formatRoutine()))
            .catch( err => err);
    }
    formatRoutine() {
        const { routine_detail } = this.state.routine;
        const { days } = this.state;
        routine_detail.forEach( detail => {
            switch ( detail.day_id ) {
                case LUNES:
                    days[0].exercises.push({...detail});
                    break;
                case MARTES:
                    days[1].exercises.push({...detail});
                    break;
                case MIERCOLES:
                    days[2].exercises.push({...detail});
                    break;
                case JUEVES:
                    days[3].exercises.push({...detail});
                    break;
                case VIERNES:
                    days[4].exercises.push({...detail});
                    break;
                case SABADO:
                    days[5].exercises.push({...detail});
                    break;
                case DOMINGO:
                    days[6].exercises.push({...detail});
                    break;
            }
        });
    }

    renderRoutine() {
        const { days } = this.state;
        return days.map( day =>
            <p key={day.id} >{day.description}</p>
        );

    }
    render() {
        const { routine } = this.state;
        return (
            <div>
                <PageBase
                navigation={`Application / ${routine.description}`}
                title="Mi rutina de entrenamiento"
                >
                    <div>
                        <div style={styles.typo}>
                            <p><strong> Información: </strong></p>
                            <div style={styles.info}>
                                Descripción: {routine.description} <br />
                                {/* Fecha de creación: <Moment format="DD/MM/YYYY">{routine.created_at.date}</Moment> <br /> */}
                                {/* Última actualización: <Moment format="DD/MM/YYYY"> {routine.updated_at.date} </Moment><br /> */}
                            </div>
                            <div>
                                <p><strong>Detalles sobre mi entrenamiento</strong></p>
                                {
                                    
                                    this.state.days.map( (day) =>
                                        day.exercises.map( exercise =>
                                            <div style={styles.exerciseContainer} key={exercise.id} >
                                                <div>
                                                    <img style={styles.image} src={`${urlConfig.imageDir}/${exercise.exercise.srcImage}`} />
                                                </div>
                                                <div>
                                                    <div><strong>{exercise.day.description}</strong></div>
                                                    <div>Ejercicio: {exercise.exercise.name}</div>
                                                    <div>Descripción: {exercise.description}</div>
                                                    <div>Series: {exercise.series}</div>
                                                    <div>Repeticiones: {exercise.reps}</div>
                                                </div>
                                                <Divider />
                                            </div>
                                        )
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </PageBase>
            </div>
        );
    }
}

const styles = {
    info: {
        fontSize: '16px',
        fontWeight: typography.fontWeightLight,
    },
    image: {
        width: '250px',
        marginRight: '10px'
    },
    exerciseContainer : {
        display: 'flex'
    }
};

RoutinePage.propTypes = {
    params: PropTypes.obj,
};

const LUNES = 0;
const MARTES = 1;
const MIERCOLES = 2;
const JUEVES = 3;
const VIERNES = 4;
const SABADO = 5;
const DOMINGO = 6;

export default RoutinePage;