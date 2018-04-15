import React, { PropTypes } from 'react';
import { FlatButton } from 'material-ui';

const GoRoutinesButton = (props) => {
    return (
        <FlatButton
            label="Ir a mis rutinas"
            primary={true}
            href="/my-routines"
            onClick={props.goRoutines}
      />
    );
};

GoRoutinesButton.propTypes = {
    goRoutines: PropTypes.func,
};

export default GoRoutinesButton;

