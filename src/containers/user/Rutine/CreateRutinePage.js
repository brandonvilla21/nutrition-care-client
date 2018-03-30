import React, { Component } from 'react';
import TabsRoutine from '../../../components/Rutine/TabsRoutine';
import PageBase from '../../../components/PageBase';

class CreateRutinePage extends Component {
    constructor() {
        super();
        this.state = {
            description: '',
            days: [],
            removedDay: null
        };
        this.handleInput = this.handleInput.bind(this);
        this.selectedDays = this.selectedDays.bind(this);
        this.removeDay = this.removeDay.bind(this);
        this.clearRemovedDay = this.clearRemovedDay.bind(this);
    }

    handleInput( event ) {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        });
    }
    
    selectedDays( days ) {
        this.setState({
            days: [...days]
        });
    }

    removeDay( day ) {
        const { days } = this.state;
        const newDays = days.filter( element => element.id !== day.id );
        this.setState({
            days: [...newDays]
        });
        this.setState({ removedDay: day});

    }

    clearRemovedDay() {
        this.setState({ removedDay: null });
    }

    render() {
      return (
        <div>
            <PageBase
                navigation="Aplicación / Crear Rutina">

                <TabsRoutine
                    selectedDays={this.selectedDays}
                    days={this.state.days}
                    removedDay={this.state.removedDay}
                    removeDay={this.removeDay}
                    clearRemovedDay={this.clearRemovedDay}
                    description={this.state.description}
                    handleInput={this.handleInput} />

            </PageBase>
        </div>
      );
    }
}

export default CreateRutinePage;