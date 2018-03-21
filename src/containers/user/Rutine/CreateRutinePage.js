import React, { Component } from 'react';
import TabsRoutine from '../../../components/Rutine/TabsRoutine';
import PageBase from '../../../components/PageBase';

class CreateRutinePage extends Component {
    constructor() {
        super();
        this.state = {
            description: '',
            days: []
        };
        this.handleInput = this.handleInput.bind(this);
        this.addDay = this.addDay.bind(this);
    }

    handleInput( event ) {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        });
    }

    addDay( event, index, value ) {
        const { days } = this.state;
        this.setState({
            days: [...days, value]
        });
    }

    render() {
      return (
        <div>
            <PageBase
                navigation="Aplicación / Crear Rutina">

                <TabsRoutine
                    addDay={this.addDay}
                    description={this.state.description}
                    handleInput={this.handleInput} />

            </PageBase>
        </div>
      );
    }
}
export default CreateRutinePage;