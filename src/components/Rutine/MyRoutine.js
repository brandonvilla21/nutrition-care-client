import React, { Component, PropTypes } from 'react';
import SelectDay from '../../components/Rutine/SelectDay';
import RoutineDay from './RoutineDay';

class MyRoutine extends Component {
  constructor(props) {
    super(props);
    
  }

  render() {
      return (
        <div>
          <SelectDay
            days={this.props.days}
            selectedDays={this.props.selectedDays}
            removedDay={this.props.removedDay}
            clearRemovedDay={this.props.clearRemovedDay}
          />
          {this.props.days.map((day, index) =>
              <RoutineDay
                key={index}
                addExerciseToDay={this.props.addExerciseToDay}
                removeDay={this.props.removeDay}
                day={day}
                onChangeField={this.props.onChangeField} />)}
        </div>
      );
  }
}

MyRoutine.propTypes = {
  selectedDays: PropTypes.func,
  days: PropTypes.array,
  removeDay: PropTypes.func,
  removedDay: PropTypes.object,
  clearRemovedDay: PropTypes.func,
  addExerciseToDay: PropTypes.func,
  onChangeField: PropTypes.func,
};

export default MyRoutine;