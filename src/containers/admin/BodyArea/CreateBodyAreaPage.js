import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import BodyAreaForm from '../../../components/BodyArea/BodyAreaForm';

class CreateBodyAreaPage extends Component {
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
              title="Área del cuerpo registrada"
              actions={actions}
              modal={false}
              open={this.state.submitted}
              onRequestClose={this.handleClose}
            >
              El área del cuerpo ha sido registrada
            </Dialog>
          <BodyAreaForm onSubmitted={this.isSubmitted} />
        </div>
      );
    }
}

export default CreateBodyAreaPage;