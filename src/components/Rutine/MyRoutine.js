import React, { Component, PropTypes } from 'react';
import SelectDay from '../../components/Rutine/SelectDay';
import moduleName from '../../componets/Routine/RoutineDays';
class MyRoutine extends Component {
    render() {
      return (
        <div>
          <SelectDay
            addDay={this.props.addDay}
          />

          <RoutineDays />
        </div>
      );
    }
}

MyRoutine.propTypes = {
  addDay: PropTypes.func
};

export default MyRoutine;