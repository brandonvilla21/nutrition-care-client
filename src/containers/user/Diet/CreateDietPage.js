import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import DietForm from '../../../components/Diet/DietForm/DietForm';

class CreateDietPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
          submitted: false,
          isThereAnError: false,
          errorMessage: ''
        };

        this.handleClose = this.handleClose.bind(this);
        this.isSubmitted = this.isSubmitted.bind(this);
    }
    
    handleClose() {
      this.setState({ 
        submitted: false,
        isThereAnError: false,
        errorMessage: ''
      });
    }

    isSubmitted({ submitted = false, err = false, errorMessage = '' }) {
      if( err ) {
        this.setState({ 
          isThereAnError: err,
          submitted,
          errorMessage
         });
      } else {
        this.setState({ 
          isThereAnError: err,
          submitted,
          errorMessage,
         });
      }
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
              title="Dieta registrada"
              actions={actions}
              modal={false}
              open={this.state.submitted}
              onRequestClose={this.handleClose}
            >
              La dieta ha sido registrado con éxito.
            </Dialog>

            <Dialog
              title="Aviso"
              actions={actions}
              modal={false}
              open={this.state.isThereAnError}
              onRequestClose={this.handleClose}
            >
              Hubo un error al registrar la dieta. Intentalo más tarde :( <br/><br/>
              Error: {this.state.errorMessage}
            </Dialog>
          
          <DietForm onSubmitted={this.isSubmitted} />
        </div>
      );
    }
}

export default CreateDietPage;