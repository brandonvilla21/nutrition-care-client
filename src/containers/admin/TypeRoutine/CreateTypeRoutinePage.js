import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TypeRoutineForm from '../../../components/TypeRoutine/TypeRoutineForm';

class CreateTypeRoutinePage extends Component {
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
              title="Tipo de rutina registrado"
              actions={actions}
              modal={false}
              open={this.state.submitted}
              onRequestClose={this.handleClose}
            >
              El tipo de rutina ha sido registrado con éxito.
            </Dialog>
          <TypeRoutineForm onSubmitted={this.isSubmitted} />
        </div>
      );
    }
}

export default CreateTypeRoutinePage;