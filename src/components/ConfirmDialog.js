import React, { PropTypes} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const ConfirmDialog = (props) => {

    const actions = [
      <FlatButton
        key={0}
        label="Cancelar"
        primary={true}
        onClick={(event) => props.onClose(event, false)}
      />,
      <FlatButton
        key={1}
        label="Confirmar"
        primary={true}
        onClick={(event) => props.onClose(event, true)}
      />,
    ];

    return (
        <Dialog
          title={props.title}
          actions={actions}
          modal={true}
          open={props.open}
          onRequestClose={props.onClose}
        >
          {props.message}
        </Dialog>
    );
};

ConfirmDialog.propTypes = {
    open: PropTypes.bool,
    title: PropTypes.string,
    message: PropTypes.string,
    onClose: PropTypes.func,
};

export default ConfirmDialog;
