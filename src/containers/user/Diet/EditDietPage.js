import React, { Component, PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router';
import EditDietForm from '../../../components/Diet/EditDietForm';


class EditDietPage extends Component {
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

    componentDidMount() {
      
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
          <Link key={0} to="/diets">
            <FlatButton
              label="Finalizar"
              primary={true}
              onClick={this.handleClose}
            />
          </Link>
      ];
      return (
        <div>
            <Dialog
              title="Dieta editada"
              actions={actions}
              modal={true}
              open={this.state.submitted}
              onRequestClose={this.handleClose}
            >
              La dieta ha sido editada con éxito.
            </Dialog>

            <Dialog
              title="Aviso"
              actions={actions}
              modal={false}
              open={this.state.isThereAnError}
              onRequestClose={this.handleClose}
            >
              Hubo un error al editar la dieta. Intentalo más tarde :( <br/><br/>
              Error: {this.state.errorMessage}
            </Dialog>
          
          <EditDietForm
            idToEdit={this.props.params.idToEdit} 
            onSubmitted={this.isSubmitted} />
        </div>
      );
    }
}

EditDietPage.propTypes = {
  params: PropTypes.object.isRequired,
};


export default EditDietPage;