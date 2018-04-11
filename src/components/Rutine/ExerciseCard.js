import React, { Component, PropTypes } from 'react';
import {
    Card,
    CardHeader,
    CardMedia,
    CardTitle,
    CardText,
    TextField } from 'material-ui';
import urlConfig from '../../url-config';
import typography from 'material-ui/styles/typography';

class ExerciseCard extends Component {
    constructor(props){
        super(props);
    }

    render() {
        const { day, exercise } = this.props
        const { srcImage, name } = exercise;
        const urlImage = `${urlConfig.imageDir}/${srcImage}`;
      return (
        <div>
           <Card style={styles.cardContainer}>
            <div style={styles.card}>
                <div>
                    <CardMedia>
                        <img src={urlImage} alt={urlImage} />
                    </CardMedia>
                </div>
                <div>
                    <CardText>
                        <div>
                            <div style={styles.title}>
                                Ingrese la información requerida
                            </div>
                            <TextField
                                hintText="Ingresa un nombre"
                                floatingLabelText="Nombre"
                                disabled={true}
                                value={name}
                            />
                            <TextField
                                hintText="Ingresa una descripción"
                                floatingLabelText="Descripción"
                                name="description"
                                value={exercise.description}
                                onChange={(event) =>
                                    this.props.onChangeField( event, day, exercise )}
                            />
                            <TextField
                                hintText="Número de series"
                                floatingLabelText="Series"
                                name="series"
                                value={exercise.series}
                                onChange={(event) =>
                                    this.props.onChangeField( event, day, exercise )}
                            />
                            <TextField
                                hintText="Número de repeticiones"
                                floatingLabelText="Repeticiones"
                                name="reps"
                                value={exercise.reps}
                                onChange={(event) =>
                                    this.props.onChangeField( event, day, exercise )}
                            />
                        </div>
                    </CardText>
                </div>
            </div>
            </Card>
        </div>
      )
    }
}
const styles = {
    card: {
        display: 'flex',
        
    },
    cardContainer : {
        padding: '1em'
    },
    title:  {
        fontWeight: typography.fontWeightLight,
        fontSize: '18px'
    }
};

ExerciseCard.propTypes = {
    onChangeField: PropTypes.func
}
export default ExerciseCard;

