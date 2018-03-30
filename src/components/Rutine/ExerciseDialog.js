import React, { Component, PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class ExerciseDialog extends Component {
    constructor(props) {
        super(props);

        
    }

    render() {
        const actions = [
            <FlatButton
                key={0}
                label="Cancel"
                primary={true}
                onClick={this.props.handleClose}
            />,
            <FlatButton
                key={1}
                label="Submit"
                primary={true}
                onClick={this.props.handleClose}
            />,
        ];

        return (
            <div>
                <Dialog
                    title="Dialog With Custom Width"
                    actions={actions}
                    modal={true}
                    open={this.props.open}
                >
                    This dialog spans the entire width of the screen.
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