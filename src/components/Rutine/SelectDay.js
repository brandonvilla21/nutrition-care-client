import React, { Component, PropTypes } from 'react';
import { SelectField, MenuItem } from 'material-ui';

class SelectDay extends Component {
    constructor() {
        super();
        this.state = {
            value: 0,
            days: [...days]
        };

        this.handleChange = this.handleChange.bind(this);
        this.menuItems = this.menuItems.bind(this);
        this.updateSelectDays = this.updateSelectDays.bind(this);
    }

    componentDidUpdate() {
        const { removedDay } = this.props;
        if ( removedDay ) {
            this.updateSelectDays();
        }
    }

    menuItems() {
      return this.state.days.map( day => (
        !day.selected
            ? <MenuItem
                key={day.id}
                insetChildren={true}
                value={day}
                primaryText={day.name}
                />
            : null
      ));
    }

    handleChange(event, index, value) {
        this.setState({ value }, () => {
            const index = this.state.days.indexOf(value);
            days[index].selected = true;
            this.props.selectedDays(this.state.days.filter( day => day.selected));
        });
    }

    updateSelectDays() {
        const { removedDay } = this.props;
        const { days } = this.state;

        // Get the new day to add to <SelectField />
        const addDayToSelect = days.filter( day => day.id === removedDay.id );
        // Get the days that are currently in <SelectField />
        const restOfDays = days.filter(day => day.id !== removedDay.id );
        
        // Change the selected property to false, because now this day has not been selected
        addDayToSelect[0].selected = false;
        
        // Merge both elements in one array
        const sortedDays = [...restOfDays, addDayToSelect[0]];
        // Sorts the elements by its id
        sortedDays.sort((a,b) => a.id - b.id);
        
        // Update the state with the new days
        this.setState({ days: [...sortedDays]});
        
        this.props.clearRemovedDay();
    }
    render() {
        return (
            <div>
                <SelectField
                    floatingLabelText="Seleccione un día"
                    onChange={this.handleChange}
                    style={styles.selectField}
                >
                    {this.menuItems()}
                </SelectField>
            </div>
        );
    }
}

const days = [
    { id: 0, name: 'Lunes', selected: false },
    { id: 1, name: 'Martes', selected: false },
    { id: 2, name: 'Miércoles', selected: false },
    { id: 3, name: 'Jueves', selected: false },
    { id: 4, name: 'Viernes', selected: false },
    { id: 5, name: 'Sábado', selected: false },
    { id: 6, name: 'Domingo', selected: false },
];

const styles = {
    selectField: {
        width: '100%'
    }
};

SelectDay.propTypes = {
    days: PropTypes.array,
    selectedDays: PropTypes.func,
    removedDay: PropTypes.object,
    clearRemovedDay: PropTypes.func
};

export default SelectDay;