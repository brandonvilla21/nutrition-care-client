import React, { Component, PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import DialogContent from './DialogContent';

class ExerciseDialog extends Component {
    constructor(props) {
        super(props);

        this.handleResponse = this.handleResponse.bind(this);
        
    }

    handleResponse(response) {
        console.log(response)
        this.props.handleClose();
    }

    render() {
        const actions = [
            <FlatButton
                key={0}
                label="Cancelar"
                onClick={this.props.handleClose}
            />,
        ];

        return (
            <div>
                <Dialog
                    title="Selecciona un ejercicio"
                    actions={actions}
                    modal={true}
                    open={this.props.open}
                    autoScrollBodyContent={true}
                >
                    <DialogContent onReponse={this.handleResponse} />
                </Dialog>
            </div>
        );
    }
}

ExerciseDialog.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func
};

export default ExerciseDialog;