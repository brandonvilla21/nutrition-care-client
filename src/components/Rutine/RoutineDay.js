import React, { Component, PropTypes } from 'react';
import Collapsible from 'react-collapsible';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { blue500 } from 'material-ui/styles/colors';
import ExerciseDialog from './ExerciseDialog';

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

    render() {
      return (
        <div>
            <ExerciseDialog
                open={this.state.open}
                handleClose={this.handleClose}
                onResponse={this.handleResponse}/>
            
            <Collapsible style={styles.collapsible} trigger={this.props.day.name}>
                <p>Well it worked</p>
                <button onClick={this.deleteDay}>Eliminar día </button>
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
    }
};

RoutineDay.propTypes = {
    day: PropTypes.object,
    removeDay: PropTypes.func,
    addExerciseToDay: PropTypes.func,
};

export default RoutineDay;