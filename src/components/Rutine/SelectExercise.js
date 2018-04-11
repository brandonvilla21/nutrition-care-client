import React, { Component, PropTypes } from 'react';
import { SelectField, MenuItem } from 'material-ui';

class SelectExercise extends Component {
    constructor(props) {
        super(props);

    }

    render() {
      return (
        <div>
          <SelectField
            value={this.props.value}
            onChange={this.props.onChange}
          >
            {
                this.props.bodyAreas.map( bodyArea => 
                    <MenuItem key={bodyArea.id} value={bodyArea.id} primaryText={bodyArea.description}/>
                )
            }
          </SelectField>
        </div>
      );
    }
}

SelectExercise.propTypes = {
    bodyAreas: PropTypes.array,
    value: PropTypes.number,
    onChange: PropTypes.func,
};

export default SelectExercise;