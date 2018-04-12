import React, { Component } from 'react';
import TabsRoutine from '../../../components/Rutine/TabsRoutine';
import PageBase from '../../../components/PageBase';
import urlConfig from '../../../url-config';
import axios from 'axios';

class CreateRutinePage extends Component {
    constructor() {
        super();
        this.state = {
            description: '',
            days: [],
            removedDay: null
        };
        this.handleInput = this.handleInput.bind(this);
        this.selectedDays = this.selectedDays.bind(this);
        this.removeDay = this.removeDay.bind(this);
        this.clearRemovedDay = this.clearRemovedDay.bind(this);
        this.addExerciseToDay = this.addExerciseToDay.bind(this);
        this.onChangeField = this.onChangeField.bind(this);
        this.onSubmitRoutine = this.onSubmitRoutine.bind(this);
    }

    handleInput( event ) {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        });
    }
    
    selectedDays( days ) {
        this.setState({
            days: [...days]
        });
    }

    removeDay( day ) {
        const { days } = this.state;
        const newDays = days.filter( element => element.id !== day.id );
        this.setState({
            days: [...newDays]
        }, () => this.removeExercisesFromDay( day ) );

    }

    removeExercisesFromDay( day ) {
        if( day.exercises )
            delete day.exercises;
        this.setState({ removedDay: day});
    }

    clearRemovedDay() {
        this.setState({ removedDay: null });
    }

    addExerciseToDay( day, exercise ) {
        const { days } = this.state;
        const index = days.indexOf( day );
        this.pushExercise(days[index], exercise);

    }

    pushExercise( day, exercise ) {
        return new Promise ((resolve, reject) => {
            const prop = 'exercises';
            // If there's not such property in object,
            // it will be created as an array
            if ( !(prop in day) )
                day[prop] = [];
                
            // Verify if the exercise has not
            // been added to this array before
            if ( day[prop] && day[prop].filter(ex => ex.id === exercise.id).length > 0 ) {
                reject({ message: 'Este ejercicio ya se encuentra agregado en este día'});
            } else {
                day[prop].push(exercise);
                resolve(day);
            }
            
        });
    }

    onChangeField(event, day, exercise ) {
        const { name, value } = event.target;
        const { days } = this.state;
        let index = days.indexOf(day);
        const dayToChange = days[index];
        index = dayToChange.exercises.indexOf(exercise);
        const exerciseToChange = dayToChange.exercises[index];

        exerciseToChange[name] = value;
    }

    onSubmitRoutine() {
        const { description, days } = this.state;
        const routineDetail = this.generateDetails(days);
        const data = {
            description,
            routineDetail,
        };
        console.log(data);
        const url = `${urlConfig.baseUrl}/routines`;
        const config = urlConfig.axiosConfig;
        config.method = 'POST';
        console.log(config);
        axios.post(url, data, config)
            .then( response => {
                if (response.status === 200) {
                    console.log('Submited!')
                } else
                    console.log('Not')
            })
            .catch((err) => console.log('ERROR: ', err));


    }
    
    generateDetails(days) {
        let luls;
        days.forEach( day =>
            luls = day.exercises.map( exercise => {
                return Object.assign({}, {
                    day_id: day.id,
                    exercise_id: exercise.id,
                    series: exercise.series || '',
                    reps: exercise.reps || '',
                })
            })
        )
        return luls;
    }

    render() {
      return (
        <div>
            <PageBase
                navigation="Aplicación / Crear Rutina">

                <TabsRoutine
                    selectedDays={this.selectedDays}
                    days={this.state.days}
                    removedDay={this.state.removedDay}
                    removeDay={this.removeDay}
                    clearRemovedDay={this.clearRemovedDay}
                    description={this.state.description}
                    handleInput={this.handleInput}
                    addExerciseToDay={this.addExerciseToDay}
                    onChangeField={this.onChangeField} 
                    onSubmitRoutine={this.onSubmitRoutine} />
            </PageBase>
        </div>
      );
    }
}

export default CreateRutinePage;