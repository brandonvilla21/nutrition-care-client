import React, { Component, PropTypes } from 'react';
import Collapsible from 'react-collapsible';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Delete from 'material-ui/svg-icons/action/delete';
import { blue500 } from 'material-ui/styles/colors';
import ExerciseDialog from './ExerciseDialog';
import ExerciseCard from './ExerciseCard';
import { RaisedButton, FontIcon } from 'material-ui';

class RoutineDay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.deleteDay = this.deleteDay.bind(this);
        this.handleResponse = this.handleResponse.bind(this);
        this.renderExercises = this.renderExercises.bind(this);
        
    }

    handleOpen() {
        this.setState({open: true});
    }

    handleClose() {
        this.setState({open: false});
    }

    handleResponse( exercise ) {
        this.props.addExerciseToDay(this.props.day, exercise);
        this.setState({open: false});
    }
    
    deleteDay() {
        this.props.removeDay(this.props.day);
    }
    renderExercises() {
        if (this.props.day.exercises) {
            return this.props.day.exercises.map( exercise => 
                <ExerciseCard
                    key={exercise.id}
                    exercise={exercise}
                    day={this.props.day}
                    onChangeField={this.props.onChangeField} />
            )
        } else
            return null;
    }
    
    render() {
      return (
        <div>
            <ExerciseDialog
                open={this.state.open}
                handleClose={this.handleClose}
                onResponse={this.handleResponse}/>
            
            <Collapsible style={styles.collapsible} trigger={this.props.day.name}>
                {this.renderExercises()}
                <RaisedButton
                    secondary={true}
                    icon={<Delete />}
                    style={styles.raisedButton}
                    onClick={this.deleteDay}
                    label="Eliminar día"
                />
                <FloatingActionButton 
                    mini={true} 
                    style={styles.floatButton}
                    backgroundColor={blue500}
                    onClick={this.handleOpen}>
                    <ContentAdd />
                </FloatingActionButton>
            </Collapsible>      
        </div>
      );
    }
}
const styles = {
    collapsible: {
        backgroundColor: 'blue'
    },
    floatButton: {
        marginRight: 10,
        marginBottom: 10,
        float: 'right'
    },
    raisedButton: {
        margin: 12,
    }
};

RoutineDay.propTypes = {
    day: PropTypes.object,
    removeDay: PropTypes.func,
    addExerciseToDay: PropTypes.func,
    onChangeField: PropTypes.func,
};

export default RoutineDay;