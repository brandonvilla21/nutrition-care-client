import React, { Component, PropTypes } from 'react';
import SelectDay from '../../components/Rutine/SelectDay';

class MyRoutine extends Component {
    render() {
      return (
        <div>
          <SelectDay
            addDay={this.props.addDay}
          />
        </div>
      );
    }
}

MyRoutine.propTypes = {
  addDay: PropTypes.func
};

export default MyRoutine;