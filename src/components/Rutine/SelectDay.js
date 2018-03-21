import React, { Component, PropTypes } from 'react';
import { SelectField, MenuItem } from 'material-ui';

class SelectDay extends Component {
    constructor() {
        super();
        this.state = {
            value: 0
        };

        this.handleChange = this.handleChange.bind(this);
        this.menuItems = this.menuItems.bind(this);
    }

    handleChange(event, index, value) {
        this.setState({ value }, () => this.props.addDay(event, index, value));
    }

    menuItems() {
      return days.map( day => (
        <MenuItem
          key={day}
          insetChildren={true}
          value={day}
          primaryText={day}
        />
      ));
    }

    render() {
        const { value } = this.state;
        return (
            <div>
                <SelectField
                    floatingLabelText="Seleccione un día"
                    value={value}
                    onChange={this.handleChange}
                >
                    {this.menuItems()}
                </SelectField>
            </div>
        );
    }
}

const days = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
];

SelectDay.propTypes = {
    addDay: PropTypes.func
};

export default SelectDay;