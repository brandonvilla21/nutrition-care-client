import React, { Component } from 'react';
import ExerciceForm from '../../../components/Exercice/ExerciceForm';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class CreateExercicePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
          submitted: false
        };

        this.handleClose = this.handleClose.bind(this);
        this.isSubmitted = this.isSubmitted.bind(this);
    }
    
    handleClose() {
      this.setState({ submitted: false });
    }

    isSubmitted( submitted ) {
      this.setState({ submitted });
    }

    render() {
      const actions = [
          <FlatButton
              key={0}
              label="Aceptar"
              primary={true}
              onClick={this.handleClose}
          />
      ];
      return (
        <div>
            <Dialog
              title="Ejercicio registrado"
              actions={actions}
              modal={false}
              open={this.state.submitted}
              onRequestClose={this.handleClose}
            >
              El ejercicio ha sido registrado con éxito.
            </Dialog>
          <ExerciceForm onSubmitted={this.isSubmitted} />
        </div>
      );
    }
}

export default CreateExercicePage;