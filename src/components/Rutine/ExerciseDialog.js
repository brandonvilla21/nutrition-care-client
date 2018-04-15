import React, { Component, PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import DialogContent from './DialogContent';

class ExerciseDialog extends Component {
    constructor(props) {
        super(props);        
    }

    render() {
        const { handleClose, onResponse, open } = this.props;
        const actions = [
            <FlatButton
                key={0}
                label="Cancelar"
                onClick={handleClose}
            />,
        ];

        return (
            <div>
                <Dialog
                    title="Selecciona un ejercicio"
                    actions={actions}
                    modal={true}
                    open={open}
                    autoScrollBodyContent={true}
                >
                    <DialogContent onResponse={onResponse} />
                </Dialog>
            </div>
        );
    }
}

ExerciseDialog.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    onResponse: PropTypes.func
};

export default ExerciseDialog;