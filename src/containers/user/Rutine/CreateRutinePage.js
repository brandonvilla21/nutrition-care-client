import React, { Component } from 'react';
import TabsRutine from '../../../components/Rutine/TabsRutine';

class CreateRutinePage extends Component {
    constructor() {
        super();
        this.state = {
            description: '',
            days: []
        };
        this.handleInput = this.handleInput.bind(this);
    }
    handleInput( event ) {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        });
    }
    
    addDay( day ) {
        const { days } = this.state;
        this.setState({
            days: [...days, day]
        });
    }
    render() {
      return (
        <div>
            <TabsRutine
                addDay={this.addDay}
                description={this.state.description}
                handleInput={this.handleInput} />
        </div>
      );
    }
}
export default CreateRutinePage;