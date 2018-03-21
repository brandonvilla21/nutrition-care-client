import React, { Component } from 'react';
import { SelectField, MenuItem } from 'material-ui';

class SelectDay extends Component {
    constructor() {
        super();
        this.state = {
            value: 0
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event, index, value) {
        this.setState({ value });
    }

    // menuItems(values) {
    //   return names.map((name) => (
    //     <MenuItem
    //       key={name}
    //       insetChildren={true}
    //       checked={values && values.indexOf(name) > -1}
    //       value={name}
    //       primaryText={name}
    //     />
    //   ));
    // }

    render() {
        const { value } = this.state;
        return (
            <div>
                <SelectField
                    floatingLabelText="Seleccione un día"
                    value={value}
                    onChange={this.handleChange}
                >
                    <MenuItem value={1} primaryText="Never" />
                    <MenuItem value={2} primaryText="Every Night" />
                    <MenuItem value={3} primaryText="Weeknights" />
                    <MenuItem value={4} primaryText="Weekends" />
                    <MenuItem value={5} primaryText="Weekly" />
                </SelectField>
            </div>
        );
    }
}

export default SelectDay;